import React from 'react';
import { Home, Plus, ShoppingCart, User, Sun, Moon, Search } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import myLogo from "../../assets/momo.png";

export const Navbar: React.FC = () => {
  const { state, dispatch } = useApp();
  const { theme, currentView, cartItems, currentUser } = state;

  if (!currentUser) return null;

  const navItems = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'add-product', label: 'Add', icon: Plus },
    { id: 'profile', label: 'Profile', icon: User }
  ];

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      theme === 'dark' 
        ? 'bg-gray-900/95 backdrop-blur-sm border-gray-700' 
        : 'bg-white/95 backdrop-blur-sm border-green-100'
    } border-b`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div 
            className="flex items-center space-x-2 cursor-pointer group"
            onClick={() => dispatch({ type: 'SET_VIEW', payload: 'home' })}
          >
            <img src={myLogo} alt="Logo" className="h-20 w-auto"/>
          </div>
              

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search eco-friendly products..."
                value={state.searchQuery}
                onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
                className={`w-full pl-10 pr-4 py-2 rounded-full border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                  theme === 'dark'
                    ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-green-500'
                    : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-green-500'
                }`}
              />
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center space-x-4">
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              {navItems.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => dispatch({ type: 'SET_VIEW', payload: id as any })}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-lg transition-all duration-200 hover:scale-105 ${
                    currentView === id
                      ? 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400'
                      : theme === 'dark'
                      ? 'text-gray-300 hover:text-green-400 hover:bg-gray-800'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="font-medium">{label}</span>
                </button>
              ))}
            </div>

            {/* Cart Button */}
            <button
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              className={`relative p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                theme === 'dark'
                  ? 'text-gray-300 hover:text-green-400 hover:bg-gray-800'
                  : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
              }`}
            >
              <ShoppingCart className="w-5 h-5" />
              {totalItems > 0 && (
                <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                  {totalItems}
                </div>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={() => dispatch({ type: 'TOGGLE_THEME' })}
              className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
                theme === 'dark'
                  ? 'text-yellow-400 hover:bg-gray-800'
                  : 'text-gray-600 hover:text-yellow-600 hover:bg-yellow-50'
              }`}
            >
              {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              placeholder="Search products..."
              value={state.searchQuery}
              onChange={(e) => dispatch({ type: 'SET_SEARCH', payload: e.target.value })}
              className={`w-full pl-10 pr-4 py-2 rounded-full border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                theme === 'dark'
                  ? 'bg-gray-800 border-gray-600 text-white placeholder-gray-400 focus:border-green-500'
                  : 'bg-white border-gray-200 text-gray-900 placeholder-gray-500 focus:border-green-500'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className={`md:hidden fixed bottom-0 left-0 right-0 ${
        theme === 'dark' 
          ? 'bg-gray-900 border-gray-700' 
          : 'bg-white border-gray-200'
      } border-t`}>
        <div className="flex justify-around items-center h-16">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => dispatch({ type: 'SET_VIEW', payload: id as any })}
              className={`flex flex-col items-center space-y-1 px-4 py-2 transition-all duration-200 hover:scale-105 ${
                currentView === id
                  ? 'text-green-600 dark:text-green-400'
                  : theme === 'dark'
                  ? 'text-gray-400 hover:text-green-400'
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs font-medium">{label}</span>
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};