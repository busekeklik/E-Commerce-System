import React, { useEffect, useState } from 'react';
import { getProductById } from '../services/api';

const ProductDetail = ({ match }) => {
  const [product, setProduct] = useState({});
  const { id } = match.params;
console.log('Product ID:', id);

  useEffect(() => {
    getProductById(id)
      .then(response => {
        console.log('API Response:', response.data);
        setProduct(response.data);
      })
      .catch(error => {
        console.error('Error fetching product:', error);
      });
  }, [id]); 

  return (
    <div>
      <h2>Product Detail</h2>
      {product && (
        <div>
          <img src={product.photo_path} alt={product.name} />
          <h3>{product.name}</h3>
          <p>{product.description}</p>
          <p>${product.price}</p>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
