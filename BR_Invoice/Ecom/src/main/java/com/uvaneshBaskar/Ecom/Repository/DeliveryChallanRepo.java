package com.uvaneshBaskar.Ecom.Repository;

import com.uvaneshBaskar.Ecom.Model.DeliveryChallan;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DeliveryChallanRepo extends JpaRepository<DeliveryChallan, Long> {

}

