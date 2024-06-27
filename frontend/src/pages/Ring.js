import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import Product from './Product';
import { useNavigate } from 'react-router-dom';

const Ring = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const data = await getProducts(3);
      setProducts(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  const addToCart = async (productId, productName, price) => {
    const orderItem = {
      product: { productId: productId },
      quantity: 1,
      price: price,
    };
  
    try {
      const response = await fetch('http://localhost:8080/api/orders/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderItem),
      });
      if (response.ok) {
        console.log('Item added to cart successfully');
        navigate('/cart');
      } else {
        console.error('Failed to add item to cart');
      }
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <div>
      <h1>Rings</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="products-container">
      {products.map(product => (
        <div key={product.id} className="product">
          <Product product={product} />
          <button onClick={() => addToCart(product.id, product.name, product.price)}>Add to Cart</button>
        </div>
      ))}
    </div>
    </div>
  );
};

export default Ring;
