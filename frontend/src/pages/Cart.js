import React from 'react';
import { useCart } from '../contexts/CartContext';
import CartItem from '../components/CartItem';

const Cart = () => {
  const { cartItems, removeItem } = useCart();

  return (
    <div>
      <h2>Your Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} onRemove={() => removeItem(item.id)} />
          ))}
          <p>Total: {calculateTotal(cartItems)} TL</p>
        </div>
      )}
    </div>
  );
};

function calculateTotal(cartItems) {
  return cartItems.reduce((total, item) => total + item.price, 0).toFixed(2);
}

export default Cart;
