package com.dev.e_commerce.repository;

import com.dev.e_commerce.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProductRepository extends JpaRepository<Product, Long> {
    public Product findByName(String name);
}
