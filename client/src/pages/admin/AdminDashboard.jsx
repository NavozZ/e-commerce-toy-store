import React from 'react';
import { Link } from 'react-router-dom';
import { PackagePlus, Users, ShoppingCart, LayoutDashboard, Tag, ReceiptText, Megaphone } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Sales', value: '$1,280', icon: <ShoppingCart />, color: 'bg-success' },
    { label: 'Active Users', value: '42', icon: <Users />, color: 'bg-primary' },
    { label: 'Toys in Stock', value: '15', icon: <PackagePlus />, color: 'bg-secondary' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-black mb-10 flex items-center gap-4">
        Admin Hub <LayoutDashboard className="text-secondary-hover" size={32} />
      </h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        {stats.map((s) => (
          <div key={s.label} className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 flex items-center gap-6">
            <div className={`p-4 rounded-2xl text-white ${s.color}`}>{s.icon}</div>
            <div>
              <p className="text-gray-400 font-bold uppercase text-xs tracking-widest">{s.label}</p>
              <p className="text-3xl font-black">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <h2 className="text-2xl font-bold mb-6 text-gray-800">Operational Controls</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        
        {/* Inventory */}
        <Link to="/admin/products" className="group bg-gray-900 text-white p-8 rounded-[2.5rem] hover:bg-primary hover:scale-105 transition-all shadow-xl">
          <PackagePlus className="mb-4 text-primary group-hover:text-white" size={40} />
          <h2 className="text-2xl font-black mb-2">Inventory</h2>
          <p className="text-gray-400 group-hover:text-white/95 transition-colors">Add, update, or remove toys from the shop.</p>
        </Link>

        {/* Categories */}
        <Link to="/admin/categories" className="group bg-white border border-gray-100 p-8 rounded-[2.5rem] hover:border-primary hover:scale-105 transition-all shadow-sm">
          <Tag className="mb-4 text-primary" size={40} />
          <h2 className="text-2xl font-black mb-2 text-gray-900">Categories</h2>
          <p className="text-gray-500">Organize store taxonomy and add new classifications.</p>
        </Link>

        {/* Orders */}
        <Link to="/admin/orders" className="group bg-white border border-gray-100 p-8 rounded-[2.5rem] hover:border-success hover:scale-105 transition-all shadow-sm">
          <ReceiptText className="mb-4 text-success" size={40} />
          <h2 className="text-2xl font-black mb-2 text-gray-900">Orders</h2>
          <p className="text-gray-500">Track customer transactions and payment statuses.</p>
        </Link>

        {/* Announcements */}
        <Link to="/admin/announcements" className="group bg-secondary text-white p-8 rounded-[2.5rem] hover:bg-secondary-hover hover:scale-105 transition-all shadow-xl">
          <Megaphone className="mb-4 text-white" size={40} />
          <h2 className="text-2xl font-black mb-2">Announcements</h2>
          <p className="text-white/90">Broadcast real-time alerts and news to all users.</p>
        </Link>

      </div>
    </div>
  );
};

export default AdminDashboard;