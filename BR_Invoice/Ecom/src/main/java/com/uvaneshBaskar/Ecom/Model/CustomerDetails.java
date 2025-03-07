package com.uvaneshBaskar.Ecom.Model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDetails 
{
//client_id,company_name,display_name,email_id,contact number, vendor code, bank name,account no,ifsc code
// ,branch,state code
//gstNo,Billing address, Shipping Address

// Newly Added - clientType, bcountry , bstate , bcity , bpincode, scountry , sstate , scity , spincode
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Unique identifier for the invoice

    private String clientType;

    @NotBlank(message = "Company name is required")
    private String companyName;

    @NotBlank(message = "Display name is required")
    private String displayName;

    @Email(message = "Invalid email address")
    @NotBlank(message = "Email ID is required")
    private String emailId;

    @NotBlank(message = "Contact number is required")
    private String contactNumber;

    @NotBlank(message = "Vendor code is required")
    private String vendorCode;

    @NotBlank(message = "Bank name is required")
    private String bankName;

    @NotBlank(message = "Account number is required")
    private String accountNumber;

    @NotBlank(message = "IFSC code is required")
    private String ifscCode;

    @NotBlank(message = "Branch name is required")
    private String branchName;

    @NotBlank(message = "State code is required")
    private String stateCode;

    @NotBlank(message = "GST number is required")
    private String gstNumber;

    @NotBlank(message = "Billing address is required")
    @Lob
    private String billingAddress;

    @NotBlank(message = "billCountry is required")
    private String billCountry;

    @NotBlank(message = "billState is required")
    private String billState;

    @NotBlank(message = "billCity is required")
    private String billCity;

    @NotBlank(message = "billPincode is required")
    private String billPincode;

    @NotBlank(message = "shipping address is required")
    @Lob
    private String shippingAddress;

    @NotBlank(message = "shipCountry is required")
    private String shipCountry;

    @NotBlank(message = "shipState is required")
    private String shipState;

    @NotBlank(message = "shipCity is required")
    private String shipCity;

    @NotBlank(message = "shipPincode is required")
    private String shipPincode;
}

