package com.uvaneshBaskar.Ecom.Controller;

import com.uvaneshBaskar.Ecom.Model.CustomerDetails;
import com.uvaneshBaskar.Ecom.Model.InvoiceModel;
import com.uvaneshBaskar.Ecom.Service.CustomerDetailsService;
import com.uvaneshBaskar.Ecom.Service.InvoiceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/invoices")
public class InvoiceController {
    @Autowired
    private InvoiceService service;

    @Autowired
    private CustomerDetailsService customerDetailService;

    @GetMapping
    public List<InvoiceModel> getAllInvoices() {
        return service.getAllInvoices();
    }

    @PostMapping("/{customerId}")
    public InvoiceModel createInvoice(@PathVariable Long customerId, @RequestBody InvoiceModel invoice) {
        System.out.println("Invoice Received: " + invoice);
        return service.createInvoice(customerId, invoice);
    }

    @GetMapping("/customers")
    public List<CustomerDetails> getCustomersForDropdown() {
        return customerDetailService.getAllCustomerDetails();
    }
}
