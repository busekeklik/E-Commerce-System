package com.dev.e_commerce.service;

import com.dev.e_commerce.dto.OrderRequest;
import com.dev.e_commerce.model.Order;
import com.dev.e_commerce.model.Product;
import com.dev.e_commerce.model.User;
import com.dev.e_commerce.repository.OrderRepository;
import com.dev.e_commerce.repository.ProductRepository;
import com.dev.e_commerce.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class OrderService {
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final ProductRepository productRepository;

    @Autowired
    public OrderService(OrderRepository orderRepository, UserRepository userRepository, ProductRepository productRepository) {
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
        this.productRepository = productRepository;
    }

    public Optional<Order> addOrder(OrderRequest orderRequest) {
        Optional<User> user = userRepository.findById(orderRequest.getUser_id());
        Optional<Product> product = productRepository.findById(orderRequest.getProduct_id());

        if (user.isPresent() && product.isPresent()) {
            Order order = new Order();
            order.setUser(user.get());
            order.setProduct(product.get());
            order.setTotal_price(orderRequest.getTotal_price());
            order.setStatus("Pending");
            return Optional.of(orderRepository.save(order));
        } else {
            return Optional.empty();
        }
    }

    public Optional<Order> getOrderById(Long id) {
        return orderRepository.findById(id);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    public void deleteOrder(Long orderId) {
        System.out.println("Deleting order with orderId: " + orderId);
        orderRepository.deleteById(orderId);
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
