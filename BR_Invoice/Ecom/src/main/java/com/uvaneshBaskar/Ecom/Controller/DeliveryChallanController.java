package com.uvaneshBaskar.Ecom.Controller;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.uvaneshBaskar.Ecom.Model.DeliveryChallan;
import com.uvaneshBaskar.Ecom.Repository.DeliveryChallanRepo;


@RestController
@CrossOrigin
@RequestMapping("/api/delivery-challans")
public class DeliveryChallanController {

    @Autowired
    private DeliveryChallanRepo repository;

//    @GetMapping
//    public List<DeliveryChallan> getAllChallans() {
//        return repository.findAll();
//    }

    @GetMapping
    public ResponseEntity<List<DeliveryChallan>> getAllDeliveryChallans() {
        List<DeliveryChallan> challans = repository.findAll();

        if (challans.isEmpty()) {
            return ResponseEntity.ok(Collections.emptyList());
        }

        List<DeliveryChallan> formattedChallans = challans.stream().map(challan -> {
            DeliveryChallan dto = new DeliveryChallan();

            dto.setCustomerId(challan.getCustomerId());
            dto.setCustDeliveryChallanNo(challan.getCustDeliveryChallanNo());
            dto.setCustDeliveryChallanDate(challan.getCustDeliveryChallanDate());

            dto.setOurDeliveryChallanNo(challan.getOurDeliveryChallanNo());
            dto.setOurDeliveryChallanDate(challan.getOurDeliveryChallanDate());

            dto.setPurchaseOrderDate(challan.getPurchaseOrderDate());
            dto.setPurchaseOrderNumber(challan.getPurchaseOrderNumber());

            // Split concatenated fields and join them back for better readability

            String[] quantities = challan.getQuantity() != null ? challan.getQuantity().split("##") : new String[0];
            dto.setQuantity(String.join(", ", quantities));

            String[] descriptions = challan.getDescription() != null ? challan.getDescription().split("##") : new String[0];
            dto.setDescription(String.join(", ", descriptions));

            String[] remarks = challan.getRemarks() != null ? challan.getRemarks().split("##") : new String[0];
            dto.setRemarks(String.join(", ", remarks));

            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(formattedChallans);
    }



//    @PostMapping
//    public DeliveryChallan saveChallan(@RequestBody DeliveryChallan challan) {
//        return repository.save(challan);
//    }

    @PostMapping
    public ResponseEntity<?> saveDeliveryChallan(@RequestBody DeliveryChallan challanDTO) {
        DeliveryChallan challan = new DeliveryChallan();
        
        challan.setCustomerId(challanDTO.getCustomerId());
        challan.setCustDeliveryChallanNo(challanDTO.getCustDeliveryChallanNo());
        challan.setCustDeliveryChallanDate(challanDTO.getCustDeliveryChallanDate());

        challan.setOurDeliveryChallanNo(challanDTO.getOurDeliveryChallanNo());
        challan.setOurDeliveryChallanDate(challanDTO.getOurDeliveryChallanDate());

        challan.setPurchaseOrderDate(challanDTO.getPurchaseOrderDate());
        challan.setPurchaseOrderNumber(challanDTO.getPurchaseOrderNumber());

        //challan.setQuantity(Collections.singletonList(challanDTO.getQuantity().stream().map(String::valueOf).collect(Collectors.joining("##"))));
        String quantityInput = challanDTO.getQuantity();
        String concatenatedQuantities = Arrays.stream(quantityInput.split(","))
                .map(String::trim)
                .collect(Collectors.joining("##"));
        challan.setQuantity(concatenatedQuantities);

        challan.setDescription(String.join("##", challanDTO.getDescription()));
        challan.setRemarks(String.join("##", challanDTO.getRemarks()));

        repository.save(challan);
        return ResponseEntity.ok("Delivery Challan saved successfully!");
    }




}


