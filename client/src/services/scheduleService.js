import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL;

export const createSchedule = async (scheduleData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.post(`${API_URL}/schedules`, scheduleData, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getSchedules = async () => {
  try {
    const token = localStorage.getItem('token');
    const response = await axios.get(`${API_URL}/schedules`, {
      headers: { Authorization: `Bearer ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};