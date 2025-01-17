package com.uvaneshBaskar.Ecom.Service;

import com.uvaneshBaskar.Ecom.Model.CustomerDetails;
import com.uvaneshBaskar.Ecom.Model.InvoiceModel;
import com.uvaneshBaskar.Ecom.Repository.CustomerDetailsRepo;
import com.uvaneshBaskar.Ecom.Repository.InvoiceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class InvoiceService {
    @Autowired
    private InvoiceRepo invoiceRepository;

    @Autowired
    private CustomerDetailsRepo customerDetailRepository;

    public List<InvoiceModel> getAllInvoices() {
        return invoiceRepository.findAll();
    }

    public InvoiceModel createInvoice(Long customerId, InvoiceModel invoice) {
        CustomerDetails customer = customerDetailRepository.findById(customerId)
                .orElseThrow(() -> new IllegalArgumentException("Customer not found"));
        invoice.setCustomer(customer);
        return invoiceRepository.save(invoice);
    }
}

