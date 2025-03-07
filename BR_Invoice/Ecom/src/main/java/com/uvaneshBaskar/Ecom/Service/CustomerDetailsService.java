package com.uvaneshBaskar.Ecom.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.uvaneshBaskar.Ecom.Model.CustomerDetails;
import com.uvaneshBaskar.Ecom.Repository.CustomerDetailsRepo;

@Service
public class CustomerDetailsService {

    @Autowired
    private CustomerDetailsRepo repo;

//    public List<Invoice> saveInvoices(List<Invoice> invoices) {
//        return repo.saveAll(invoices);
//    }

    public CustomerDetails saveCustomerDetails(CustomerDetails customerDetails) 
    {
        // System.out.println("4. from CustomerDetailsService.java");
        // System.out.println("444." + customerDetails);
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

        existingCustomerDetails.setClientType(updatedCustomerDetails.getClientType());
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

        existingCustomerDetails.setBillCountry(updatedCustomerDetails.getBillCountry());
        existingCustomerDetails.setBillCity(updatedCustomerDetails.getBillCity());
        existingCustomerDetails.setBillState(updatedCustomerDetails.getBillCity());
        existingCustomerDetails.setBillPincode(updatedCustomerDetails.getBillPincode());

        existingCustomerDetails.setShippingAddress(updatedCustomerDetails.getShippingAddress());

        existingCustomerDetails.setShipCountry(updatedCustomerDetails.getShipCountry());
        existingCustomerDetails.setShipCity(updatedCustomerDetails.getShipCity());
        existingCustomerDetails.setShipState(updatedCustomerDetails.getShipState());
        existingCustomerDetails.setShipPincode(updatedCustomerDetails.getShipPincode());


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
