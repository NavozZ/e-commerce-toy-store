import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext'; 
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext); 
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/auth/login', { email, password });
      login(data);
      alert(`Welcome back, ${data.name}!`);
      navigate('/'); 
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-10 bg-white border border-gray-100 rounded-[2.5rem] shadow-xl">
      <h2 className="text-3xl font-black mb-8 text-center text-gray-800">Welcome Back</h2>
      <form onSubmit={handleLogin} className="space-y-4">
        <input 
          type="email" 
          placeholder="Email" 
          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-primary outline-none"
          onChange={e => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-primary outline-none"
          onChange={e => setPassword(e.target.value)} 
        />
        <button className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-full font-black transition-all cursor-pointer shadow-lg hover:shadow-primary/20">
          Sign In
        </button>
      </form>
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Don't have an account?</p>
        <Link to="/register" className="text-primary font-black hover:underline mt-1 inline-block">
          Create an account here
        </Link>
      </div>
    </div>
  );
};

export default Login;