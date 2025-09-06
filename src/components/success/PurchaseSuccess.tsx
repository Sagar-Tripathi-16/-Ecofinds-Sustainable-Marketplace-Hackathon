import React, { useEffect } from 'react';
import { CheckCircle, TreePine, Droplets, ArrowRight, Home } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PurchaseSuccess: React.FC = () => {
  const { state, dispatch } = useApp();
  const { theme } = state;

  useEffect(() => {
    // Add confetti effect or celebration animation
    const confettiInterval = setInterval(() => {
      // Create confetti elements
      for (let i = 0; i < 5; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
          position: fixed;
          width: 10px;
          height: 10px;
          background: ${['#22c55e', '#10b981', '#059669', '#fbbf24', '#f59e0b'][i]};
          top: -10px;
          left: ${Math.random() * 100}%;
          z-index: 1000;
          pointer-events: none;
          animation: confetti-fall 3s linear forwards;
        `;
        document.body.appendChild(confetti);
        
        setTimeout(() => {
          confetti.remove();
        }, 3000);
      }
    }, 200);

    // Add CSS for confetti animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes confetti-fall {
        to {
          transform: translateY(100vh) rotate(360deg);
        }
      }
    `;
    document.head.appendChild(style);

    // Cleanup
    setTimeout(() => {
      clearInterval(confettiInterval);
      style.remove();
    }, 5000);

    return () => {
      clearInterval(confettiInterval);
    };
  }, []);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark'
        ? 'bg-gradient-to-br from-gray-900 via-green-900/20 to-gray-900'
        : 'bg-gradient-to-br from-green-50 via-white to-emerald-50'
    } flex items-center justify-center p-4`}>
      
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-green-200/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-emerald-200/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative max-w-2xl mx-auto text-center">
        
        {/* Success Icon */}
        <div className="mb-8 animate-bounce">
          <div className="relative inline-flex">
            <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
              <CheckCircle className="w-16 h-16 text-white" />
            </div>
            
            {/* Pulse rings */}
            <div className="absolute inset-0 w-32 h-32 bg-green-400 rounded-full opacity-20 animate-ping" />
            <div className="absolute inset-0 w-32 h-32 bg-green-400 rounded-full opacity-10 animate-ping" style={{ animationDelay: '0.5s' }} />
          </div>
        </div>

        {/* Success Message */}
        <div className="mb-12">
          <h1 className={`text-5xl font-bold mb-4 animate-fade-in ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            🎉 Purchase Successful!
          </h1>
          
          <p className={`text-xl mb-6 animate-fade-in ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`} style={{ animationDelay: '0.2s' }}>
            Thank you for choosing sustainable shopping!
          </p>
          
          <div className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full ${
            theme === 'dark' ? 'bg-green-900/30 text-green-400' : 'bg-green-100 text-green-700'
          } animate-fade-in`} style={{ animationDelay: '0.4s' }}>
            <span className="text-2xl">🌱</span>
            <span className="font-semibold">Your order is being processed</span>
          </div>
        </div>

        {/* Eco Impact Stats */}
        <div className={`mb-12 p-8 rounded-2xl shadow-2xl ${
          theme === 'dark'
            ? 'bg-gray-800/80 backdrop-blur-sm border border-gray-700'
            : 'bg-white/80 backdrop-blur-sm border border-white/50'
        } animate-fade-in`} style={{ animationDelay: '0.6s' }}>
          
          <h2 className={`text-2xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Your Environmental Impact 🌍
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* CO2 Savings */}
            <div className={`p-6 rounded-xl ${
              theme === 'dark' ? 'bg-gray-700/50' : 'bg-green-50'
            } transform hover:scale-105 transition-transform duration-200`}>
              <div className="flex items-center space-x-4 mb-3">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <TreePine className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    CO₂ Saved
                  </h3>
                  <p className="text-2xl font-bold text-green-600">2.3 kg</p>
                </div>
              </div>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Equivalent to planting 1 tree! 🌳
              </p>
            </div>

            {/* Water Savings */}
            <div className={`p-6 rounded-xl ${
              theme === 'dark' ? 'bg-gray-700/50' : 'bg-blue-50'
            } transform hover:scale-105 transition-transform duration-200`}>
              <div className="flex items-center space-x-4 mb-3">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <Droplets className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className={`font-bold text-lg ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Water Saved
                  </h3>
                  <p className="text-2xl font-bold text-blue-600">127 L</p>
                </div>
              </div>
              <p className={`text-sm ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}>
                2 days of drinking water! 💧
              </p>
            </div>
          </div>

          {/* Eco Points Earned */}
          <div className={`mt-6 p-4 rounded-lg ${
            theme === 'dark' ? 'bg-yellow-900/20' : 'bg-yellow-50'
          }`}>
            <div className="flex items-center justify-center space-x-3">
              <span className="text-2xl">🏆</span>
              <span className={`font-bold ${
                theme === 'dark' ? 'text-yellow-400' : 'text-yellow-700'
              }`}>
                +25 Eco Points Earned!
              </span>
              <span className="text-2xl">🌿</span>
            </div>
          </div>
        </div>

        {/* Call to Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <button
            onClick={() => dispatch({ type: 'SET_VIEW', payload: 'home' })}
            className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold rounded-lg hover:from-green-600 hover:to-emerald-700 transform hover:scale-105 active:scale-95 transition-all duration-200 shadow-lg"
          >
            <Home className="w-5 h-5" />
            <span>Continue Shopping</span>
          </button>
          
          <button
            onClick={() => dispatch({ type: 'SET_VIEW', payload: 'profile' })}
            className={`flex items-center space-x-2 px-8 py-4 font-semibold rounded-lg border-2 transition-all duration-200 hover:scale-105 ${
              theme === 'dark'
                ? 'border-gray-600 text-gray-300 hover:bg-gray-800'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <span>View Profile</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Social Sharing */}
        <div className={`mt-12 p-6 rounded-xl ${
          theme === 'dark' ? 'bg-gray-800/50' : 'bg-gray-100/50'
        } animate-fade-in`} style={{ animationDelay: '1s' }}>
          <p className={`text-sm mb-4 ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Share your eco-friendly purchase!
          </p>
          <div className="flex justify-center space-x-4">
            <button className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
              📘
            </button>
            <button className="w-10 h-10 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors">
              📱
            </button>
            <button className="w-10 h-10 bg-pink-500 text-white rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors">
              📸
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};