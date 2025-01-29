package com.uvaneshBaskar.Ecom.Model;


import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeliveryChallan {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String clientId;
    private String ClientDeliveryChallanNo;
    private String deliveryChallanNo;
    private LocalDate date;
    private String purchaseOrderNumber;

//    @ElementCollection
//    @CollectionTable(name = "delivery_challan_items", joinColumns = @JoinColumn(name = "delivery_challan_id"))
//    private List<ItemEntry> items;
//
//    // Getters and Setters
//    @Embeddable
//    public static class ItemEntry {
    //        private String itemCode;
//        private String description;
//        private int quantity;
//        private String remarks;}
    @Column(length = 2000) // Adjust length as needed
    private String itemCode;

    @Column(length = 2000)
    private String quantity;

    @Column(length = 2000)
    private String description;

    @Column(length = 2000)
    private String remarks;

        // Getters and Setters


}
