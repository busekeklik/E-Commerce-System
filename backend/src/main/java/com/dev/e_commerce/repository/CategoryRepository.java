package com.dev.e_commerce.repository;

import com.dev.e_commerce.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
     Category findByName(String name);
}
