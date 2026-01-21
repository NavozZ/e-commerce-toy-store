import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      
      const { data } = await axios.post('/api/auth/register', { name, email, password });
      login(data);
      alert('Registration Successful!');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-3xl shadow-xl">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-600">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input 
          type="text" placeholder="Full Name" required 
          className="w-full p-4 bg-gray-50 border rounded-xl"
          value={name} onChange={e => setName(e.target.value)} 
        />
        <input 
          type="email" placeholder="Email" required 
          className="w-full p-4 bg-gray-50 border rounded-xl"
          value={email} onChange={e => setEmail(e.target.value)} 
        />
        <input 
          type="password" placeholder="Password" required 
          className="w-full p-4 bg-gray-50 border rounded-xl"
          value={password} onChange={e => setPassword(e.target.value)} 
        />
        <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold">Register</button>
      </form>
      <div className="mt-4 text-center">
        <Link to="/login" className="text-blue-600 font-bold">Login instead</Link>
      </div>
    </div>
  );
};

export default Register;