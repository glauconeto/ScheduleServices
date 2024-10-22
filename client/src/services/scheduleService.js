import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

export const scheduleService = {
  async getSchedules() {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/schedule`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  },

  async createSchedule(scheduleData) {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/schedule`, scheduleData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  }
};