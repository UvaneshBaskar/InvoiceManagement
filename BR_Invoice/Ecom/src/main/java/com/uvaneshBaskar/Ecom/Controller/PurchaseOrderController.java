package com.uvaneshBaskar.Ecom.Controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.uvaneshBaskar.Ecom.Model.CustomerDetails;
import com.uvaneshBaskar.Ecom.Model.PurchaseOrderModel;
import com.uvaneshBaskar.Ecom.Service.CustomerDetailsService;
import com.uvaneshBaskar.Ecom.Service.PurchaseOrderService;

@RestController
@CrossOrigin
@RequestMapping("/api/purchase-order")
public class PurchaseOrderController 
{
    @Autowired
    private PurchaseOrderService service;

    @Autowired
    private CustomerDetailsService customerDetailService;

    @Autowired
    private PurchaseOrderService purchaseOrderService;

    
    @GetMapping
    public ResponseEntity<List<PurchaseOrderModel>> getAllInvoices() 
    {
        System.out.println("-------------------------FROM Purchase Order Controller.java -------------------------");
        return ResponseEntity.ok(service.getAllInvoices());
    }


    //fetch invoice by id
//    @GetMapping("/{id}")
//    public ResponseEntity<PurchaseOrderModel> getInvoiceById(@PathVariable Long id) {
//        return ResponseEntity.ok(purchaseOrderService.getPurchaseOrderById(id));
//    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getInvoiceById(@PathVariable Long id) {
        PurchaseOrderModel purchaseOrder = purchaseOrderService.getPurchaseOrderById(id);

        if (purchaseOrder == null) {
            return ResponseEntity.notFound().build();
        }

        // Fetch associated products from the purchase order model
        List<?> products = purchaseOrder.getProducts(); // Assuming you have a list of products mapped correctly in your model

        // Create a response map to include both purchaseOrder and products
        Map<String, Object> response = new HashMap<>();
        response.put("poDetails", purchaseOrder);
        response.put("products", products);

        return ResponseEntity.ok(response);
    }



    @PostMapping("/{customerId}")
    public PurchaseOrderModel createInvoice(@PathVariable Long customerId, @RequestBody PurchaseOrderModel invoice) 
    {
        System.out.println("PO Received: " + invoice);
        return service.createInvoice(customerId, invoice);
    }

    @GetMapping("/customers")
    public List<CustomerDetails> getCustomersForDropdown() {

        return customerDetailService.getAllCustomerDetails();
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePurchaseOrder(@PathVariable Long id, @RequestBody PurchaseOrderModel purchaseOrderDTO) {
        PurchaseOrderModel updatedOrder = purchaseOrderService.updatePurchaseOrder(id, purchaseOrderDTO);
        return ResponseEntity.ok(updatedOrder);
    }





}
