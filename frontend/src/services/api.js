import axios from 'axios';

const API_URL = 'http://localhost:8080/api';

export const getProducts = (category) => {
  return axios.get(`${API_URL}/products?category=${category}`);
};

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