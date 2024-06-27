import React, { useEffect, useState } from 'react';
import { getProducts } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Necklace = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const addToCart = (productId) => {
    //Product add
    navigate('/cart');
  };

  return (
    <div>
      <h1>Necklaces</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <div className="products-container">
        {products.length > 0 ? (
          products.map(product => (
            <div className="product" key={product.id}>
              <img src={product.photo_path} alt={product.name} />
              <h3>{product.name}</h3>
              <p>${product.price}</p>
              <button onClick={() => addToCart(product.id, product.name, product.price)}>Add to Cart</button>
            </div>
          ))
        ) : (
          <p>No products found</p>
        )}
      </div>
      </div>
  );
};

export default Necklace;
