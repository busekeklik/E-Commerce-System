package com.dev.e_commerce.repository;

import com.dev.e_commerce.model.Address;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface AddressRepository extends JpaRepository<Address, Integer> {
    List<Address> findByUserId(Long userId);
}
