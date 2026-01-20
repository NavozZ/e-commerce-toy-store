import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; // Import Context
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext); // Get login function
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Connect to Member 2's Backend
      const { data } = await axios.post('/api/auth/login', { email, password });
      
      // Update Global State
      login(data);
      
      alert(`Welcome back, ${data.name}!`);
      navigate('/'); // Redirect to Home
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-3xl shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Welcome Back</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 outline-none"
          onChange={e => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-xl focus:border-blue-500 outline-none"
          onChange={e => setPassword(e.target.value)} 
        />
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-xl font-bold transition-all">
          Sign In
        </button>
      </form>
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Don't have an account?</p>
        <Link to="/register" className="text-blue-600 font-bold hover:underline">
          Create an account here
        </Link>
      </div>
    </div>
  );
};

export default Login;