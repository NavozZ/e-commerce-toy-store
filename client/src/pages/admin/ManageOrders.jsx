import React, { useState, useEffect, useContext } from 'react';
import axios from '../../api/axios';
import { AuthContext } from '../../context/AuthContext';
import { ChevronDown, ChevronUp, ShoppingBag, Calendar, User, DollarSign } from 'lucide-react';

const statusColors = {
  Pending: 'bg-secondary/20 text-secondary-hover border border-secondary/30',
  Paid: 'bg-primary/10 text-primary border border-primary/20',
  Shipped: 'bg-purple-100 text-purple-700 border border-purple-200',
  Delivered: 'bg-success/15 text-success border border-success/30',
  Cancelled: 'bg-rose-50 text-rose-500 border border-rose-100',
};

const ManageOrders = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/orders', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      // Sort: most recent first
      setOrders(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (user) fetchOrders();
  }, [user]);

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.put(`/api/orders/${orderId}/status`, 
        { status: newStatus },
        { headers: { Authorization: `Bearer ${user.token}` } }
      );
      fetchOrders();
    } catch (err) {
      alert("Failed to update status: " + (err.response?.data?.message || err.message));
    }
  };

  const toggleOrderExpand = (id) => {
    setExpandedOrders(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="max-w-6xl mx-auto p-10">
      <h1 className="text-3xl font-black mb-8 text-gray-900 flex items-center gap-3">
        Order Management 📦
      </h1>

      {orders.length === 0 ? (
        <div className="bg-white p-10 rounded-[2.5rem] shadow-sm text-center border border-gray-100 py-20 flex flex-col items-center gap-4">
          <span className="text-6xl animate-bounce">📦</span>
          <h3 className="text-2xl font-black text-gray-800">No orders placed yet</h3>
          <p className="text-gray-500 font-medium">As soon as customers buy toys, they will appear here.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-[2.5rem] shadow-sm border border-gray-100 overflow-hidden">
              {/* Header Info */}
              <div 
                className="p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 cursor-pointer hover:bg-gray-50/50 transition-colors"
                onClick={() => toggleOrderExpand(order._id)}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 flex-1 w-full">
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                      <User size={14} /> Customer
                    </p>
                    <p className="font-bold text-gray-800">{order.user?.name || 'Unknown'}</p>
                    <p className="text-xs text-gray-500">{order.user?.email || 'N/A'}</p>
                  </div>
                  
                  <div className="space-y-1">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                      <Calendar size={14} /> Placed On
                    </p>
                    <p className="font-bold text-gray-800">{new Date(order.createdAt).toLocaleDateString()}</p>
                    <p className="text-xs text-gray-500">ID: #{order._id.slice(-6)}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1">
                      <DollarSign size={14} /> Total Price
                    </p>
                    <p className="text-2xl font-black text-primary">${order.totalPrice.toFixed(2)}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0">
                  <div onClick={(e) => e.stopPropagation()} className="flex items-center gap-2">
                    <select 
                      value={order.status}
                      onChange={(e) => handleStatusChange(order._id, e.target.value)}
                      className={`px-3 py-1.5 rounded-full text-xs font-bold uppercase cursor-pointer outline-none transition-all ${statusColors[order.status]}`}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Paid">Paid</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  {expandedOrders[order._id] ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                </div>
              </div>

              {/* Expanded Detail View */}
              {expandedOrders[order._id] && (
                <div className="px-8 pb-8 border-t border-gray-50 pt-6 bg-gray-50/20">
                  <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">Purchased Toys</h4>
                  <div className="space-y-4">
                    {order.orderItems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-4 py-2 border-b border-gray-100/50 last:border-0">
                        <div className="flex items-center gap-4">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-16 h-16 object-cover rounded-2xl border border-gray-100 bg-white" 
                          />
                          <div>
                            <p className="font-black text-gray-800 text-sm">{item.name}</p>
                            <p className="text-xs text-gray-400 font-medium">Qty: {item.qty}</p>
                          </div>
                        </div>
                        <p className="font-bold text-gray-800">${(item.price * item.qty).toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col sm:flex-row justify-between gap-4 text-sm text-gray-500">
                    <div>
                      <span className="font-bold text-gray-400 uppercase tracking-wider block text-xs mb-1">Shipping Address</span>
                      <p className="font-medium text-gray-700">{order.shippingAddress?.address}, {order.shippingAddress?.city}</p>
                    </div>
                    {order.paidAt && (
                      <div className="sm:text-right">
                        <span className="font-bold text-gray-400 uppercase tracking-wider block text-xs mb-1">Paid At</span>
                        <p className="font-medium text-gray-700">{new Date(order.paidAt).toLocaleString()}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageOrders;
