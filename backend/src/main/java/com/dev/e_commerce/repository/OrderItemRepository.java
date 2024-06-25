package com.dev.e_commerce.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import com.dev.e_commerce.model.OrderItem;

public interface OrderItemRepository extends JpaRepository<OrderItem, Integer> {
    public List<OrderItem> findByOrderOrderId(int orderId);

}
