package com.uvaneshBaskar.Ecom.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uvaneshBaskar.Ecom.Model.CustomerDetails;
import com.uvaneshBaskar.Ecom.Model.InvoiceModel;
import com.uvaneshBaskar.Ecom.Model.ProductForInvoice;
import com.uvaneshBaskar.Ecom.Repository.CustomerDetailsRepo;
import com.uvaneshBaskar.Ecom.Repository.InvoiceRepo;

@Service
public class InvoiceService {
    @Autowired
    private InvoiceRepo invoiceRepository;

    @Autowired
    private CustomerDetailsRepo customerDetailRepository;

    public List<InvoiceModel> getAllInvoices() 
    {
        return invoiceRepository.findAll();
    }

    public InvoiceModel createInvoice(Long customerId, InvoiceModel invoice) 
    {
        CustomerDetails customer = customerDetailRepository.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));
        invoice.setCustomer(customer);

        if (invoice.getProducts() != null) 
        {
            for (ProductForInvoice product : invoice.getProducts()) 
            {
                product.setInvoice(invoice); // Set the relationship
            }
        }

        return invoiceRepository.save(invoice);
    }
}

