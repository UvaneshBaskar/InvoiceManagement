package com.uvaneshBaskar.Ecom.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.uvaneshBaskar.Ecom.Model.CustomerDetails;

@Repository
public interface CustomerDetailsRepo extends JpaRepository<CustomerDetails, Long> {

    //@Query("SELECT p from Product p WHERE LOWER(p.name) LIKE LOWER(CONCAT('%', :keyword, '%'))")
    //List<Invoice> searchProduct(String keyword);
}
