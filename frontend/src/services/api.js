import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getProductById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/products/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching product by ID:', error);
    throw error;
  }
};

export const getRandomProducts = async (count) => {
  try {
    const response = await axios.get(`${API_URL}/products`);
    const products = Array.isArray(response.data) ? response.data : [];
    return products.sort(() => Math.random() - 0.5).slice(0, count);
  } catch (error) {
    console.error('Error fetching random products:', error);
    throw error;
  }
};

export const getProducts = async (categoryId) => {
  try {
    const response = await axios.get(`${API_URL}/products/category/${categoryId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

export const getCartItems = async () => {
  try {
    const response = await axios.get(`${API_URL}/orders`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const addCartItem = async (product_id, total_price, user_id) => {
  const payload = { product_id, total_price, user_id };
  console.log("Sending payload:", payload);
  try {
    const response = await axios.post(`${API_URL}/orders/add`, payload);
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error.response ? error.response.data : error);
    throw error;
  }
};

export const updateCartItem = async (orderId, updatedItem) => {
  try {
    const response = await axios.put(`${API_URL}/orders/${orderId}`, updatedItem);
    return response.data;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

export const deleteCartItem = async (orderId) => {
  console.log("Sending DELETE request for orderId:", orderId);
  try {
    const response = await axios.delete(`${API_URL}/orders/${orderId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
