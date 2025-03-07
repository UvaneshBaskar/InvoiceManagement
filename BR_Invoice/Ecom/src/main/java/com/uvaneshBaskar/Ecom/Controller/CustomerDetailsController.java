package com.uvaneshBaskar.Ecom.Controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uvaneshBaskar.Ecom.Model.CustomerDetails;
import com.uvaneshBaskar.Ecom.Service.CustomerDetailsService;


@RestController
@CrossOrigin
@RequestMapping("/api/customer-details")
public class CustomerDetailsController {

    @Autowired
    private CustomerDetailsService customerDetailsService;

//    private final InvoiceRepo repo;
//
//    public InvoiceController(InvoiceRepo repo) {
//        this.repo = repo;
//    }
//    @PostMapping
//    public ResponseEntity<List<Invoice>> saveInvoices(@RequestBody List<Invoice> invoices) {
//        List<Invoice> savedInvoices = repo.saveAll(invoices);
//        return ResponseEntity.status(HttpStatus.CREATED).body(savedInvoices);
//    }

    @PostMapping
    public ResponseEntity<?> createInvoice(@RequestBody CustomerDetails customerDetails) 
    {

        // System.out.println("000. Output: " + customerDetails);
        try 
        {
            // System.out.println("1. Trying Saving!");
            CustomerDetails savedCustomerDetails = customerDetailsService.saveCustomerDetails(customerDetails);
            // System.out.println("2. Hopefully saved!");
            // System.out.println(savedCustomerDetails);
            return ResponseEntity.ok(savedCustomerDetails); 
        } 
        catch (Exception e) 
        {
            // System.out.println("3. Exception from Controller!!!");
            // System.out.println("5. Output: " + customerDetails);
            //return (ResponseEntity<CustomerDetails>) ResponseEntity.status(HttpStatus.BAD_REQUEST);
            // e.printStackTrace();

            // return ResponseEntity.ok(customerDetails);
            // return ResponseEntity.badRequest();
            // return ResponseEntity<CustomerDetails>

            // Return a meaningful error response with BAD_REQUEST status
            String errorMessage = "Failed to create invoice: " + e.getMessage();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("error", errorMessage));
        }
                
    }




    //fetch all invoice
    @GetMapping
    public ResponseEntity<List<CustomerDetails>> getAllInvoices() {
        return ResponseEntity.ok(customerDetailsService.getAllCustomerDetails());
    }

    //fetch invoice by id
    @GetMapping("/{id}")
    public ResponseEntity<CustomerDetails> getInvoiceById(@PathVariable Long id) {
        return ResponseEntity.ok(customerDetailsService.getCustomerDetailsById(id));
    }

    //updating an invoice
    @PutMapping("/{id}")
    public ResponseEntity<CustomerDetails> updateInvoice(@PathVariable Long id, @RequestBody CustomerDetails customerDetails) {
        return ResponseEntity.ok(customerDetailsService.updateCustomerDetails(id, customerDetails));
    }

    //deleting an invoice
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteInvoice(@PathVariable Long id) {
        customerDetailsService.deleteCustomerDetails(id);
        return ResponseEntity.ok("Invoice deleted successfully.");
    }






//    @GetMapping("/")
//    public String greet(){
//        return "Hello World";
//    }
//
//    @GetMapping("/products")
//    public ResponseEntity<List<Invoice>> getAllProducts(){
//        List<Invoice> product = service.getAllProducts();
//        return ResponseEntity.ok(product);
//    }
//
//    @GetMapping("/product/{id}")
//    public ResponseEntity<Invoice> getProductById(@PathVariable int id){
//        Invoice product = service.getProductById(id);
//        return ResponseEntity.ok(product);
//
//    }
//
//    @PostMapping("/product")
//    public ResponseEntity<?> addProduct(@RequestPart Invoice product, @RequestPart MultipartFile imageFile){
//        try {
//            System.out.println("inside---------------------------");
//
//            Invoice product1 = service.addProduct(product,imageFile);
//            return new ResponseEntity<>(product1, HttpStatus.CREATED);
//        }catch (Exception e){
//            System.out.println("outside---------------------------");
//
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }
//
//    @GetMapping("/product/{productId}/image")
//    public ResponseEntity<byte[]> getImageByProductId(@PathVariable int productId){
//        Invoice product = service.getProductById(productId);
//        byte [] imageFile = product.getImageData();
//
//        return ResponseEntity.ok().contentType(MediaType.valueOf(product.getImageType())).body(imageFile);
//
//    }
//
//    @PutMapping("/product/{id}")
//    public ResponseEntity<String> updateProduct(@PathVariable int id, @RequestPart Invoice product, @RequestPart MultipartFile imageFile){
//        Invoice product1 = null;
//        try {
//            product1 = service.updateProduct(id, product, imageFile);
//        } catch (IOException e) {
//            throw new RuntimeException(e);
//        }
//        if(product1 != null){
//            return new ResponseEntity<>("Updated",HttpStatus.OK);
//        }else {
//            return new ResponseEntity<>("Failed to update", HttpStatus.BAD_REQUEST);
//        }
//    }
//
//    @DeleteMapping("/product/{id}")
//    public ResponseEntity<String> deleteProduct(@PathVariable int id){
//        Invoice product = service.getProductById(id);
//        if (product != null) {
//            service.deleteProduct(id);
//            return new ResponseEntity<>("Deleted", HttpStatus.GONE);
//        }else {
//            return new ResponseEntity<>("Product Not Available", HttpStatus.NOT_FOUND);
//        }
//
//    }
//
//    @GetMapping("/products/search")
//    public ResponseEntity<List<Invoice>> SearchProduct(@RequestParam String keyword){
//        List<Invoice> products = service.searchProduct(keyword);
//        return new ResponseEntity<>(products, HttpStatus.OK);
//    }

}


