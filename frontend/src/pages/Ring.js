import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';

const Ring = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getProducts('ring')
      .then(response => {
        setProducts(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  return (
    <div>
      <h1>Rings</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
      {Array.isArray(products) && products.map(product => (
  <li key={product.id}>{product.name} - ${product.price}</li>
))}
      </ul>
    </div>
  );
};

export default Ring;
