package com.uvaneshBaskar.Ecom.Service;

import com.uvaneshBaskar.Ecom.Model.CustomerDetails;
import com.uvaneshBaskar.Ecom.Repository.CustomerDetailsRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerDetailsService {

    @Autowired
    private CustomerDetailsRepo repo;

//    public List<Invoice> saveInvoices(List<Invoice> invoices) {
//        return repo.saveAll(invoices);
//    }

    public CustomerDetails saveCustomerDetails(CustomerDetails customerDetails) {
        return repo.save(customerDetails);
    }

    //fetch all Customer Details
    public List<CustomerDetails> getAllCustomerDetails() {
        return repo.findAll();
    }

    //fetch Customer Details by Id
    public CustomerDetails getCustomerDetailsById(Long id) {
        return repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer Details not found with ID: " + id));
    }

    //updating an Customer Details
    public CustomerDetails updateCustomerDetails(Long id, CustomerDetails updatedCustomerDetails) {
        CustomerDetails existingCustomerDetails = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Customer Details not found with ID: " + id));

        existingCustomerDetails.setCompanyName(updatedCustomerDetails.getCompanyName());
        existingCustomerDetails.setEmailId(updatedCustomerDetails.getEmailId());
        existingCustomerDetails.setContactNumber(updatedCustomerDetails.getContactNumber());
        existingCustomerDetails.setVendorCode(updatedCustomerDetails.getVendorCode());
        existingCustomerDetails.setBankName(updatedCustomerDetails.getBankName());
        existingCustomerDetails.setAccountNumber(updatedCustomerDetails.getAccountNumber());
        existingCustomerDetails.setDisplayName(updatedCustomerDetails.getDisplayName());
        existingCustomerDetails.setIfscCode(updatedCustomerDetails.getIfscCode());
        existingCustomerDetails.setBranchName(updatedCustomerDetails.getBranchName());
        existingCustomerDetails.setStateCode(updatedCustomerDetails.getStateCode());
        existingCustomerDetails.setGstNumber(updatedCustomerDetails.getGstNumber());
        existingCustomerDetails.setBillingAddress(updatedCustomerDetails.getBillingAddress());
        existingCustomerDetails.setShippingAddress(updatedCustomerDetails.getShippingAddress());


        return repo.save(existingCustomerDetails);
    }


    //deleting an Customer Details
    public void deleteCustomerDetails(Long id) {
        if (!repo.existsById(id)) {
            throw new RuntimeException("Customer Details not found with ID: " + id);
        }
        repo.deleteById(id);
    }



}
