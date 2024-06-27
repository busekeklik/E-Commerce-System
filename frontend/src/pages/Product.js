import React from 'react';
import { Link } from 'react-router-dom';
import './Product.css';

const Product = ({ product }) => {
  return (
    <div className="product">
      <Link to={`/${product.category}/${product.id}`} className="product-link">
        <img src={product.photo_path} alt={product.name} />
        <h3>{product.name}</h3>
        <p>${product.price}</p>
      </Link>
    </div>
  );
};

export default Product;
