import React, { useEffect, useState, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getCartItems, updateCartItem, deleteCartItem } from '../services/api';
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const navigate = useNavigate();

  const fetchCartItems = useCallback(async () => {
    try {
      const response = await getCartItems();
      if (response && Array.isArray(response)) {
        setCartItems(response);
        calculateTotalPrice(response);
      } else {
        console.error('Received unexpected data structure:', response);
        setCartItems([]);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  }, []);

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  const calculateTotalPrice = (items) => {
    const total = items.reduce((acc, item) => acc + item.total_price, 0);
    setTotalPrice(total);
  };

  const handleUpdateCartItem = async (orderId, quantity) => {
    try {
      const updatedItem = { ...cartItems.find(item => item.orderId === orderId), quantity };
      await updateCartItem(orderId, updatedItem);
      fetchCartItems();
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const handleDeleteCartItem = async (orderId) => {
    console.log("Deleting order with orderId:", orderId);
    try {
      await deleteCartItem(orderId);
      fetchCartItems();
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const continueShopping = () => {
    navigate('/');
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {cartItems.map(item => (
          <li key={item.orderId} className="cart-item">
            <div className="item-info">
              <img src={item.product.photo_path} alt={item.product.name} />
              <div className="item-details">
                <h3>{item.product.name}</h3>
                <p>Price: ${item.product.price}</p>
                <p>
                  Quantity: 
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleUpdateCartItem(item.orderId, parseInt(e.target.value, 10))}
                    onBlur={() => fetchCartItems()}
                  />
                </p>
                <button onClick={() => handleDeleteCartItem(item.orderId)}>Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className="cart-summary">
        <h3>Total Price: ${totalPrice.toFixed(2)}</h3>
        <button onClick={continueShopping} className="continue-shopping-btn">Continue Shopping</button>
      </div>
    </div>
  );
};

export default Cart;
