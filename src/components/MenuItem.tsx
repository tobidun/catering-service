'use client';

import Image from 'next/image';
import { Plus } from 'lucide-react';
import { MenuItem as MenuItemType } from '@/types';
import { formatCurrency } from '@/utils/cartUtils';
import { useCart } from '@/context/CartContext';

interface MenuItemProps {
  item: MenuItemType;
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { addItem } = useCart();

  return (
    <div className="group relative bg-white rounded-xl overflow-hidden hover-lift card-shadow transition-all duration-300">
      <div className="relative h-48 overflow-hidden">
        <Image 
          src={item.image} 
          alt={item.name}
          fill
          className="object-cover transform transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-bold text-gray-800 group-hover:text-primary-500 transition-colors duration-300">
            {item.name}
          </h3>
          <span className="font-medium text-primary-500">{formatCurrency(item.price)}</span>
        </div>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">{item.description}</p>
        <button
          onClick={() => addItem(item)}
          className="w-full py-2.5 px-4 bg-primary-500 hover:bg-primary-600 text-white rounded-lg 
                   transform transition-all duration-300 hover:shadow-lg active:scale-95
                   flex items-center justify-center space-x-2 opacity-100"
        >
          <Plus className="h-4 w-4" />
          <span className="font-medium">Add to Order</span>
        </button>
      </div>
    </div>
  );
};

export default MenuItem;