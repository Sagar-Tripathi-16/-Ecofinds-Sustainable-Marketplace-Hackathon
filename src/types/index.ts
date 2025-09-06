export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  category: ProductCategory;
  image: string;
  images?:string[];
  sellerId: string;
  sellerName: string;
  createdAt: Date;
  isFeatured?: boolean;
}

export type ProductCategory = 'Electronics' | 'Clothes' | 'Books' | 'Others';

export interface User {
  id: string;
  email: string;
  username: string;
  ecoPoints: number;
  avatar?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
}

export type Theme = 'light' | 'dark';

export type ViewType =
  | 'login'
  | 'home'
  | 'add-product'
  | 'product-detail'
  | 'profile'
  | 'success';
