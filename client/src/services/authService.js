import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const authService = {
  async login(credentials) {
    const response = await axios.post(`${API_URL}/auth/login`, credentials);
    return response.data;
  },

  async register(userData) {
    const response = await axios.post(`${API_URL}/auth/register`, userData);
    return response.data;
  },

  async verifyToken(token) {
    const response = await axios.post(`${API_URL}/auth/verify`, {}, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};