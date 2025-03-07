package com.uvaneshBaskar.Ecom.Model;

import java.math.BigDecimal;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "purchaseOrder")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseOrderModel 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)

    @JsonIgnore
    private CustomerDetails customer;

    //private String purchaseOrderNumber;


    //private String invoiceNumber;
    // private LocalDate invoiceDate;

    //    private String productCode; // Multiple entries, delimited by "##"
    //    private String hsnCode; // Multiple entries, delimited by "##"
    //    private String uom; // Unit of Measurement, delimited by "##"
    //    private String quantity; // Multiple entries, delimited by "##"
    //    private String rate; // Multiple entries, delimited by "##"
    //    private String amount; // Multiple entries, delimited by "##"

    private String poNumber;
    private String poDate;

    // private String vendorCode;
    private String customerName;
    private String customerAddress;

    private String gstRate;

    private BigDecimal netValue; // Total Value
    private BigDecimal taxValue; // Tax Value , All other details can be calculated not necessary to store them

    private String poStatus;
    private String poPayment;

    

    @OneToMany(mappedBy = "purchaseOrder", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductForPurchaseOrder> products; // Replacing delimited fields with a proper relationship


//    private double cgst;
//    private double sgst;
//    private double totalAmount;
//    private String amountInWords;
//
//    private  double totalAmountAfterTax;

    // Getters and setters
}
