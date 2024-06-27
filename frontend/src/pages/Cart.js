import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getCartItems, addCartItem, updateCartItem, deleteCartItem } from '../services/api';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    fetchCartItems();
  }, []);

  const fetchCartItems = async () => {
    try {
      const response = await getCartItems();
      if (response.data) {
        setCartItems(response.data);
        calculateTotalPrice(response.data);
      }
    } catch (error) {
      console.error('Error fetching cart items:', error);
    }
  };

  const calculateTotalPrice = (items) => {
    let total = 0;
    items.forEach(item => {
      total += item.quantity * item.product.price;
    });
    setTotalPrice(total);
  };

  const handleUpdateCartItem = async (itemId, quantity) => {
    try {
      const updatedItem = { ...cartItems.find(item => item.id === itemId), quantity };
      await updateCartItem(itemId, updatedItem);
      fetchCartItems();
    } catch (error) {
      console.error('Error updating cart item:', error);
    }
  };

  const handleDeleteCartItem = async (itemId) => {
    try {
      await deleteCartItem(itemId);
      fetchCartItems();
    } catch (error) {
      console.error('Error deleting cart item:', error);
    }
  };

  const handleCheckout = () => {
    console.log('Proceed to checkout');
  };

  return (
    <div>
      <h1>Shopping Cart</h1>
      <ul>
        {cartItems.length > 0 ? (
          cartItems.map(item => (
            <li key={item.id} className="cart-item">
              <div className="item-info">
                <img src={item.product.photo_path} alt={item.product.name} />
                <div className="item-details">
                  <h3>{item.product.name}</h3>
                  <p>Price: ${item.product.price}</p>
                  <p>
                    Quantity:{' '}
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => handleUpdateCartItem(item.id, parseInt(e.target.value))}
                      onBlur={fetchCartItems}
                    />
                  </p>
                  <button onClick={() => handleDeleteCartItem(item.id)}>Remove</button>
                </div>
              </div>
            </li>
          ))
        ) : (
          <li>No items in cart</li>
        )}
      </ul>
      <div className="cart-summary">
        <h3>Total Price: ${totalPrice}</h3>
        {cartItems.length > 0 && (
          <>
            <button onClick={handleCheckout}>Proceed to Checkout</button>
            <button onClick={() => setCartItems([])}>Clear Cart</button> { }
          </>
        )}
        <Link to="/">Continue Shopping</Link>
      </div>
    </div>
  );
};

export default Cart;
