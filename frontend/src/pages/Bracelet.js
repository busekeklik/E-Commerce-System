import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import Product from './Product';

const Bracelet = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts('bracelet');
        console.log('Fetched data:', data); // Veriyi konsolda kontrol edin
        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <h1>Bracelets</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {Array.isArray(products) && products.map(product => (
          <Product key={product.id} product={product} />
        ))}
      </ul>
    </div>
  );
};

export default Bracelet;
