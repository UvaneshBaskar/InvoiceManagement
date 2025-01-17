package com.uvaneshBaskar.Ecom.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

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
    @JoinColumn(name = "customer_id")
    private CustomerDetails customer;

    private String purchaseOrderNumber;


    private String invoiceNumber;
    private LocalDate invoiceDate;

    private String productCode; // Multiple entries, delimited by "##"
    private String hsnCode; // Multiple entries, delimited by "##"
    private String uom; // Unit of Measurement, delimited by "##"
    private String quantity; // Multiple entries, delimited by "##"
    private String rate; // Multiple entries, delimited by "##"
    private String amount; // Multiple entries, delimited by "##"

    private double cgst;
    private double sgst;
    private double totalAmount;
    private String amountInWords;

    // Getters and setters
}
