package com.uvaneshBaskar.Ecom.Repository;

import com.uvaneshBaskar.Ecom.Model.InvoiceModel;
import com.uvaneshBaskar.Ecom.Model.PurchaseOrderModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PurchaseOrderRepo extends JpaRepository<PurchaseOrderModel, Long> {
}

