package com.uvaneshBaskar.Ecom.Model;

import java.math.BigDecimal;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
@Table(name = "purchaseOrderProduct")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductForPurchaseOrder 
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productCode;
    private String description;

    private String hsnCode;
    // private String uom; // Unit of Measurement
    private int quantity;
    private BigDecimal rate;
    private BigDecimal amount;

    private BigDecimal cgst; // CGST for the product
    private BigDecimal sgst; // SGST for the product
    private BigDecimal igst;

    @ManyToOne
    @JoinColumn(name = "purchase_order", nullable = false)
    @JsonIgnore
    private PurchaseOrderModel purchaseOrder;
}
