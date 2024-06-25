package com.dev.e_commerce.repository;

import com.dev.e_commerce.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
   List<Order> findAllByOrderByOrderIdDesc();
}
