import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';

// Layouts
import RootLayout from './components/layouts/RootLayout';
import ProtectLayout from './components/layouts/ProtectLayout';
import AdminProtectLayout from './components/layouts/AdminProtectLayout';

// Pages
import Home from './pages/Home';
import Products from './pages/Products';
import Login from './pages/Login';
import Register from './pages/Register'; 
import Cart from './pages/Cart';
import Search from './pages/Search';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import AdminDashboard from './pages/admin/AdminDashboard';
import ManageProducts from './pages/admin/ManageProducts';
import ProductDetails from './pages/ProductDetails';
import ManageCategories from './pages/admin/ManageCategories';
import ManageAnnouncements from './pages/admin/ManageAnnouncements';
import Account from './pages/Account';
import ManageOrders from './pages/admin/ManageOrders';
import Wishlist from './pages/Wishlist';

const NotFound = () => (
  <div className="text-center py-20 text-2xl font-bold text-gray-500">
    404 - Page Not Found 🐰
  </div>
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <WishlistProvider>
        <CartProvider>  
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<RootLayout />}>
              <Route index element={<Home />} />
              <Route path="products" element={<Products />} />
              <Route path="search" element={<Search />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route path="product/:id" element={<ProductDetails />} />

              <Route element={<AdminProtectLayout />}>
                <Route path="admin" element={<AdminDashboard />} />
                <Route path="admin/products" element={<ManageProducts />} />
                <Route path="admin/categories" element={<ManageCategories />} />
                <Route path="admin/announcements" element={<ManageAnnouncements />} />
                <Route path="admin/orders" element={<ManageOrders />} />
              </Route>

              <Route element={<ProtectLayout />}>
                <Route path="cart" element={<Cart />} />
                <Route path="account" element={<Account />} />
                <Route path="wishlist" element={<Wishlist />} />
              </Route>

              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
        </CartProvider>
      </WishlistProvider>
    </AuthProvider>
  </StrictMode>
);