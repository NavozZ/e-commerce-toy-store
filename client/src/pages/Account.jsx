import React, { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../context/AuthContext';
import { Package, Calendar, Tag, ChevronDown, ChevronUp } from 'lucide-react';

const Account = () => {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [expandedOrders, setExpandedOrders] = useState({});

  useEffect(() => {
    const fetchOrders = async () => {
      const { data } = await axios.get('/api/orders/myorders', {
        headers: { Authorization: `Bearer ${user.token}` }
      });
      setOrders(data);
    };
    if (user) fetchOrders();
  }, [user]);

  useEffect(() => {
    if (orders.length > 0) {
      let mostRecentId = null;
      let maxTime = 0;
      orders.forEach(order => {
        const time = new Date(order.createdAt).getTime();
        if (time > maxTime) {
          maxTime = time;
          mostRecentId = order._id;
        }
      });
      if (mostRecentId) {
        setExpandedOrders({ [mostRecentId]: true });
      }
    }
  }, [orders]);

  const toggleOrder = (orderId) => {
    setExpandedOrders(prev => ({
      ...prev,
      [orderId]: !prev[orderId]
    }));
  };

  const getPurchasedToys = () => {
    const toysMap = {};
    const sortedOrders = [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    
    sortedOrders.forEach(order => {
      order.orderItems.forEach(item => {
        const productId = item.product?._id || item.product || item.name;
        if (!toysMap[productId]) {
          toysMap[productId] = {
            id: productId,
            name: item.name,
            image: item.image,
            lastPurchased: order.createdAt,
            totalQty: 0
          };
        }
        toysMap[productId].totalQty += item.qty;
      });
    });
    
    return Object.values(toysMap);
  };

  const purchasedToys = getPurchasedToys();

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
            <div 
              key={order._id} 
              className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-50 flex flex-col gap-6 cursor-pointer"
              onClick={() => toggleOrder(order._id)}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 w-full">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-gray-400 uppercase tracking-tighter">
                     <Calendar size={14} /> {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                  <p className="font-black text-lg text-gray-800">Order ID: #{order._id.slice(-6)}</p>
                </div>
                <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
                  <div className="flex items-center gap-2">
                    <span className="bg-green-50 text-green-600 px-4 py-1 rounded-full text-xs font-bold">Paid</span>
                    <span className="text-2xl font-black text-blue-600">${order.totalPrice.toFixed(2)}</span>
                  </div>
                  {expandedOrders[order._id] ? <ChevronUp size={20} className="text-gray-400" /> : <ChevronDown size={20} className="text-gray-400" />}
                </div>
              </div>

              {expandedOrders[order._id] && (
                <div className="border-t border-gray-100 pt-6 w-full" onClick={(e) => e.stopPropagation()}>
                  <h4 className="text-sm font-bold text-gray-400 uppercase mb-4 tracking-wider">Purchased Items</h4>
                  <div className="space-y-4">
                    {order.orderItems.map((item, idx) => (
                      <div key={idx} className="flex items-center justify-between gap-4 py-2 border-b border-gray-50 last:border-0">
                        <div className="flex items-center gap-4">
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-16 h-16 object-cover rounded-2xl border border-gray-100" 
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
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {purchasedToys.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Tag className="text-yellow-500" /> All Purchased Toys
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {purchasedToys.map((toy) => (
              <div key={toy.id} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-gray-50 flex flex-col gap-4">
                <img 
                  src={toy.image} 
                  alt={toy.name} 
                  className="w-full h-40 object-cover rounded-3xl border border-gray-100" 
                />
                <div className="space-y-1 flex-1">
                  <p className="font-black text-gray-800 text-base line-clamp-1">{toy.name}</p>
                  <p className="text-xs text-gray-400 font-medium">
                    Last adopted: {new Date(toy.lastPurchased).toLocaleDateString()}
                  </p>
                </div>
                <div className="flex justify-between items-center mt-2 border-t border-gray-50 pt-3">
                  <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">Total Qty</span>
                  <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-xs font-black">
                    {toy.totalQty} owned
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;