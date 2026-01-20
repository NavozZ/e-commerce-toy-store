import React from 'react';
import { Link } from 'react-router-dom';
import { PackagePlus, Users, ShoppingCart, LayoutDashboard } from 'lucide-react';

const AdminDashboard = () => {
  const stats = [
    { label: 'Total Sales', value: '$1,280', icon: <ShoppingCart />, color: 'bg-green-500' },
    { label: 'Active Users', value: '42', icon: <Users />, color: 'bg-blue-500' },
    { label: 'Toys in Stock', value: '15', icon: <PackagePlus />, color: 'bg-purple-500' },
  ];

  return (
    <div className="max-w-350 mx-auto px-6 py-10">
      <h1 className="text-4xl font-black mb-10 flex items-center gap-4">
        Admin Hub <LayoutDashboard className="text-amber-500" size={32} />
      </h1>

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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Link to="/admin/products" className="group bg-gray-900 text-white p-10 rounded-[3rem] hover:bg-blue-600 transition-all">
          <h2 className="text-2xl font-black mb-2">Inventory Management</h2>
          <p className="text-gray-400 group-hover:text-white transition-colors">Add, update, or remove toys from the shop.</p>
        </Link>
        <div className="bg-white border-4 border-dashed border-gray-100 p-10 rounded-[3rem] flex items-center justify-center text-gray-300 font-bold">
          More Admin Tools Coming Soon...
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;