import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const TrendingCarousel: React.FC = () => {
  const { state, dispatch } = useApp();
  const { products, theme } = state;
  const scrollRef = useRef<HTMLDivElement>(null);

  const featuredProducts = products.filter((p) => p.isFeatured);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 200;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Auto-scroll functionality
  useEffect(() => {
    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          scroll('right');
        }
      }
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  if (featuredProducts.length === 0) return null;

  return (
    <div
      className={`mb-8 ${
        theme === 'dark' ? 'bg-gray-800/50' : 'bg-white'
      } rounded-2xl p-6 shadow-lg border ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
      }`}
    >
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2
            className={`text-xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            🔥 Trending Now
          </h2>
          <p
            className={`text-sm ${
              theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
            }`}
          >
            Popular eco-friendly finds
          </p>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => scroll('left')}
            className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
              theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll('right')}
            className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
              theme === 'dark'
                ? 'bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-800'
            }`}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="flex space-x-4 overflow-x-auto scrollbar-hide pb-2"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {featuredProducts.map((product) => (
          <div
            key={product.id}
            onClick={() =>
              dispatch({ type: 'SET_SELECTED_PRODUCT', payload: product })
            }
            className="flex-shrink-0 cursor-pointer group"
          >
            <div className="relative">
              {/* Story-style circular image */}
              <div className="w-20 h-20 rounded-full overflow-hidden border-3 border-gradient-to-r from-green-400 to-emerald-600 p-0.5 group-hover:scale-110 transition-transform duration-300">
                <div className="w-full h-full rounded-full overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Floating price badge */}
              <div className="absolute -top-1 -right-1 bg-green-500 text-white text-xs px-2 py-1 rounded-full font-semibold shadow-lg">
                ₹{product.price}
              </div>

              {/* Pulse animation ring */}
              <div className="absolute inset-0 rounded-full border-2 border-green-400 animate-ping opacity-30"></div>
            </div>

            {/* Product title */}
            <div className="mt-2 text-center max-w-20">
              <p
                className={`text-sm font-medium truncate ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                } group-hover:text-green-600 transition-colors duration-200`}
              >
                {product.title}
              </p>
              <p
                className={`text-xs ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                }`}
              >
                {product.category}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
