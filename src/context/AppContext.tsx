import React, { createContext, useContext, useReducer, ReactNode } from 'react';
import { Product, User, CartItem, Theme, ViewType } from '../types';
import { SAMPLE_PRODUCTS } from '../utils/constants';

interface AppState {
  currentUser: User | null;
  products: Product[];
  cartItems: CartItem[];
  theme: Theme;
  currentView: ViewType;
  selectedProduct: Product | null;
  isCartOpen: boolean;
  isChatOpen: boolean;
  chatWithUser: string | null;
  searchQuery: string;
  selectedCategory: string;
}

type AppAction =
  | { type: 'LOGIN'; payload: User }
  | { type: 'LOGOUT' }
  | { type: 'TOGGLE_THEME' }
  | { type: 'SET_VIEW'; payload: ViewType }
  | { type: 'SET_SELECTED_PRODUCT'; payload: Product | null }
  | { type: 'ADD_TO_CART'; payload: Product }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'TOGGLE_CART' }
  | { type: 'ADD_PRODUCT'; payload: Product }
  | { type: 'TOGGLE_CHAT'; payload?: string }
  | { type: 'SET_SEARCH'; payload: string }
  | { type: 'SET_CATEGORY'; payload: string }
  | { type: 'UPDATE_USER'; payload: Partial<User> }
  | { type: 'CLEAR_CART' };

const initialState: AppState = {
  currentUser: null,
  products: SAMPLE_PRODUCTS,
  cartItems: [],
  theme: 'light',
  currentView: 'login',
  selectedProduct: null,
  isCartOpen: false,
  isChatOpen: false,
  chatWithUser: null,
  searchQuery: '',
  selectedCategory: '',
};

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
}>({ state: initialState, dispatch: () => null });

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'LOGIN':
      return {
        ...state,
        currentUser: action.payload,
        currentView: 'home',
      };
    case 'LOGOUT':
      return {
        ...state,
        currentUser: null,
        currentView: 'login',
        cartItems: [],
      };
    case 'TOGGLE_THEME':
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light',
      };
    case 'SET_VIEW':
      return {
        ...state,
        currentView: action.payload,
      };
    case 'SET_SELECTED_PRODUCT':
      return {
        ...state,
        selectedProduct: action.payload,
        currentView: action.payload ? 'product-detail' : 'home',
      };
    case 'ADD_TO_CART':
      const existingItem = state.cartItems.find(
        (item) => item.product.id === action.payload.id
      );
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          { product: action.payload, quantity: 1 },
        ],
      };
    case 'REMOVE_FROM_CART':
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.product.id !== action.payload
        ),
      };
    case 'TOGGLE_CART':
      return {
        ...state,
        isCartOpen: !state.isCartOpen,
      };
    case 'ADD_PRODUCT':
      return {
        ...state,
        products: [action.payload, ...state.products],
        currentUser: state.currentUser
          ? {
              ...state.currentUser,
              ecoPoints: state.currentUser.ecoPoints + 10,
            }
          : state.currentUser,
      };
    case 'TOGGLE_CHAT':
      return {
        ...state,
        isChatOpen: !state.isChatOpen,
        chatWithUser: action.payload || null,
      };
    case 'SET_SEARCH':
      return {
        ...state,
        searchQuery: action.payload,
      };
    case 'SET_CATEGORY':
      return {
        ...state,
        selectedCategory: action.payload,
      };
    case 'UPDATE_USER':
      return {
        ...state,
        currentUser: state.currentUser
          ? { ...state.currentUser, ...action.payload }
          : null,
      };
    case 'CLEAR_CART':
      return {
        ...state,
        cartItems: [],
        currentUser: state.currentUser
          ? {
              ...state.currentUser,
              ecoPoints:
                state.currentUser.ecoPoints + state.cartItems.length * 5,
            }
          : state.currentUser,
      };
    default:
      return state;
  }
}

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
