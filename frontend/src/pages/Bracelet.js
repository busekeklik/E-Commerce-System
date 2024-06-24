import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';

const Bracelet = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts('bracelet').then(response => {
      setProducts(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Bracelets</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - ${product.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default Bracelet;
