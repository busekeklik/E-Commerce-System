import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getOrderById, updateOrder, deleteOrder } from '../services/api';

const OrderPage = ({ match, history }) => {
  const [order, setOrder] = useState(null);
  const [editing, setEditing] = useState(false);
  const [status, setStatus] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const fetchOrder = async () => {
      const orderId = match.params.id;
      try {
        const response = await getOrderById(orderId);
        setOrder(response.data);
        setStatus(response.data.status);
        setTotalPrice(response.data.total_price);
      } catch (error) {
        console.error('Error fetching order:', error);
      }
    };
    fetchOrder();
  }, [match.params.id]);

  const handleUpdateOrder = async () => {
    try {
      const updatedOrder = { ...order, status, total_price: totalPrice };
      const response = await updateOrder(order.orderId, updatedOrder);
      setOrder(response.data);
      setEditing(false);
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  const handleDeleteOrder = async () => {
    try {
      await deleteOrder(order.orderId);
      history.push('/orders');
    } catch (error) {
      console.error('Error deleting order:', error);
    }
  };

  if (!order) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Order Detail</h2>
      <p><strong>Order ID:</strong> {order.orderId}</p>
      {editing ? (
        <div>
          <label>Status: </label>
          <input
            type="text"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          />
          <br />
          <label>Total Price: </label>
          <input
            type="number"
            value={totalPrice}
            onChange={(e) => setTotalPrice(parseFloat(e.target.value))}
          />
          <br />
          <button onClick={handleUpdateOrder}>Save</button>
          <button onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div>
          <p><strong>Status:</strong> {order.status}</p>
          <p><strong>Total Price:</strong> ${order.total_price}</p>
        </div>
      )}
      <div>
        <h3>Order Items</h3>
        <ul>
          {order.orderItems.map((item) => (
            <li key={item.id}>
              {item.product.name} - Quantity: {item.quantity} - Subtotal: ${item.subtotal}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={() => setEditing(true)}>Edit Order</button>
        <button onClick={handleDeleteOrder}>Delete Order</button>
        <Link to="/orders">Back to Orders</Link>
      </div>
    </div>
  );
};

export default OrderPage;
