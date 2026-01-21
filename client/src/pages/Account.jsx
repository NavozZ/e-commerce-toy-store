import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../context/AuthContext';
import { Package, Calendar, Tag } from 'lucide-react';

const Account = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get('/api/orders/myorders', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setOrders(data);
    };
    if (user) fetchOrders();
  }, [user]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-20">
      <div className="mb-12">
        <h1 className="text-4xl font-black mb-2">Hello, {user?.name}! 👋</h1>
        <p className="text-gray-500 font-medium">Here are the toys you've adopted so far.</p>
      </div>

      <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
        <Package className="text-blue-600" /> Recent Orders
      </h2>

      {orders.length === 0 ? (
        <div className="bg-white p-10 rounded-3xl text-center border-2 border-dashed border-gray-100">
           <p className="text-gray-400 font-bold">No orders found yet. Time to go shopping!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 flex flex-col md:flex-row justify-between items-center gap-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-tighter">
                   <Calendar size={14} /> {new Date(order.createdAt).toLocaleDateString()}
                </div>
                <p className="font-black text-lg text-gray-800">Order ID: #{order._id.slice(-6)}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="bg-green-50 text-green-600 px-4 py-1 rounded-full text-xs font-bold">Paid</span>
                <span className="text-2xl font-black text-blue-600">${order.totalPrice.toFixed(2)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Account;