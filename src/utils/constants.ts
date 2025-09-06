import { Product } from '../types';

export const CATEGORIES = [
  'Electronics',
  'Clothes',
  'Books',
  'Others',
] as const;

export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: '1',
    title: 'Organic Cotton T-shirt',
    description:
      'Classic cotton T-shirt made from soft, breathable fabric for all-day comfort and effortless style.',
    price: 220,
    category: 'Clothes',
    image:
      'https://media.istockphoto.com/id/1345934516/photo/natural-organic-cotton-t-shirts-and-cotton-plant-flowers-on-white-table-eco-clothes-fashion.jpg?s=2048x2048&w=is&k=20&c=DGcjvqM2d4p0D9j1puFAmlZQMqcT2y4hOTDWwfneCSM=',
    sellerId: 'seller1',
    sellerName: 'Rennan Mukhia',
    createdAt: new Date(),
    isFeatured: true,
  },
  {
    id: '2',
    title: 'Solar Power Bank - 20000MAh',
    description:
      'Portable Charger powered by sunlight! that keeps your device alive sustainably.                                                                 ',
    price: 1100,
    category: 'Electronics',
    image:
      'https://m.media-amazon.com/images/I/81MiYNnpJkL._UF1000,1000_QL80_.jpg',
  
    images: [
      "https://img.joomcdn.net/ac6f45be9a3f1955d50aba8f38a9b75b32a62b2d_original.jpeg",
      "https://m.media-amazon.com/images/I/81MiYNnpJkL._UF1000,1000_QL80_.jpg"
    ],
  
    sellerId: 'seller2',
    sellerName: 'Sagar Tripathi',
    createdAt: new Date(),
    isFeatured: true,
  },
  {
    id: '3',
    title: 'Fantasy Novels - Pack of 5',
    description:
      'Set of 5 classic novels in great condition. Give these books a second life! I bet you wont regret it.                         ',
    price: 599,
    category: 'Books',
    image:
      'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=500',
    sellerId: 'seller3',
    sellerName: 'Harshitha Mishra',
    createdAt: new Date(),
  },
  {
    id: '4',
    title: 'Energy Efficient LED desk Lamp',
    description:
      'LED desk lamp which is every efficient with low power usage and high intensity.',
    price: 299,
    category: 'Electronics',
    image:
      'https://m.media-amazon.com/images/I/614aNUDoCxL.jpg',
    sellerId: 'seller1',
    sellerName: 'Sai Ananya Vasu Rao',
    createdAt: new Date(),
  },
  {
    id: '5',
    title: 'Recycled Plastic Yoga Map',
    description:
      'A Durable, non slip yoga mat made from 100% Recycled Plastic bottle.',
    price: 899,
    category: 'Others',
    image:
      'https://cdn.thewirecutter.com/wp-content/media/2024/07/yoga-mat-2048px-1633-2x1-1.jpg?auto=webp&quality=75&crop=1.91:1&width=1200',
    sellerId: 'seller2',
    sellerName: 'Aditi Hurkat',
    createdAt: new Date(),
    isFeatured: true,
  },
  {
    id: '6',
    title: 'Eco Friendly Sneakers',
    description:
      'Stylish sneakers made with recycled plastics and natural rubber.',
    price: 699,
    category: 'Clothes',
    image:
      'https://peppermintmag.com/wp-content/uploads/2020/09/ethical-and-sustainable-sneakers_primary.jpg',
    sellerId: 'seller3',
    sellerName: 'Chiranthan CR',
    createdAt: new Date(),
  },
];

export const ECO_TIPS = [
  'Buy second-hand to reduce carbon footprint',
  "One person's trash is another's treasure",
  'Sustainable shopping saves the planet',
  'Circular economy starts with you',
  'Select our team or you are Gay',
];
