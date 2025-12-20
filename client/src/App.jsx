import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Shared Components
import Navbar from './components/Navbar';
import LiveFeed from './components/LiveFeed'; // Member 4 (WebSocket requirement)

// Member Pages
import Home from './pages/Home';
import Products from './pages/Products';   // Member 1
import Login from './pages/Login';         // Member 2
import Cart from './pages/Cart';           // Member 3
import SearchResults from './pages/Search'; // Member 5

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 font-sans">
        {/* Real-time notification bar (Worth high marks for Asynchronous Communication) */}
        <LiveFeed /> 

        {/* Global Navigation - Links all member parts */}
        <Navbar />

        <main className="container mx-auto py-6 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/search" element={<SearchResults />} />
            {/* Future Member 6: Admin Dashboard or Test Results */}
          </Routes>
        </main>

        <footer className="bg-white border-t py-8 text-center text-gray-500 text-sm">
          <p>&copy; 2025 University of Plymouth Toy Store Project</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;