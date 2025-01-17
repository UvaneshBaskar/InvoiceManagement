package com.uvaneshBaskar.Ecom.Model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDetails {
//client_id,company_name,display_name,email_id,contact number, vendor code, bank name,account no,ifsc code
// ,branch,state code
//gstNo,Billing address, Shipping Address
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Unique identifier for the invoice

    @NotBlank(message = "Company name is required")
    private String companyName;

    @NotBlank(message = "Display name is required")
    private String displayName;

    @Email(message = "Invalid email address")
    @NotBlank(message = "Email ID is required")
    private String emailId;

    @NotBlank(message = "Contact number is required")
    @Pattern(regexp = "\\d{10}", message = "Contact number must be 10 digits")
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
    @Pattern(regexp = "\\d{2}", message = "State code must be 2 digits")
    private String stateCode;

    @NotBlank(message = "GST number is required")
    @Pattern(regexp = "\\d{2}[A-Z]{5}\\d{4}[A-Z]{1}[A-Z\\d]{1}[Z]{1}[A-Z\\d]{1}",
            message = "Invalid GST number format")
    private String gstNumber;

    @NotBlank(message = "Billing address is required")
    @Lob
    private String billingAddress;

    @NotBlank(message = "Shipping address is required")
    @Lob
    private String shippingAddress;
}

