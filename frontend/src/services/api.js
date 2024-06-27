import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getProductById = (id) => {
  return axios.get(`${API_URL}/products/${id}`);
};

export const getRandomProducts = (count) => {
  return axios.get(`${API_URL}/products`)
    .then(response => {
      const products = Array.isArray(response.data) ? response.data : [];
      return products.sort(() => Math.random() - 0.5).slice(0, count);
    });
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
  try {
    const response = await axios.post(`${API_URL}/orders/add`, null, {
      params: {
        product_id,
        total_price,
        user_id
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error adding to cart:', error);
    throw error;
  }
};

export const updateCartItem = async (itemId, updatedItem) => {
  try {
    const response = await axios.put(`${API_URL}/orders/${itemId}`, updatedItem);
    return response.data;
  } catch (error) {
    console.error('Error updating cart item:', error);
    throw error;
  }
};

export const deleteCartItem = async (itemId) => {
  try {
    const response = await axios.delete(`${API_URL}/orders/${itemId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
