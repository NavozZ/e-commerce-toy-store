import React, { useContext } from 'react';
import { WishlistContext } from '../context/WishlistContext';
import { CartContext } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { ShoppingBag, Trash2 } from 'lucide-react';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useContext(WishlistContext);
  const { addToCart } = useContext(CartContext);

  const handleMoveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product._id);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="max-w-md mx-auto text-center py-20 bg-white rounded-[3rem] shadow-sm border border-gray-100 flex flex-col items-center gap-4 mt-20">
        <span className="text-6xl animate-bounce">💖</span>
        <h3 className="text-2xl font-black text-gray-800">Your wishlist is empty!</h3>
        <p className="text-gray-500 font-medium max-w-sm">Tap the heart on any toy to add it to your wishlist and keep track of your favorite playmates!</p>
        <Link to="/products" className="mt-4 bg-primary text-white px-6 py-3 rounded-full font-black hover:bg-primary-hover shadow-lg hover:shadow-primary/20 transition-all cursor-pointer">
          Go Shopping 🎠
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-4xl font-black mb-10 text-gray-800">Your Wishlist 💖</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {wishlistItems.map((product) => (
          <div key={product._id} className="group bg-white p-6 rounded-[2.5rem] shadow-sm hover:shadow-2xl hover:scale-105 transition-all duration-300 border border-gray-100 flex flex-col justify-between">
            <Link to={`/product/${product._id}`}>
              <div className="cursor-pointer">
                <img src={product.imageUrl || product.image} alt={product.name} className="w-full h-48 object-contain mb-4 group-hover:scale-110 transition-transform duration-500" />
                <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider mb-2 inline-block">{product.category}</span>
                <h3 className="font-bold text-lg mb-1 group-hover:text-primary hover:text-primary transition-colors line-clamp-1">{product.name}</h3>
                <p className="text-primary font-black text-xl mb-4">${product.price}</p>
              </div>
            </Link>

            <div className="flex gap-2 mt-2">
              <button 
                onClick={() => handleMoveToCart(product)}
                className="flex-1 flex items-center justify-center gap-2 bg-gray-900 text-white py-3 rounded-full font-black hover:bg-primary hover:shadow-primary/20 hover:shadow-lg transition-all cursor-pointer"
              >
                <ShoppingBag size={18} /> Move to Bag
              </button>
              <button 
                onClick={() => removeFromWishlist(product._id)}
                className="p-3 text-rose-400 hover:text-rose-600 hover:bg-rose-50 rounded-full transition-colors cursor-pointer"
              >
                <Trash2 size={20} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
