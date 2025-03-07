package com.uvaneshBaskar.Ecom.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uvaneshBaskar.Ecom.Model.PurchaseOrderModel;

@Repository
public interface PurchaseOrderRepo extends JpaRepository<PurchaseOrderModel, Long> 
{

    public List<PurchaseOrderModel> findAllByOrderByPoDateDesc();
    
}

