import React, { useEffect, useState } from 'react';
import { getProducts, addCartItem } from '../services/api';
import { useNavigate } from 'react-router-dom';
import './CategoryStyles.css';

const Necklace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts(1);
        setProducts(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addToCart = async (productId, price) => {
    const userString = localStorage.getItem('user');
    const user = JSON.parse(userString);
    if (!user || !user.user_id) {
      console.error('User ID not found');
      return;
    }

    try {
      await addCartItem(productId, price, user.user_id);
      console.log('Item added to cart successfully');
      navigate('/cart');
    } catch (error) {
      console.error('Error adding item to cart:', error);
    }
  };

  return (
    <div>
      <h1>Necklaces</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="products-container">
        {products.map(product => (
          <div key={product.product_id} className="product">
            <img src={product.photo_path} alt={product.name} />
            <h3>{product.name}</h3>
            <p>${product.price}</p>
            <button onClick={() => addToCart(product.product_id, product.price)}>Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Necklace;
