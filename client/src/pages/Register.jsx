import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';

const Register = () => {
  // 1. Use 'name' to match your Database User Model
  const [name, setName] = useState(''); 
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // 2. Send 'name' to the backend (Must match authController.js)
      const { data } = await axios.post('/api/auth/register', { 
        name,      // <--- This was likely 'username' causing the error
        email, 
        password 
      });
      
      login(data);
      alert('Registration Successful! 🎉');
      navigate('/');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-8 bg-white rounded-3xl shadow-xl">
      <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Join the Family</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        {/* Input Label says "Full Name" for UI, but saves to 'name' */}
        <input 
          type="text" 
          placeholder="Full Name" // You can change this to "Username" if you prefer
          required
          className="w-full p-4 bg-gray-50 border rounded-xl outline-none focus:border-blue-500"
          value={name}
          onChange={e => setName(e.target.value)} 
        />
        <input 
          type="email" 
          placeholder="Email Address" 
          required
          className="w-full p-4 bg-gray-50 border rounded-xl outline-none focus:border-blue-500"
          value={email}
          onChange={e => setEmail(e.target.value)} 
        />
        <input 
          type="password" 
          placeholder="Password" 
          required
          className="w-full p-4 bg-gray-50 border rounded-xl outline-none focus:border-blue-500"
          value={password}
          onChange={e => setPassword(e.target.value)} 
        />
        <button className="w-full bg-blue-600 text-white py-4 rounded-xl font-bold hover:bg-blue-700 transition-all">
          Create Account
        </button>
      </form>
      <p className="mt-4 text-center text-gray-500">
        Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Login</Link>
      </p>
    </div>
  );
};

export default Register;