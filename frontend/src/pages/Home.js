import React, { useEffect, useState } from 'react';
import { getRandomProducts, addCartItem } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const randomProducts = await getRandomProducts(3);
      setProducts(randomProducts);
    } catch (error) {
      console.error('Error fetching random products:', error);
    }
  };

  const addToCart = async (product_id, total_price, user_id) => {
    try {
      await addCartItem(product_id, total_price, user_id);
      navigate('/cart');
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  return (
    <div>
      <h1>Home</h1>
      <div className="products-container">
        {products.length > 0 ? (
          products.map(product => (
            <div className="product" key={product.id}>
              <img src={product.photo_path} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button onClick={() => addToCart(product.id, product.price)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
    </div>
  );
};

export default Home;
