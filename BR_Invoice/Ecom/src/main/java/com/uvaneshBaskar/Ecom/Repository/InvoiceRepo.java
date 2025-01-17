package com.uvaneshBaskar.Ecom.Repository;

import com.uvaneshBaskar.Ecom.Model.InvoiceModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InvoiceRepo extends JpaRepository<InvoiceModel, Long> {
}

