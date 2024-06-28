package com.dev.e_commerce.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OrderRequest {
    private Long product_id;
    private double total_price;
    private Long user_id;
}