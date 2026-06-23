import React, { useState, useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from '../api/axios';
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
    <div className="max-w-md mx-auto mt-20 p-10 bg-white border border-gray-100 rounded-[2.5rem] shadow-xl">
      <h2 className="text-3xl font-black mb-8 text-center text-primary">Register</h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <input 
          type="text" placeholder="Full Name" required 
          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-primary outline-none"
          value={name} onChange={e => setName(e.target.value)} 
        />
        <input 
          type="email" placeholder="Email" required 
          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-primary outline-none"
          value={email} onChange={e => setEmail(e.target.value)} 
        />
        <input 
          type="password" placeholder="Password" required 
          className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:border-primary outline-none"
          value={password} onChange={e => setPassword(e.target.value)} 
        />
        <button className="w-full bg-primary hover:bg-primary-hover text-white py-4 rounded-full font-black cursor-pointer shadow-lg hover:shadow-primary/20 transition-all">
          Register
        </button>
      </form>
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Already have an account?</p>
        <Link to="/login" className="text-primary font-black hover:underline mt-1 inline-block">
          Login instead
        </Link>
      </div>
    </div>
  );
};

export default Register;