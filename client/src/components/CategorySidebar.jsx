import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CategorySidebar = ({ onFilterChange }) => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/search/categories')
      .then(res => setCategories(['All', ...res.data]))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="w-64 bg-gray-100 p-4 min-h-screen">
      <h3 className="font-bold mb-4">Categories</h3>
      <ul>
        {categories.map(cat => (
          <li 
            key={cat} 
            className="cursor-pointer hover:text-blue-600 mb-2"
            onClick={() => onFilterChange(cat)}
          >
            {cat}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;