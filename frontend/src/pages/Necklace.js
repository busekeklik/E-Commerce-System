import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';

const Necklace = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts('necklace').then(response => {
      setProducts(response.data);
    });
  }, []);

  return (
    <div>
      <h1>Necklaces</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - ${product.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default Necklace;
