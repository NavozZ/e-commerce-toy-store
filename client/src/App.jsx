
import LiveFeed from './components/LiveFeed';

import Products from './pages/Products';
import Cart from './pages/Cart';
import './App.css';


function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <LiveFeed /> {/* Mandatory WebSocket Feed */}
        <nav className="p-4 bg-blue-600 text-white flex justify-between">
          <h1 className="font-bold">Toy Store 🧸</h1>
          <div>
            <a href="/" className="mr-4">Catalog</a>
            <a href="/cart">Cart 🛒</a>
          </div>
        </nav>
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;