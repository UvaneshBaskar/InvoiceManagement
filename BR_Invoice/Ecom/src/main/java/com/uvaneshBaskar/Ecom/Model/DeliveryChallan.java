package com.uvaneshBaskar.Ecom.Model;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DeliveryChallan 
{

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    
    private String customerId;

    
    private String custDeliveryChallanNo;
    private String custDeliveryChallanDate;


    private String ourDeliveryChallanNo;
    private String ourDeliveryChallanDate;


    private String purchaseOrderNumber;
    private String purchaseOrderDate;

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

    @Column(length = 2000)
    private String quantity;

    @Column(length = 2000)
    private String description;

    @Column(length = 2000)
    private String remarks;

        // Getters and Setters


}
