import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = ({ product }) => {
  return (
    <div className="product">
      <Link to={`/${product.category}/${product.id}`} className="product-link">
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>${product.price}</p>
      </Link>
      <button className="add-to-cart-button">
        <Link to={`/${product.category}/${product.id}`} className="add-to-cart-link">
          Add to Cart
        </Link>
      </button>
    </div>
  );
};

export default Product;
