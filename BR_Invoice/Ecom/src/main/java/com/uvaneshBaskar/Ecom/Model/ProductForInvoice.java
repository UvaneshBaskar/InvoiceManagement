package com.uvaneshBaskar.Ecom.Model;

import java.math.BigDecimal;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "product")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductForInvoice 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productDescription;
    private String hsnCode;
    // private String uom; // Unit of Measurement
    private int quantity;
    private BigDecimal rate;

    @ManyToOne
    @JoinColumn(name = "invoice_id", nullable = false)
    private InvoiceModel invoice;
}
