package com.uvaneshBaskar.Ecom.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.List;

@Entity
@Table(name = "invoice")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class InvoiceModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private CustomerDetails customer;

    private String purchaseOrderNumber;


    private String invoiceNumber;
    private LocalDate invoiceDate;

//    private String productCode; // Multiple entries, delimited by "##"
//    private String hsnCode; // Multiple entries, delimited by "##"
//    private String uom; // Unit of Measurement, delimited by "##"
//    private String quantity; // Multiple entries, delimited by "##"
//    private String rate; // Multiple entries, delimited by "##"
//    private String amount; // Multiple entries, delimited by "##"

    @OneToMany(mappedBy = "invoice", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<ProductForInvoice> products; // Replacing delimited fields with a proper relationship


    private double cgst;
    private double sgst;
    private double totalAmount;
    private String amountInWords;

    private  double totalAmountAfterTax;

    // Getters and setters
}
