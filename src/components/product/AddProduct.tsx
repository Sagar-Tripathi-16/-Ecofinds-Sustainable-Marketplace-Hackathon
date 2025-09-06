import React, { useState } from 'react';
import { Camera, Sparkles, ArrowLeft } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CATEGORIES } from '../../utils/constants';
import { Product } from '../../types';

export const AddProduct: React.FC = () => {
  const { state, dispatch } = useApp();
  const { theme, currentUser } = state;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: 'Electronics' as any,
    price: '',
    image: '',
  });

  const [isGeneratingDescription, setIsGeneratingDescription] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const generateDescription = async () => {
    setIsGeneratingDescription(true);

    // Simulate AI generation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const aiDescriptions = [
      `This ${formData.title.toLowerCase()} is in excellent condition and has been gently used. Perfect for eco-conscious buyers looking for sustainable alternatives. By choosing this pre-owned item, you're contributing to a circular economy and reducing environmental impact.`,
      `A well-maintained ${formData.title.toLowerCase()} that's ready for a new home. This eco-friendly choice helps reduce waste and gives this quality item a second life. Great value for environmentally conscious shoppers.`,
      `This carefully preserved ${formData.title.toLowerCase()} offers both quality and sustainability. Previously owned but well-cared for, it's an excellent choice for those who want to make responsible purchasing decisions while getting great value.`,
    ];

    const randomDescription =
      aiDescriptions[Math.floor(Math.random() * aiDescriptions.length)];

    setFormData((prev) => ({
      ...prev,
      description: randomDescription,
    }));

    setIsGeneratingDescription(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const newProduct: Product = {
      id: Date.now().toString(),
      title: formData.title,
      description: formData.description,
      price: parseFloat(formData.price),
      category: formData.category,
      image:
        formData.image ||
        'https://images.pexels.com/photos/1040945/pexels-photo-1040945.jpeg?auto=compress&cs=tinysrgb&w=500',
      sellerId: currentUser?.id || '1',
      sellerName: currentUser?.username || 'User',
      createdAt: new Date(),
    };

    dispatch({ type: 'ADD_PRODUCT', payload: newProduct });
    dispatch({ type: 'SET_VIEW', payload: 'home' });

    setIsSubmitting(false);
  };

  return (
    <div
      className={`min-h-screen pt-20 pb-8 transition-colors duration-300 ${
        theme === 'dark'
          ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900'
          : 'bg-gradient-to-br from-green-50 via-white to-emerald-50'
      }`}
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center space-x-4 mb-8">
          <button
            onClick={() => dispatch({ type: 'SET_VIEW', payload: 'home' })}
            className={`p-2 rounded-full transition-all duration-200 hover:scale-110 ${
              theme === 'dark'
                ? 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                : 'bg-white text-gray-600 hover:bg-gray-50'
            } shadow-lg`}
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          <div>
            <h1
              className={`text-3xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              Add New Product
            </h1>
            <p
              className={`text-lg ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Share your eco-friendly treasures
            </p>
          </div>
        </div>

        {/* Form Card */}
        <div
          className={`rounded-2xl shadow-2xl border overflow-hidden ${
            theme === 'dark'
              ? 'bg-gray-800 border-gray-700'
              : 'bg-white border-gray-200'
          }`}
        >
          {/* Form Header */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-2xl">🌱</span>
              </div>
              <div className="text-white">
                <h2 className="text-xl font-bold">List Your Item</h2>
                <p className="text-green-100">
                  Earn eco points for every listing!
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Title */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Product Title *
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="e.g., Vintage Leather Jacket, MacBook Air 2019"
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500'
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500'
                }`}
                required
              />
            </div>

            {/* Category and Price */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white focus:border-green-500'
                      : 'bg-gray-50 border-gray-300 text-gray-900 focus:border-green-500'
                  }`}
                  required
                >
                  {CATEGORIES.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  className={`block text-sm font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Price (₹) *
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  min="0"
                  step="0.01"
                  className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 ${
                    theme === 'dark'
                      ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500'
                      : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500'
                  }`}
                  required
                />
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label
                className={`block text-sm font-medium mb-2 ${
                  theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Product Image
              </label>
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors duration-200 ${
                  theme === 'dark'
                    ? 'border-gray-600 hover:border-green-500 bg-gray-700/50'
                    : 'border-gray-300 hover:border-green-500 bg-gray-50'
                }`}
              >
                <Camera
                  className={`w-12 h-12 mx-auto mb-4 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                />
                <p
                  className={`text-lg font-medium mb-2 ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Upload Product Photo
                </p>
                <p
                  className={`text-sm ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`}
                >
                  Click to browse or drag and drop
                </p>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  placeholder="Or paste image URL here"
                  className={`w-full mt-4 px-3 py-2 rounded border transition-all duration-200 ${
                    theme === 'dark'
                      ? 'bg-gray-600 border-gray-500 text-white placeholder-gray-400'
                      : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500'
                  }`}
                />
              </div>
            </div>

            {/* Description */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label
                  className={`text-sm font-medium ${
                    theme === 'dark' ? 'text-gray-300' : 'text-gray-700'
                  }`}
                >
                  Description *
                </label>
                <button
                  type="button"
                  onClick={generateDescription}
                  disabled={isGeneratingDescription || !formData.title}
                  className="flex items-center space-x-2 px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-purple-500 to-pink-600 text-white hover:from-purple-600 hover:to-pink-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isGeneratingDescription ? (
                    <div className="animate-spin rounded-full h-3 w-3 border border-white/30 border-t-white"></div>
                  ) : (
                    <Sparkles className="w-3 h-3" />
                  )}
                  <span>
                    {isGeneratingDescription ? 'Generating...' : 'AI Generate'}
                  </span>
                </button>
              </div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Describe your product's condition, features, and why it's eco-friendly..."
                rows={4}
                className={`w-full px-4 py-3 rounded-lg border-2 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-500/50 resize-none ${
                  theme === 'dark'
                    ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-green-500'
                    : 'bg-gray-50 border-gray-300 text-gray-900 placeholder-gray-500 focus:border-green-500'
                }`}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-green-600 hover:to-emerald-700 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white mr-3"></div>
                  Adding Product...
                </div>
              ) : (
                'Add Product & Earn 10 Eco Points!'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
