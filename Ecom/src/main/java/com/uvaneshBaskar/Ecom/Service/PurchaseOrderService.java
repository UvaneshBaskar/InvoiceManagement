package com.uvaneshBaskar.Ecom.Service;

import com.uvaneshBaskar.Ecom.Model.*;
import com.uvaneshBaskar.Ecom.Repository.CustomerDetailsRepo;
import com.uvaneshBaskar.Ecom.Repository.InvoiceRepo;
import com.uvaneshBaskar.Ecom.Repository.PurchaseOrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

@Service
public class PurchaseOrderService {
    @Autowired
    private PurchaseOrderRepo invoiceRepository;

    @Autowired
    private CustomerDetailsRepo customerDetailRepository;

    public List<PurchaseOrderModel> getAllInvoices() {
        return invoiceRepository.findAll();
    }

//    public PurchaseOrderModel createInvoice(Long customerId, PurchaseOrderModel invoice) {
//        CustomerDetails customer = customerDetailRepository.findById(customerId)
//                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));
//        invoice.setCustomer(customer);
//        //invoice.setCustomer(customer);
//        invoice.setGstNumber(invoice.getGstNumber());
//        //invoice.setId(invoice.getId());
//        invoice.setGrossValue(invoice.getGrossValue());
//        invoice.setNetValue(invoice.getNetValue());
//        invoice.setTotalInWords(invoice.getTotalInWords());
//        invoice.setTaxValue(invoice.getTaxValue());
//        invoice.setCustomerAddress(invoice.getCustomerAddress());
//        invoice.setCustomerName(invoice.getCustomerName());
//        invoice.setVendorCode(invoice.getVendorCode());
//
//
//        if (invoice.getProducts() != null) {
//            for (ProductForPurchaseOrder product : invoice.getProducts()) {
//                calculateTaxesForProduct(product);
//                BigDecimal quantity = BigDecimal.valueOf(product.getQuantity());
//                BigDecimal rate = product.getRate();
//                product.setAmount(quantity.multiply(rate));  // Calculate amount
//                product.setPurchaseOrder(invoice); // Set the relationship
//            }
//        }
//
//        return invoiceRepository.save(invoice);
//    }

    public PurchaseOrderModel createInvoice(Long customerId, PurchaseOrderModel invoice) {
        // Fetch customer by ID
        CustomerDetails customer = customerDetailRepository.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));

        // Set the customer relationship
        invoice.setCustomer(customer);

        System.out.println("Vendor Code before setting: " + invoice.getVendorCode());
        System.out.println("Total In Words before setting: " + invoice.getTotalInWords());

        // Set other required fields for the PurchaseOrderModel
        invoice.setCustomerName(customer.getCompanyName());  // Assuming 'getName()' method exists in CustomerDetails
        invoice.setCustomerAddress(customer.getBillingAddress());  // Assuming 'getAddress()' method exists in CustomerDetails
        invoice.setGstNumber(customer.getGstNumber());  // Assuming 'getGstin()' method exists in CustomerDetails
        invoice.setVendorCode(invoice.getVendorCode() != null ? invoice.getVendorCode() : "Default Vendor Code");
        invoice.setTotalInWords(invoice.getTotalInWords());

        System.out.println("Vendor Code after setting: " + invoice.getVendorCode());
        System.out.println("Total In Words after setting: " + invoice.getTotalInWords());


        // Calculate net value, tax value, and gross value if required
        if (invoice.getProducts() != null) {
            BigDecimal totalNetValue = BigDecimal.ZERO;
            BigDecimal totalTaxValue = BigDecimal.ZERO;
            BigDecimal totalGrossValue = BigDecimal.ZERO;

            for (ProductForPurchaseOrder product : invoice.getProducts()) {
                calculateTaxesForProduct(product);
                BigDecimal quantity = BigDecimal.valueOf(product.getQuantity());
                BigDecimal rate = product.getRate();
                BigDecimal amount = quantity.multiply(rate);  // Calculate amount
                product.setAmount(amount);

                // Set the relationship between product and purchase order
                product.setPurchaseOrder(invoice);

                // Sum up totals for net, tax, and gross values
                totalNetValue = totalNetValue.add(amount);
                totalTaxValue = totalTaxValue.add(product.getCgst().add(product.getSgst()));
                totalGrossValue = totalGrossValue.add(amount.add(product.getCgst()).add(product.getSgst()));
            }

            invoice.setNetValue(totalNetValue);
            invoice.setTaxValue(totalTaxValue);
            invoice.setGrossValue(totalGrossValue);
        }

        // Save the Purchase Order and return the saved entity
        return invoiceRepository.save(invoice);
    }


    public void calculateTaxesForProduct(ProductForPurchaseOrder product) {
        BigDecimal taxRate = new BigDecimal("18"); // Example: 18%
        BigDecimal productTotal = product.getRate().multiply(BigDecimal.valueOf(product.getQuantity()));
        BigDecimal taxAmount = productTotal.multiply(taxRate).divide(new BigDecimal("100"));

        BigDecimal cgst = taxAmount.divide(new BigDecimal("2"), RoundingMode.HALF_UP);
        BigDecimal sgst = taxAmount.divide(new BigDecimal("2"), RoundingMode.HALF_UP);

        product.setCgst(cgst);
        product.setSgst(sgst);
        product.setIgst(BigDecimal.ZERO); // Or handle IGST logic if applicable
    }
}

