import React from 'react';

const StockIndicator = ({ stock }) => {
  if (stock === 0) {
    return (
      <span className="bg-rose-50 text-rose-500 border border-rose-100 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
        Out of Stock
      </span>
    );
  }
  if (stock <= 5) {
    return (
      <span className="bg-secondary/20 text-secondary-hover border border-secondary/30 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider">
        Only {stock} left!
      </span>
    );
  }
  return null;
};

export default StockIndicator;
