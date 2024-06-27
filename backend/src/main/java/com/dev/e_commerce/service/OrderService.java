package com.dev.e_commerce.service;

import com.dev.e_commerce.model.Order;
import com.dev.e_commerce.model.Product;
import com.dev.e_commerce.model.User;
import com.dev.e_commerce.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public Order saveOrder(Order order) {
        return orderRepository.save(order);
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public void deleteOrder(Long id) {
        orderRepository.deleteById(id);
    }

    public Optional<Order> updateOrder(Long id, Order order) {
        return orderRepository.findById(id).map(existingOrder -> {
            existingOrder.setStatus(order.getStatus());
            existingOrder.setTotal_price(order.getTotal_price());
            existingOrder.setUser(order.getUser());
            existingOrder.setProduct(order.getProduct());
            return orderRepository.save(existingOrder);
        });
    }
}
