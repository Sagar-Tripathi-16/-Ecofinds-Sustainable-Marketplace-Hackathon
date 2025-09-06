import React from 'react';
import { X, Plus, Minus, ShoppingBag, CreditCard } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const CartDrawer: React.FC = () => {
  const { state, dispatch } = useApp();
  const { isCartOpen, cartItems, theme } = state;

  const total = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    dispatch({ type: 'CLEAR_CART' });
    dispatch({ type: 'TOGGLE_CART' });
    dispatch({ type: 'SET_VIEW', payload: 'success' });
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
        onClick={() => dispatch({ type: 'TOGGLE_CART' })}
      />

      {/* Drawer */}
      <div
        className={`fixed right-0 top-0 h-full w-full max-w-md z-50 transform transition-transform duration-300 ${
          theme === 'dark'
            ? 'bg-gray-900 border-gray-700'
            : 'bg-white border-gray-200'
        } border-l shadow-2xl`}
      >
        {/* Header */}
        <div
          className={`p-6 border-b ${
            theme === 'dark' ? 'border-gray-700' : 'border-gray-200'
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2
                  className={`text-xl font-bold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  Shopping Cart
                </h2>
                <p
                  className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                  }`}
                >
                  {itemCount} {itemCount === 1 ? 'item' : 'items'}
                </p>
              </div>
            </div>
            <button
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              className={`p-2 rounded-full transition-colors duration-200 ${
                theme === 'dark'
                  ? 'text-gray-400 hover:text-white hover:bg-gray-800'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {cartItems.length > 0 ? (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.product.id}
                  className={`p-4 rounded-lg border transition-all duration-200 hover:shadow-md ${
                    theme === 'dark'
                      ? 'bg-gray-800 border-gray-700 hover:bg-gray-750'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex space-x-4">
                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.product.image}
                        alt={item.product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3
                        className={`font-semibold line-clamp-2 ${
                          theme === 'dark' ? 'text-white' : 'text-gray-900'
                        }`}
                      >
                        {item.product.title}
                      </h3>
                      <p
                        className={`text-sm mt-1 ${
                          theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                        }`}
                      >
                        {item.product.category}
                      </p>

                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => {
                              if (item.quantity === 1) {
                                dispatch({
                                  type: 'REMOVE_FROM_CART',
                                  payload: item.product.id,
                                });
                              } else {
                                // In a real app, we'd have a decrease quantity action
                                dispatch({
                                  type: 'REMOVE_FROM_CART',
                                  payload: item.product.id,
                                });
                                if (item.quantity > 1) {
                                  for (let i = 0; i < item.quantity - 1; i++) {
                                    dispatch({
                                      type: 'ADD_TO_CART',
                                      payload: item.product,
                                    });
                                  }
                                }
                              }
                            }}
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                              theme === 'dark'
                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                            }`}
                          >
                            <Minus className="w-3 h-3" />
                          </button>

                          <span
                            className={`font-semibold ${
                              theme === 'dark' ? 'text-white' : 'text-gray-900'
                            }`}
                          >
                            {item.quantity}
                          </span>

                          <button
                            onClick={() =>
                              dispatch({
                                type: 'ADD_TO_CART',
                                payload: item.product,
                              })
                            }
                            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors duration-200 ${
                              theme === 'dark'
                                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                                : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                            }`}
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-bold text-green-600">
                            ₹{(item.product.price * item.quantity).toFixed(2)}
                          </p>
                          <button
                            onClick={() =>
                              dispatch({
                                type: 'REMOVE_FROM_CART',
                                payload: item.product.id,
                              })
                            }
                            className={`text-xs transition-colors duration-200 ${
                              theme === 'dark'
                                ? 'text-red-400 hover:text-red-300'
                                : 'text-red-600 hover:text-red-700'
                            }`}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-200 rounded-full flex items-center justify-center">
                <ShoppingBag className="w-12 h-12 text-gray-400" />
              </div>
              <h3
                className={`text-xl font-semibold mb-2 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Your cart is empty
              </h3>
              <p
                className={`${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                Add some eco-friendly products!
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div
            className={`p-6 border-t ${
              theme === 'dark'
                ? 'border-gray-700 bg-gray-800'
                : 'border-gray-200 bg-gray-50'
            }`}
          >
            {/* Eco Impact */}
            <div
              className={`mb-4 p-3 rounded-lg ${
                theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'
              }`}
            >
              <div className="flex items-center justify-between text-sm">
                <span
                  className={
                    theme === 'dark' ? 'text-green-400' : 'text-green-700'
                  }
                >
                  🌱 Eco Impact
                </span>
                <span
                  className={
                    theme === 'dark' ? 'text-green-300' : 'text-green-600'
                  }
                >
                  -{itemCount * 0.5}kg CO₂ saved!
                </span>
              </div>
            </div>

            {/* Total */}
            <div className="flex items-center justify-between mb-4">
              <span
                className={`text-lg font-semibold ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                Total:
              </span>
              <span className="text-2xl font-bold text-green-600">
                ₹{total.toFixed(2)}
              </span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-green-600 hover:to-emerald-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 shadow-lg flex items-center justify-center space-x-2"
            >
              <CreditCard className="w-5 h-5" />
              <span>Checkout</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};
