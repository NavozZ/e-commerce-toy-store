import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';

// Layouts
import RootLayout from './components/layouts/RootLayout';
import ProtectLayout from './components/layouts/ProtectLayout';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import Cart from './pages/Cart';
import Search from './pages/Search';

// Helper component for 404
const NotFound = () => (
  <div className="text-center py-20 text-2xl font-bold text-gray-500">
    404 - Page Not Found 🐰
  </div>
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Member 2: Auth Provider wraps everything */}
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          
          {/* Main Layout (LiveFeed + Navbar) */}
          <Route path="/" element={<RootLayout />}>
            
            {/* Public Routes */}
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="search" element={<Search />} />
            <Route path="login" element={<Login />} />

            {/* Protected Routes (Member 2 Security) */}
            <Route element={<ProtectLayout />}>
              <Route path="cart" element={<Cart />} />
              {/* You can add more protected routes here later, like:
                  <Route path="account" element={<AccountPage />} /> 
                  <Route path="orders" element={<OrdersPage />} /> 
              */}
            </Route>

            {/* 404 Route */}
            <Route path="*" element={<NotFound />} />
            
          </Route>

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);