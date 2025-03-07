package com.uvaneshBaskar.Ecom.Service;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uvaneshBaskar.Ecom.Model.CustomerDetails;
import com.uvaneshBaskar.Ecom.Model.ProductForPurchaseOrder;
import com.uvaneshBaskar.Ecom.Model.PurchaseOrderModel;
import com.uvaneshBaskar.Ecom.Repository.CustomerDetailsRepo;
import com.uvaneshBaskar.Ecom.Repository.PurchaseOrderRepo;

@Service
public class PurchaseOrderService {
    @Autowired
    private PurchaseOrderRepo poRepository;

    @Autowired
    private CustomerDetailsRepo customerDetailRepository;

    public PurchaseOrderModel getPurchaseOrderById(Long id) {
        return poRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer Details not found with ID: " + id));
    }

    public List<PurchaseOrderModel> getAllInvoices() 
    {
        System.out.println("+++++++++++++ FROM PURCHASE ORDER SERVICE.JAVA ++++++++++++++++");
        // return poRepository.findAll();

        return poRepository.findAllByOrderByPoDateDesc();
    }




//    public PurchaseOrderModel createInvoice(Long customerId, PurchaseOrderModel invoice) {
//        CustomerDetails customer = customerDetailRepository.findById(customerId)
//                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));
//        invoice.setCustomer(customer);
//
//        if (invoice.getProducts() != null)
//        {
//
//            System.out.println("PO Products - from Purchase oredr Service.java");
//
//            for (ProductForPurchaseOrder product : invoice.getProducts())
//            {
//                calculateTaxesForProduct(product);
//                BigDecimal quantity = BigDecimal.valueOf(product.getQuantity());
//                BigDecimal rate = product.getRate();
//                System.out.println(product.getRate());
//                product.setAmount(quantity.multiply(rate));  // Calculate amount
//                product.setPurchaseOrder(invoice); // Set the relationship
//            }
//
//            System.out.println("+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
//        }
//        else
//        {
//            System.out.println("\n\n PO PRODUCT OBJECT NULL (PURCHASE ORDER SERVICE.JAVA)");
//        }
//
//        return poRepository.save(invoice);
//    }

    public PurchaseOrderModel createInvoice(Long customerId, PurchaseOrderModel invoice) {
        // Fetch customer by ID
        CustomerDetails customer = customerDetailRepository.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));

        // Set the customer relationship
        invoice.setCustomer(customer);

//        System.out.println("Vendor Code before setting: " + invoice.get);
//        System.out.println("Total In Words before setting: " + invoice.get());

        // Set other required fields for the PurchaseOrderModel
        invoice.setCustomerName(customer.getCompanyName());  // Assuming 'getName()' method exists in CustomerDetails
        invoice.setCustomerAddress(customer.getBillingAddress());  // Assuming 'getAddress()' method exists in CustomerDetails
        invoice.setGstRate(customer.getGstNumber());  // Assuming 'getGstin()' method exists in CustomerDetails
        //invoice.setVendorCode(invoice.getVendorCode() != null ? invoice.getVendorCode() : "Default Vendor Code");
        //invoice.setTotalInWords(invoice.getTotalInWords());

        //System.out.println("Vendor Code after setting: " + invoice.getVendorCode());
        //System.out.println("Total In Words after setting: " + invoice.getTotalInWords());


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
            //invoice.set(totalGrossValue);
        }

        // Save the Purchase Order and return the saved entity
        return poRepository.save(invoice);
    }

    public PurchaseOrderModel updatePurchaseOrder(Long id, PurchaseOrderModel updatedInvoice) {
        // Fetch the existing Purchase Order by ID
        PurchaseOrderModel existingInvoice = poRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Purchase Order not found"));

        // Fetch customer by ID
        CustomerDetails customer = customerDetailRepository.findById(id  /*updatedInvoice.getCustomer().getId()*/)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));

//        CustomerDetails customer = customerDetailRepository.findById(customerId)
//                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));

        // Set updated customer details
        existingInvoice.setCustomer(customer);
        existingInvoice.setCustomerName(customer.getCompanyName());
        existingInvoice.setCustomerAddress(customer.getBillingAddress());
        existingInvoice.setGstRate(customer.getGstNumber());

        // Update other Purchase Order fields
        existingInvoice.setPoNumber(updatedInvoice.getPoNumber());
        existingInvoice.setPoDate(updatedInvoice.getPoDate());
        existingInvoice.setGstRate(updatedInvoice.getGstRate());
        existingInvoice.setNetValue(updatedInvoice.getNetValue());
        existingInvoice.setTaxValue(updatedInvoice.getTaxValue());
        //existingInvoice.setT(updatedInvoice.getTotalInWords());

        // Clear existing products and set the new product list
        if (existingInvoice.getProducts() != null) {
            existingInvoice.getProducts().clear();
        }
        if (updatedInvoice.getProducts() != null) {
            for (ProductForPurchaseOrder product : updatedInvoice.getProducts()) {
                calculateTaxesForProduct(product);
                product.setPurchaseOrder(existingInvoice);
                existingInvoice.getProducts().add(product);
            }
        }

        // Save the updated Purchase Order and return
        return poRepository.save(existingInvoice);
    }






    public void calculateTaxesForProduct(ProductForPurchaseOrder product) 
    {
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

