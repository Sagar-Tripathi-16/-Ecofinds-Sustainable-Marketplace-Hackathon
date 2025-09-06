import React from 'react';
import {
  ArrowLeft,
  ShoppingCart,
  MessageCircle,
  Heart,
  Star,
  Shield,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const ProductDetail: React.FC = () => {
  const { state, dispatch } = useApp();
  const { selectedProduct, theme } = state;

  if (!selectedProduct) {
    return null;
  }

  const handleAddToCart = () => {
    dispatch({ type: 'ADD_TO_CART', payload: selectedProduct });

    // Show a success message
    setTimeout(() => {
      dispatch({ type: 'TOGGLE_CART' });
    }, 300);
  };

  const handleChatWithSeller = () => {
    dispatch({ type: 'TOGGLE_CHAT', payload: selectedProduct.sellerId });
  };

  return (
    <div
      className={`min-h-screen pt-20 pb-8 transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-green-50 via-white to-emerald-50'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Button */}
        <button
          onClick={() =>
            dispatch({ type: 'SET_SELECTED_PRODUCT', payload: null })
          }
          className={`mb-6 flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
            theme === 'dark'
              ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              : 'bg-white text-gray-700 hover:bg-gray-50'
          } shadow-lg`}
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Products</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="space-y-4">
            <div className="aspect-square overflow-hidden rounded-2xl shadow-2xl">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.title}
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
              />
            </div>

            {/* Thumbnail strip - placeholder for multiple images */}
            <div className="flex space-x-3">
              {[...Array(4)].map((_, i) => (
                <div
                  key={i}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    i === 0
                      ? 'border-green-500'
                      : theme === 'dark'
                      ? 'border-gray-700'
                      : 'border-gray-200'
                  } ${i > 0 ? 'opacity-50' : ''}`}
                >
                  <img
                    src={selectedProduct.image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center space-x-2 mb-2">
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    theme === 'dark'
                      ? 'bg-green-900/30 text-green-400'
                      : 'bg-green-100 text-green-700'
                  }`}
                >
                  {selectedProduct.category}
                </span>
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < 4
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span
                    className={`text-sm ml-2 ${
                      theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                    }`}
                  >
                    (24 reviews)
                  </span>
                </div>
              </div>

              <h1
                className={`text-4xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {selectedProduct.title}
              </h1>

              <div className="flex items-center space-x-4 mb-4">
                <span className="text-4xl font-bold text-green-600">
                  ₹{selectedProduct.price}
                </span>
                <span
                  className={`text-lg line-through ${
                    theme === 'dark' ? 'text-gray-500' : 'text-gray-400'
                  }`}
                >
                  ₹{Math.round(selectedProduct.price * 1.4)}
                </span>
                <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-sm font-semibold">
                  30% OFF
                </span>
              </div>

              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-sm font-bold">
                      {selectedProduct.sellerName[0]}
                    </span>
                  </div>
                  <span
                    className={`font-medium ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                    }`}
                  >
                    Sold by {selectedProduct.sellerName}
                  </span>
                </div>
                <button
                  onClick={handleChatWithSeller}
                  className="flex items-center space-x-1 px-3 py-1 rounded-full bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span className="text-sm font-medium">Chat</span>
                </button>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2
                className={`text-xl font-bold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Description
              </h2>
              <p
                className={`text-lg leading-relaxed ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                {selectedProduct.description}
              </p>
            </div>

            {/* Eco Benefits */}
            <div
              className={`p-6 rounded-xl border ${
                theme === 'dark'
                  ? 'bg-green-900/20 border-green-800'
                  : 'bg-green-50 border-green-200'
              }`}
            >
              <h3
                className={`text-lg font-bold mb-3 flex items-center ${
                  theme === 'dark' ? 'text-green-400' : 'text-green-700'
                }`}
              >
                <Shield className="w-5 h-5 mr-2" />
                Eco Benefits
              </h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="text-green-500">🌱</span>
                  <span
                    className={
                      theme === 'dark' ? 'text-green-300' : 'text-green-600'
                    }
                  >
                    Reduces waste
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-blue-500">💧</span>
                  <span
                    className={
                      theme === 'dark' ? 'text-green-300' : 'text-green-600'
                    }
                  >
                    Saves 50L water
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-500">⚡</span>
                  <span
                    className={
                      theme === 'dark' ? 'text-green-300' : 'text-green-600'
                    }
                  >
                    -1.2kg CO₂
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-yellow-500">♻️</span>
                  <span
                    className={
                      theme === 'dark' ? 'text-green-300' : 'text-green-600'
                    }
                  >
                    Circular economy
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-green-600 hover:to-emerald-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>

              <button
                className={`px-6 py-4 rounded-lg border-2 transition-all duration-200 hover:scale-[1.02] ${
                  theme === 'dark'
                    ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                    : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex items-center space-x-6 pt-4 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-2">
                <Shield className="w-4 h-4 text-green-500" />
                <span
                  className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Buyer Protection
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">🚚</span>
                <span
                  className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Fast Shipping
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-green-500">↩️</span>
                <span
                  className={`text-sm ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Easy Returns
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
