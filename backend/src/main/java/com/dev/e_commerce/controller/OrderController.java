package com.dev.e_commerce.controller;

import com.dev.e_commerce.model.Order;
import com.dev.e_commerce.model.Product;
import com.dev.e_commerce.model.User;
import com.dev.e_commerce.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class OrderController {

    private static final Logger logger = LoggerFactory.getLogger(OrderController.class);
    private final OrderService orderService;

    @Autowired
    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/add")
    public ResponseEntity<Order> addOrder(@RequestParam Long product_id, @RequestParam double total_price, @RequestParam Long user_id) {
        logger.debug("Received request to add order with product_id: {}, total_price: {}, user_id: {}", product_id, total_price, user_id);

        User user = new User();
        user.setUser_id(user_id);

        Product product = new Product();
        product.setProduct_Id(product_id);

        Order order = new Order();
        order.setUser(user);
        order.setProduct(product);
        order.setTotal_price(total_price);
        order.setStatus("Pending");

        Order savedOrder = orderService.saveOrder(order);
        logger.debug("Order saved successfully: {}", savedOrder);
        return ResponseEntity.ok(savedOrder);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        return orderService.getOrderById(id)
                .map(order -> ResponseEntity.ok(order))
                .orElse(ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteOrder(@PathVariable Long id) {
        orderService.deleteOrder(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Order> updateOrder(@PathVariable Long id, @RequestBody Order order) {
        return orderService.updateOrder(id, order)
                .map(updatedOrder -> ResponseEntity.ok(updatedOrder))
                .orElse(ResponseEntity.notFound().build());
    }
}