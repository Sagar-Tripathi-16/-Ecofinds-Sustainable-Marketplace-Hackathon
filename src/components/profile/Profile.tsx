import React, { useState } from 'react';
import {
  User,
  Award,
  Leaf,
  Edit2,
  Star,
  TrendingUp,
  Calendar,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Profile: React.FC = () => {
  const { state, dispatch } = useApp();
  const { currentUser, theme, products } = state;
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    username: currentUser?.username || '',
    email: currentUser?.email || '',
  });

  if (!currentUser) return null;

  const userProducts = products.filter((p) => p.sellerId === currentUser.id);
  const ecoPointsProgress = (currentUser.ecoPoints / 500) * 100; // Max 500 points for progress bar

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_USER',
      payload: {
        username: editForm.username,
        email: editForm.email,
      },
    });
    setIsEditing(false);
  };

  const stats = [
    {
      label: 'Products Listed',
      value: userProducts.length,
      icon: '📦',
      color: 'text-blue-600',
    },
    {
      label: 'Items Sold',
      value: Math.floor(userProducts.length * 0.7),
      icon: '💰',
      color: 'text-green-600',
    },
    {
      label: 'CO₂ Saved',
      value: `${(userProducts.length * 1.2).toFixed(1)}kg`,
      icon: '🌱',
      color: 'text-emerald-600',
    },
    {
      label: 'Reviews',
      value: '4.8⭐',
      icon: '⭐',
      color: 'text-yellow-600',
    },
  ];

  return (
    <div
      className={`min-h-screen pt-20 pb-8 transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-green-50 via-white to-emerald-50'
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div
          className={`mb-8 p-8 rounded-2xl shadow-2xl ${
            theme === 'dark'
              ? 'bg-gray-800 border border-gray-700'
              : 'bg-white border border-gray-200'
          }`}
        >
          <div className="flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative">
              <div className="w-32 h-32 bg-gradient-to-br from-green-400 to-emerald-600 rounded-full flex items-center justify-center shadow-2xl">
                <User className="w-16 h-16 text-white" />
              </div>

              {/* Status indicator */}
              <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white dark:border-gray-800 flex items-center justify-center">
                <Leaf className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* User Info */}
            <div className="flex-1 text-center md:text-left">
              {isEditing ? (
                <div className="space-y-4">
                  <input
                    type="text"
                    value={editForm.username}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        username: e.target.value,
                      }))
                    }
                    className={`text-2xl font-bold bg-transparent border-b-2 border-green-500 focus:outline-none ${
                      theme === 'dark' ? 'text-white' : 'text-gray-900'
                    }`}
                  />
                  <input
                    type="email"
                    value={editForm.email}
                    onChange={(e) =>
                      setEditForm((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className={`block text-lg bg-transparent border-b-2 border-green-500 focus:outline-none ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  />
                  <div className="flex space-x-2">
                    <button
                      onClick={handleSave}
                      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className={`px-4 py-2 rounded-lg transition-colors ${
                        theme === 'dark'
                          ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-center md:justify-start space-x-3 mb-2">
                    <h1
                      className={`text-3xl font-bold ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {currentUser.username}
                    </h1>
                    <button
                      onClick={() => setIsEditing(true)}
                      className={`p-2 rounded-full transition-colors hover:scale-110 ${
                        theme === 'dark'
                          ? 'text-gray-400 hover:text-green-400 hover:bg-gray-700'
                          : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                      }`}
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p
                    className={`text-lg mb-4 ${
                      theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    {currentUser.email}
                  </p>

                  <div className="flex items-center justify-center md:justify-start space-x-4">
                    <div
                      className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
                        theme === 'dark'
                          ? 'bg-green-900/30 text-green-400'
                          : 'bg-green-100 text-green-700'
                      }`}
                    >
                      <Award className="w-4 h-4" />
                      <span className="font-semibold">Eco Champion</span>
                    </div>

                    <div
                      className={`flex items-center space-x-1 px-3 py-1 rounded-full ${
                        theme === 'dark'
                          ? 'bg-blue-900/30 text-blue-400'
                          : 'bg-blue-100 text-blue-700'
                      }`}
                    >
                      <Calendar className="w-4 h-4" />
                      <span className="text-sm">Member since 2024</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Eco Points Section */}
        <div
          className={`mb-8 p-6 rounded-2xl shadow-lg ${
            theme === 'dark'
              ? 'bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-800'
              : 'bg-gradient-to-r from-green-100 to-emerald-100 border border-green-200'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                <Leaf className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2
                  className={`text-xl font-bold ${
                    theme === 'dark' ? 'text-green-400' : 'text-green-700'
                  }`}
                >
                  Eco Points
                </h2>
                <p
                  className={`text-2xl font-bold ${
                    theme === 'dark' ? 'text-green-300' : 'text-green-600'
                  }`}
                >
                  {currentUser.ecoPoints}
                </p>
              </div>
            </div>

            <div className="text-right">
              <p
                className={`text-sm ${
                  theme === 'dark' ? 'text-green-300' : 'text-green-600'
                }`}
              >
                Next Level
              </p>
              <p
                className={`font-semibold ${
                  theme === 'dark' ? 'text-green-400' : 'text-green-700'
                }`}
              >
                {500 - currentUser.ecoPoints} points to go
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div
            className={`w-full rounded-full h-3 ${
              theme === 'dark' ? 'bg-gray-700' : 'bg-gray-200'
            }`}
          >
            <div
              className="h-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full transition-all duration-500"
              style={{ width: `${Math.min(ecoPointsProgress, 100)}%` }}
            />
          </div>

          <div className="flex justify-between mt-2 text-sm">
            <span
              className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
            >
              Eco Enthusiast
            </span>
            <span
              className={theme === 'dark' ? 'text-gray-400' : 'text-gray-600'}
            >
              Eco Champion
            </span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl text-center transition-all duration-200 hover:scale-105 ${
                theme === 'dark'
                  ? 'bg-gray-800 border border-gray-700'
                  : 'bg-white border border-gray-200'
              } shadow-lg`}
            >
              <div className="text-3xl mb-2">{stat.icon}</div>
              <div className={`text-2xl font-bold mb-1 ${stat.color}`}>
                {stat.value}
              </div>
              <div
                className={`text-sm ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Recent Activity */}
        <div
          className={`p-6 rounded-2xl shadow-lg ${
            theme === 'dark'
              ? 'bg-gray-800 border border-gray-700'
              : 'bg-white border border-gray-200'
          }`}
        >
          <h2
            className={`text-xl font-bold mb-6 flex items-center ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            <TrendingUp className="w-5 h-5 mr-2" />
            Recent Activity
          </h2>

          <div className="space-y-4">
            {[
              {
                action: 'Listed a new product',
                item: 'Vintage Camera',
                time: '2 hours ago',
                points: '+10',
              },
              {
                action: 'Sold an item',
                item: 'Organic Cotton Shirt',
                time: '1 day ago',
                points: '+15',
              },
              {
                action: 'Listed a new product',
                item: 'Eco-friendly Mug',
                time: '3 days ago',
                points: '+10',
              },
            ].map((activity, index) => (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg ${
                  theme === 'dark' ? 'bg-gray-700/50' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      activity.action.includes('Sold')
                        ? 'bg-green-500/20 text-green-600'
                        : 'bg-blue-500/20 text-blue-600'
                    }`}
                  >
                    {activity.action.includes('Sold') ? '💰' : '📦'}
                  </div>
                  <div>
                    <p
                      className={`font-medium ${
                        theme === 'dark' ? 'text-white' : 'text-gray-900'
                      }`}
                    >
                      {activity.action}
                    </p>
                    <p
                      className={`text-sm ${
                        theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                      }`}
                    >
                      {activity.item} • {activity.time}
                    </p>
                  </div>
                </div>

                <div className="text-green-600 font-semibold">
                  {activity.points} pts
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
