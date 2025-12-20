import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Search as SearchIcon, Filter } from 'lucide-react';

const SearchResults = () => {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = async (query) => {
    try {
      const res = await axios.get(`/api/search/filter?query=${query}`);
      setResults(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="relative flex-1 w-full">
          <SearchIcon className="absolute left-4 top-3.5 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for toys (e.g. Lego, Puzzles)..."
            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              handleSearch(e.target.value);
            }}
          />
        </div>
        <button className="flex items-center gap-2 bg-gray-100 px-6 py-3 rounded-xl font-semibold text-gray-600 hover:bg-gray-200 transition">
          <Filter size={18} /> Filters
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {results.length > 0 ? (
          results.map((toy) => (
            <div key={toy._id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition">
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                <img src={toy.imageUrl} alt={toy.name} className="object-cover h-full w-full" />
              </div>
              <div className="p-4">
                <span className="text-xs font-bold text-blue-500 uppercase">{toy.category}</span>
                <h3 className="font-bold text-lg text-gray-800">{toy.name}</h3>
                <p className="text-blue-600 font-black mt-2">${toy.price}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center py-10">Start typing to search our toy collection...</p>
        )}
      </div>
    </div>
  );
};

export default SearchResults;