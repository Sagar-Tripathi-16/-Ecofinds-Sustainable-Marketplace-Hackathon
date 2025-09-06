import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/common/Navbar';
import { LoginSignup } from './components/auth/LoginSignup';
import { ProductFeed } from './components/home/ProductFeed';
import { AddProduct } from './components/product/AddProduct';
import { ProductDetail } from './components/product/ProductDetail';
import { CartDrawer } from './components/cart/CartDrawer';
import { PurchaseSuccess } from './components/success/PurchaseSuccess';
import { Profile } from './components/profile/Profile';
import { ChatModal } from './components/common/ChatModal';

const AppContent: React.FC = () => {
  const { state } = useApp();
  const { currentView, theme } = state;

  const renderCurrentView = () => {
    switch (currentView) {
      case 'login':
        return <LoginSignup />;
      case 'home':
        return <ProductFeed />;
      case 'add-product':
        return <AddProduct />;
      case 'product-detail':
        return <ProductDetail />;
      case 'profile':
        return <Profile />;
      case 'success':
        return <PurchaseSuccess />;
      default:
        return <ProductFeed />;
    }
  };

  return (
    <div className={`${theme === 'dark' ? 'dark' : ''}`}>
      <div className="min-h-screen transition-colors duration-300">
        <Navbar />
        {renderCurrentView()}
        <CartDrawer />
        <ChatModal />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
};

export default App;
