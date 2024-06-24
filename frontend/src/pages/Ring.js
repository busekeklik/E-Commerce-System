import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';

const Ring = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts('ring').then(response => {
      setProducts(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Rings</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - ${product.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default Ring;
