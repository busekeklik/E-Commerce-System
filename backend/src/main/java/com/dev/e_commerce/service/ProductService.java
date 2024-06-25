package com.dev.e_commerce.service;

import com.dev.e_commerce.model.Product;
import com.dev.e_commerce.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    @Autowired
    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product saveProduct(Product product) {
        return productRepository.save(product);
    }

    public Optional<Product> getProductById(Long id) {
        return productRepository.findById(id);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    public void deleteProduct(Long id) {
        productRepository.deleteById(id);
    }

    public Product updateProduct(Long id, Product product) {
        if (productRepository.existsById(id)) {
            product.setProduct_Id(id);
            return productRepository.save(product);
        }
        return null;
    }

    public List<Product> getProductsByCategory(Long Id) {
        List<Product> productList = new ArrayList<>();


        productList = productRepository.findByCategory_Id(Id);
        if (productList == null) {
            return new ArrayList<>();
        }
        return productList;
    }

}
