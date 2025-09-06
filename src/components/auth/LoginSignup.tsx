import React, { useState } from 'react';
import { Mail, Lock, User, Eye, EyeOff, Leaf } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LoginSignup: React.FC = () => {
  const { state, dispatch } = useApp();
  const { theme } = state;
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    username: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const user = {
      id: '1',
      email: formData.email,
      username: formData.username || formData.email.split('@')[0],
      ecoPoints: isLogin ? 150 : 0
    };

    dispatch({ type: 'LOGIN', payload: user });
    setIsLoading(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className={`min-h-screen transition-all duration-500 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 via-green-900/20 to-gray-900' 
        : 'bg-gradient-to-br from-green-50 via-white to-emerald-50'
    } flex items-center justify-center p-4`}>
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-gradient-to-r from-green-200/20 to-emerald-300/20 rounded-full animate-spin" style={{ animationDuration: '20s' }} />
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-gradient-to-l from-green-300/20 to-emerald-200/20 rounded-full animate-spin" style={{ animationDuration: '25s', animationDirection: 'reverse' }} />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo Section */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="inline-flex items-center space-x-3 mb-4">
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-lg animate-bounce">
                <Leaf className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-yellow-400 rounded-full flex items-center justify-center">
                <span className="text-xs">🌱</span>
              </div>
            </div>
          </div>
          <h1 className={`text-3xl font-bold mb-2 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Welcome to EcoFinds
          </h1>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
          }`}>
            Discover sustainable treasures
          </p>
        </div>

        {/* Form Card */}
        <div className={`backdrop-blur-sm rounded-2xl shadow-2xl border transition-all duration-300 hover:shadow-3xl ${
          theme === 'dark'
            ? 'bg-gray-800/80 border-gray-700'
            : 'bg-white/80 border-white/50'
        } p-8`}>
          {/* Toggle Buttons */}
          <div className={`flex rounded-lg p-1 mb-6 ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
          }`}>
            <button
              onClick={() => setIsLogin(true)}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                isLogin
                  ? 'bg-green-500 text-white shadow-lg'
                  : theme === 'dark'
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`flex-1 py-2 px-4 rounded-md font-medium transition-all duration-200 ${
                !isLogin
                  ? 'bg-green-500 text-white shadow-lg'
                  : theme === 'dark'
                  ? 'text-gray-300 hover:text-white'
                  : 'text-gray-600 hover:text-gray-800'
              }`}
            >
              Sign Up
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Username - Only for signup */}
            {!isLogin && (
              <div className="relative group">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors w-5 h-5" />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  placeholder="Username"
                  className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500'
                  }`}
                  required={!isLogin}
                />
              </div>
            )}

            {/* Email */}
            <div className="relative group">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors w-5 h-5" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Email"
                className={`w-full pl-12 pr-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500'
                }`}
                required
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-focus-within:text-green-500 transition-colors w-5 h-5" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="Password"
                className={`w-full pl-12 pr-12 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500'
                    : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500'
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-500 transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-3 px-4 rounded-lg hover:from-green-600 hover:to-emerald-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white mr-2"></div>
                  {isLogin ? 'Logging in...' : 'Creating account...'}
                </div>
              ) : (
                isLogin ? 'Login' : 'Create Account'
              )}
            </button>
          </form>

          {/* Eco Tip */}
          <div className={`mt-6 p-4 rounded-lg ${
            theme === 'dark' ? 'bg-green-900/20' : 'bg-green-50'
          }`}>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm">💡</span>
              </div>
              <div>
                <h3 className={`font-semibold text-sm ${
                  theme === 'dark' ? 'text-green-400' : 'text-green-700'
                }`}>
                  Eco Tip
                </h3>
                <p className={`text-sm mt-1 ${
                  theme === 'dark' ? 'text-green-300' : 'text-green-600'
                }`}>
                  By choosing second-hand products, you're helping reduce waste and carbon emissions!
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};