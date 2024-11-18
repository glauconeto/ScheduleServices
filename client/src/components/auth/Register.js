import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService.js';

const Register = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (userData.password !== userData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await authService.register(userData);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    `<div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6">Register</h2>
      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Name</label>
          <input
            type="text"
            className="w-full p-2 border rounded"
            value={userData.name}
            onChange={(e) => setUserData({...userData, name: e.target.value})}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Email</label>
          <input
            type="email"
            className="w-full p-2 border rounded"
            value={userData.email}
            onChange={(e) => setUserData({...userData, email: e.target.value})}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={userData.password}
            onChange={(e) => setUserData({...userData, password: e.target.value})}
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 mb-2">Confirm Password</label>
          <input
            type="password"
            className="w-full p-2 border rounded"
            value={userData.confirmPassword}
            onChange={(e) => setUserData({...userData, confirmPassword: e.target.value})}
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>`
  );
};

export default Register;