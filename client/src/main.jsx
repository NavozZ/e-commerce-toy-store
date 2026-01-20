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
import Register from './pages/Register'; // Import the new page
import Cart from './pages/Cart';
import Search from './pages/Search';

const NotFound = () => (
  <div className="text-center py-20 text-2xl font-bold text-gray-500">
    404 - Page Not Found 🐰
  </div>
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <CartProvider>  
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="search" element={<Search />} />
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} /> {/* Add this line */}

            <Route element={<ProtectLayout />}>
              <Route path="cart" element={<Cart />} />
            </Route>

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  </StrictMode>
);