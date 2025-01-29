package com.uvaneshBaskar.Ecom.Controller;

import com.uvaneshBaskar.Ecom.Model.CustomerDetails;
import com.uvaneshBaskar.Ecom.Model.PurchaseOrderModel;
import com.uvaneshBaskar.Ecom.Service.CustomerDetailsService;
import com.uvaneshBaskar.Ecom.Service.PurchaseOrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/purchase-order")
public class PurchaseOrderController {
    @Autowired
    private PurchaseOrderService service;

    @Autowired
    private CustomerDetailsService customerDetailService;

    @GetMapping
    public List<PurchaseOrderModel> getAllInvoices() {
        return service.getAllInvoices();
    }

    @PostMapping("/{customerId}")
    public PurchaseOrderModel createInvoice(@PathVariable Long customerId, @RequestBody PurchaseOrderModel invoice) {
        //System.out.println("Invoice Received: " + invoice);
        return service.createInvoice(customerId, invoice);
    }

    @GetMapping("/customers")
    public List<CustomerDetails> getCustomersForDropdown() {
        return customerDetailService.getAllCustomerDetails();
    }
}
