package com.uvaneshBaskar.Ecom.Model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table(name = "purchaseOrderProduct")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductForPurchaseOrder {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productCode;
    private String description;
    private String hsnCode;
    private String uom; // Unit of Measurement
    private int quantity;
    private BigDecimal rate;
    private BigDecimal amount;

    private BigDecimal cgst; // CGST for the product
    private BigDecimal sgst; // SGST for the product
    private BigDecimal igst;

    @ManyToOne
    @JoinColumn(name = "purchase_order", nullable = false)
    @JsonBackReference // Prevents infinite recursion
    private PurchaseOrderModel purchaseOrder;
}
