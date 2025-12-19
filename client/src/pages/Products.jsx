import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Products = () => {
  const [toys, setToys] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(res => setToys(res.data))
      .catch(err => console.log(err));
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Toy Catalog 🧸</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {toys.map(toy => (
          <div key={toy._id} className="border p-4 rounded shadow">
            <img src={toy.imageUrl} alt={toy.name} className="h-48 w-full object-cover"/>
            <h2 className="text-xl font-semibold mt-2">{toy.name}</h2>
            <p className="text-gray-600">${toy.price}</p>
            <button className="bg-blue-500 text-white px-4 py-2 mt-2 rounded">Add to Cart</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;