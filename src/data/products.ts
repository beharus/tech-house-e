import { Product } from '@/context/CartContext';

import smartSpeaker from '@/assets/products/smart-speaker.jpg';
import smartSpeaker1 from '@/assets/products/smart-speaker1.png';
import smartSpeaker2 from '@/assets/products/smart-speaker2.webp';
import smartSpeaker3 from '@/assets/products/smart-speaker3.png';

import robotVacuum from '@/assets/products/robot-vacuum.jpg';
import robotVacuum1 from '@/assets/products/robot-vacuum1.png';
import robotVacuum2 from '@/assets/products/robot-vacuum2.png';
import robotVacuum3 from '@/assets/products/robot-vacuum3.png';

import airPurifier from '@/assets/products/air-purifier.jpg';
import airPurifier2 from '@/assets/products/air-purifier2.avif';
import airPurifier3 from '@/assets/products/air-purifier3.png';
import airPurifier4 from '@/assets/products/air-purifier4.png';

import coffeeMachine from '@/assets/products/coffee-machine.jpg';
import coffeeMachine1 from '@/assets/products/coffee-machine1.avif';
import coffeeMachine2 from '@/assets/products/coffee-machine2.png';
import coffeeMachine3 from '@/assets/products/coffee-machine3.png';

import smartTv from '@/assets/products/smart-tv.jpg';
import smartTv1 from '@/assets/products/smart-tv1.webp';
import smartTv2 from '@/assets/products/smart-tv2.png';
import smartTv3 from '@/assets/products/smart-tv3.png';

import headphones from '@/assets/products/headphones.jpg';
import headphones1 from '@/assets/products/headphones1.jpg';
import headphones2 from '@/assets/products/headphones2.png';
import headphones3 from '@/assets/products/headphones3.png';

import airConditioner from '@/assets/products/air-conditioner.jpg';
import airConditioner2 from '@/assets/products/air-conditioner2.png';
import airConditioner3 from '@/assets/products/air-conditioner3.png';
import airConditioner4 from '@/assets/products/air-conditioner4.png';

import blender from '@/assets/products/blender.jpg';
import blender1 from '@/assets/products/blender1.png';
import blender2 from '@/assets/products/blender2.png';
import blender3 from '@/assets/products/blender3.jpg';

export const products: Product[] = [
  {
    id: '1',
    name: 'Smart Speaker with Voice Assistant',
    price: 849000,
    originalPrice: 999000,
    image: smartSpeaker,
    images: [smartSpeaker, smartSpeaker1, smartSpeaker2, smartSpeaker3],
    category: 'Smart Home',
    description: 'Compact smart speaker with voice control, high-quality sound, and smart home integration.',
    rating: 4.8,
    reviews: 245,
    inStock: true,
    isNew: true,
    discount: 15,
    stockCount: 42,
    features: ['Voice Control', 'WiFi & Bluetooth', 'Smart Home Hub', '360° Sound'],
  },
  {
    id: '2',
    name: 'Robot Vacuum Cleaner Pro',
    price: 2399000,
    originalPrice: 2799000,
    image: robotVacuum,
    images: [robotVacuum, robotVacuum1, robotVacuum2, robotVacuum3],
    category: 'Cleaning',
    description: 'Advanced robot vacuum with laser navigation, automatic emptying, and app control.',
    rating: 4.6,
    reviews: 189,
    inStock: true,
    discount: 14,
    stockCount: 28,
    features: ['Laser Navigation', 'Auto Empty', 'App Control', '150min Runtime'],
  },
  {
    id: '3',
    name: 'Smart Air Purifier',
    price: 1499000,
    image: airPurifier,
    images: [airPurifier, airPurifier2, airPurifier3, airPurifier4],
    category: 'Climate',
    description: 'HEPA air purifier with real-time air quality monitoring and smart controls.',
    rating: 4.7,
    reviews: 156,
    inStock: true,
    isNew: true,
    stockCount: 35,
    features: ['HEPA Filter', 'Air Quality Sensor', 'Quiet Mode', 'App Control'],
  },
  {
    id: '4',
    name: 'Premium Espresso Machine',
    price: 3599000,
    originalPrice: 3999000,
    image: coffeeMachine,
    images: [coffeeMachine, coffeeMachine1, coffeeMachine2, coffeeMachine3],
    category: 'Kitchen',
    description: 'Professional-grade espresso machine with integrated grinder and milk frother.',
    rating: 4.9,
    reviews: 312,
    inStock: true,
    discount: 10,
    stockCount: 18,
    features: ['Built-in Grinder', 'Milk Frother', '15 Bar Pressure', 'Touch Display'],
  },
  {
    id: '5',
    name: 'Smart TV 55" 4K Ultra HD',
    price: 5799000,
    originalPrice: 6499000,
    image: smartTv,
    images: [smartTv, smartTv1, smartTv2, smartTv3],
    category: 'Electronics',
    description: 'Crystal clear 4K display with smart features, HDR support, and gaming mode.',
    rating: 4.5,
    reviews: 428,
    inStock: true,
    discount: 11,
    stockCount: 22,
    features: ['4K HDR', 'Smart TV', 'Gaming Mode', 'Dolby Atmos'],
  },
  {
    id: '6',
    name: 'Wireless Noise Cancelling Headphones',
    price: 1299000,
    originalPrice: 1499000,
    image: headphones,
    images: [headphones, headphones1, headphones2, headphones3],
    category: 'Electronics',
    description: 'Premium over-ear headphones with active noise cancellation and 30hr battery.',
    rating: 4.7,
    reviews: 567,
    inStock: true,
    discount: 13,
    stockCount: 64,
    features: ['Active NC', '30hr Battery', 'Premium Sound', 'Comfortable Fit'],
  },
  {
    id: '7',
    name: 'Inverter Air Conditioner',
    price: 4299000,
    image: airConditioner,
    images: [airConditioner, airConditioner2, airConditioner3, airConditioner4],
    category: 'Climate',
    description: 'Energy-efficient inverter AC with smart temperature control and quiet operation.',
    rating: 4.4,
    reviews: 234,
    inStock: true,
    isNew: true,
    stockCount: 15,
    features: ['Inverter Tech', 'Smart Control', 'Energy Saver', 'Fast Cooling'],
  },
  {
    id: '8',
    name: 'High Power Blender',
    price: 699000,
    originalPrice: 849000,
    image: blender,
    images: [blender, blender1, blender2, blender3],
    category: 'Kitchen',
    description: 'Powerful 1200W blender with glass pitcher and multiple speed settings.',
    rating: 4.3,
    reviews: 189,
    inStock: true,
    discount: 18,
    stockCount: 47,
    features: ['1200W Motor', 'Glass Pitcher', '6 Speed Settings', 'Ice Crush'],
  },
];

export const categories = [
  { id: 'all', name: 'All Products', icon: 'Grid3X3' },
  { id: 'smart-home', name: 'Smart Home', icon: 'Home' },
  { id: 'kitchen', name: 'Kitchen', icon: 'ChefHat' },
  { id: 'cleaning', name: 'Cleaning', icon: 'Sparkles' },
  { id: 'climate', name: 'Climate', icon: 'Thermometer' },
  { id: 'electronics', name: 'Electronics', icon: 'Tv' },
  { id: 'personal-care', name: 'Personal Care', icon: 'Heart' },
];

export const brands = [
  'Samsung', 'LG', 'Xiaomi', 'Dyson', 'Bosch', 'Philips', 'Sony', 'Tefal'
];
