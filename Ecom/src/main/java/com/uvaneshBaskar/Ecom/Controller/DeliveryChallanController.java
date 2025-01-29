package com.uvaneshBaskar.Ecom.Controller;

import com.uvaneshBaskar.Ecom.Model.DeliveryChallan;
import com.uvaneshBaskar.Ecom.Repository.DeliveryChallanRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;


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
            dto.setClientId(challan.getClientId());
            dto.setDeliveryChallanNo(challan.getDeliveryChallanNo());
            dto.setClientDeliveryChallanNo(challan.getClientDeliveryChallanNo());
            dto.setDate(challan.getDate());
            dto.setPurchaseOrderNumber(challan.getPurchaseOrderNumber());

            // Split concatenated fields and join them back for better readability
            String[] itemCodes = challan.getItemCode() != null ? challan.getItemCode().split("##") : new String[0];
            dto.setItemCode(String.join(", ", itemCodes));

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
        challan.setClientId(challanDTO.getClientId());
        challan.setDeliveryChallanNo(challanDTO.getDeliveryChallanNo());
        challan.setClientDeliveryChallanNo(challanDTO.getClientDeliveryChallanNo());
        challan.setDate(challanDTO.getDate());
        challan.setPurchaseOrderNumber(challanDTO.getPurchaseOrderNumber());

        // Concatenate multiple entries into a single string
        challan.setItemCode(String.join("##", challanDTO.getItemCode()));
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


