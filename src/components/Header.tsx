'use client';

import { useRouter } from 'next/navigation';
import { GraduationCap, ShoppingCart } from 'lucide-react';
import { useCart } from '@/context/CartContext';

const Header = () => {
  const router = useRouter();
  const { items } = useCart();
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="sticky top-0 z-50 glass-effect">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div 
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => router.push('/')}
          >
            <GraduationCap className="h-8 w-8 text-primary-500" />
            <div>
              <h1 className="text-xl md:text-2xl font-bold text-primary-600">
                University Catering
              </h1>
              <p className="text-sm text-gray-600">Fresh & Delicious</p>
            </div>
          </div>
          
          <button 
            onClick={() => router.push('/cart')}
            className="relative p-3 text-primary-500 hover:text-primary-600 hover:bg-primary-50 
                     rounded-full transition-all duration-300"
            aria-label="View cart"
          >
            <ShoppingCart className="h-6 w-6" />
            {itemCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary-500 text-white text-xs font-bold
                             rounded-full w-5 h-5 flex items-center justify-center animate-bounce-in">
                {itemCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;