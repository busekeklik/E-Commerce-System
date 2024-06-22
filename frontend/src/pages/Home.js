import React, { useEffect, useState } from 'react';
import { getRandomProducts } from '../services/api';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getRandomProducts(3).then(randomProducts => {
      setProducts(randomProducts);
    });
  }, []);

  return (
    <div>
      <h1>Home</h1>
      <ul>
        {products.map(product => (
          <li key={product.id}>{product.name} - ${product.price}</li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
