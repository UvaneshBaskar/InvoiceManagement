package com.uvaneshBaskar.Ecom.Model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "product")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductForInvoice {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productCode;
    private String hsnCode;
    private String uom; // Unit of Measurement
    private int quantity;
    private BigDecimal rate;
    private BigDecimal amount;

    @ManyToOne
    @JoinColumn(name = "invoice_id", nullable = false)
    private InvoiceModel invoice;
}
