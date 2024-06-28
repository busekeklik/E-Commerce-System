import React, { useEffect, useState } from 'react';
import { getRandomProducts, addCartItem } from '../services/api';
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/ProductList';

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
        const randomProducts = await getRandomProducts(3);
        console.log("Fetched products:", randomProducts);
        setProducts(randomProducts);
    } catch (error) {
        console.error('Error fetching random products:', error);
    }
};

const addToCart = async (product_id, total_price) => {
  if (typeof product_id === 'undefined') {
      console.error('Product ID is undefined');
      return;
  }
  try {
      const userString = localStorage.getItem('user');
      const user = JSON.parse(userString);
      if (!user || !user.user_id) {
          console.error('User ID not found');
          return;
      }
      console.log('Adding to cart:', { product_id, total_price, user_id: user.user_id });
      await addCartItem(product_id, total_price, user.user_id);
      navigate('/cart');
  } catch (error) {
      console.error('Error adding to cart:', error);
  }
};

  return (
    <div>
      <h1>Home</h1>
      <ProductList products={products} addToCart={addToCart} />
    </div>
  );
};

export default Home;
