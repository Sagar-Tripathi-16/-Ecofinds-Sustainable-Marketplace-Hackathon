import React, { useState } from 'react';
import { Heart, ShoppingCart, MessageCircle, Star } from 'lucide-react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index = 0,
}) => {
  const { state, dispatch } = useApp();
  const { theme } = state;
  const [isLiked, setIsLiked] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAddingToCart(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 300));

    dispatch({ type: 'ADD_TO_CART', payload: product });
    setIsAddingToCart(false);
  };

  const handleChatClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: 'TOGGLE_CHAT', payload: product.sellerId });
  };

  return (
    <div
      onClick={() =>
        dispatch({ type: 'SET_SELECTED_PRODUCT', payload: product })
      }
      className={`group cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl ${
        theme === 'dark'
          ? 'bg-gray-800 hover:bg-gray-700 border-gray-700'
          : 'bg-white hover:bg-gray-50 border-gray-200'
      } rounded-2xl border shadow-lg overflow-hidden animate-fade-in-up`}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Action buttons overlay */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className={`w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-200 hover:scale-110 ${
              isLiked
                ? 'bg-red-500 text-white'
                : 'bg-white/80 text-gray-700 hover:bg-red-500 hover:text-white'
            }`}
          >
            <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
          </button>

          <button
            onClick={handleChatClick}
            className="w-8 h-8 rounded-full bg-white/80 text-gray-700 flex items-center justify-center backdrop-blur-sm hover:bg-green-500 hover:text-white transition-all duration-200 hover:scale-110"
          >
            <MessageCircle className="w-4 h-4" />
          </button>
        </div>

        {/* Price badge */}
        <div className="absolute top-3 left-3 bg-green-500 text-white px-2 py-1 rounded-full text-sm font-semibold shadow-lg">
          ₹{product.price}
        </div>

        {/* Category badge */}
        <div
          className={`absolute bottom-3 left-3 px-2 py-1 rounded-full text-xs font-medium backdrop-blur-sm ${
            theme === 'dark'
              ? 'bg-gray-900/80 text-gray-200'
              : 'bg-white/80 text-gray-700'
          }`}
        >
          {product.category}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1">
            <h3
              className={`font-semibold text-lg line-clamp-2 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              } group-hover:text-green-600 transition-colors duration-200`}
            >
              {product.title}
            </h3>
            <p
              className={`text-sm mt-1 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              by {product.sellerName}
            </p>
          </div>

          {/* Rating stars */}
          <div className="flex items-center space-x-1 ml-2">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${
                  i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        <p
          className={`text-sm line-clamp-2 mb-4 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}
        >
          {product.description}
        </p>

        {/* Action button */}
        <button
          onClick={handleAddToCart}
          disabled={isAddingToCart}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-2 px-4 rounded-lg hover:from-green-600 hover:to-emerald-700 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 flex items-center justify-center space-x-2"
        >
          {isAddingToCart ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white/30 border-t-white"></div>
              <span>Adding...</span>
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" />
              <span>Add to Cart</span>
            </>
          )}
        </button>
      </div>

      {/* Hover effect glow */}
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-green-400/10 to-emerald-600/10" />
      </div>
    </div>
  );
};
