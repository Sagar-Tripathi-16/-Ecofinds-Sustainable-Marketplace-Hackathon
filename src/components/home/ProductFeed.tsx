import React, { useMemo } from 'react';
import { Filter, Plus } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ProductCard } from './ProductCard';
import { TrendingCarousel } from './TrendingCarousel';
import { CATEGORIES, ECO_TIPS } from '../../utils/constants';

export const ProductFeed: React.FC = () => {
  const { state, dispatch } = useApp();
  const { products, theme, searchQuery, selectedCategory } = state;

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === '' || product.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  const currentTip = ECO_TIPS[Math.floor(Date.now() / 10000) % ECO_TIPS.length];

  return (
    <div
      className={`min-h-screen pt-24 pb-20 md:pb-8 transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-green-50 via-white to-emerald-50'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Eco Tip Banner */}
        <div
          className={`mb-6 p-4 rounded-xl border ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-800'
              : 'bg-gradient-to-r from-green-100 to-emerald-100 border-green-200'
          } animate-fade-in`}
        >
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">💚</span>
            </div>
            <div>
              <p
                className={`font-semibold text-sm ${
                  theme === 'dark' ? 'text-green-400' : 'text-green-700'
                }`}
              >
                Eco Impact
              </p>
              <p
                className={`text-sm ${
                  theme === 'dark' ? 'text-green-300' : 'text-green-600'
                }`}
              >
                {currentTip}
              </p>
            </div>
          </div>
        </div>

        {/* Trending Carousel */}
        <TrendingCarousel />

        {/* Category Filters */}
        <div className="mb-8">
          <div className="flex items-center space-x-4 mb-4">
            <Filter
              className={`w-5 h-5 ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            />
            <h2
              className={`text-lg font-semibold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              Categories
            </h2>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => dispatch({ type: 'SET_CATEGORY', payload: '' })}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105 ${
                selectedCategory === ''
                  ? 'bg-green-500 text-white shadow-lg'
                  : theme === 'dark'
                  ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                  : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
              }`}
            >
              All Categories
            </button>

            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() =>
                  dispatch({ type: 'SET_CATEGORY', payload: category })
                }
                className={`px-4 py-2 rounded-full font-medium transition-all duration-200 hover:scale-105 ${
                  selectedCategory === category
                    ? 'bg-green-500 text-white shadow-lg'
                    : theme === 'dark'
                    ? 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
                    : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 shadow-sm'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2
              className={`text-2xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              {selectedCategory || 'All Products'}
              <span
                className={`ml-2 text-lg font-normal ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                ({filteredProducts.length})
              </span>
            </h2>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          ) : (
            <div
              className={`text-center py-16 ${
                theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
              }`}
            >
              <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-green-400/20 to-emerald-600/20 rounded-full flex items-center justify-center">
                <span className="text-4xl">🔍</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">No products found</h3>
              <p>Try adjusting your search or category filter</p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Add Button */}
      <button
        onClick={() => dispatch({ type: 'SET_VIEW', payload: 'add-product' })}
        className="fixed bottom-20 md:bottom-8 right-6 w-14 h-14 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-110 active:scale-95 transition-all duration-200 z-40 flex items-center justify-center"
      >
        <Plus className="w-6 h-6" />
      </button>
    </div>
  );
};
