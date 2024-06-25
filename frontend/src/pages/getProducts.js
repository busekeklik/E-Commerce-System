import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api';

export const getProducts = async (category) => {
  try {
    const response = await axios.get(`${API_URL}/products`, {
      params: { category }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};
