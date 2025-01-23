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

    public PurchaseOrderModel createInvoice(Long customerId, PurchaseOrderModel invoice) {
        CustomerDetails customer = customerDetailRepository.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));
        invoice.setCustomer(customer);

        if (invoice.getProducts() != null) {
            for (ProductForPurchaseOrder product : invoice.getProducts()) {
                calculateTaxesForProduct(product);
                BigDecimal quantity = BigDecimal.valueOf(product.getQuantity());
                BigDecimal rate = product.getRate();
                product.setAmount(quantity.multiply(rate));  // Calculate amount
                product.setPurchaseOrder(invoice); // Set the relationship
            }
        }

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

