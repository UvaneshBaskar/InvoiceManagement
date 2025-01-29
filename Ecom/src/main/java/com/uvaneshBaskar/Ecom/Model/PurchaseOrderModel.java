package com.uvaneshBaskar.Ecom.Model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Entity
@Table(name = "purchaseOrder")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseOrderModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private CustomerDetails customer;

    private String vendorCode;
    private String customerName;
    private String customerAddress;

    @JsonProperty("customerGstin")
    private String gstNumber;

    private BigDecimal netValue;
    private BigDecimal taxValue;
    private BigDecimal grossValue;

    @JsonProperty("amountInWords")
    private String totalInWords;

    @OneToMany(mappedBy = "purchaseOrder", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference // Prevents infinite recursion
    @JsonIgnoreProperties({"purchaseOrder"}) // Ignores purchaseOrder reference inside products
    private List<ProductForPurchaseOrder> products;
}
