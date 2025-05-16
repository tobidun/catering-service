'use client';

import { MenuItem as MenuItemType } from '@/types';
import MenuItem from './MenuItem';

interface MenuListProps {
  items: MenuItemType[];
}

const MenuList: React.FC<MenuListProps> = ({ items }) => {
  const categories = ['main', 'side', 'drink', 'dessert'];
  const itemsByCategory = categories.map(category => ({
    category,
    items: items.filter(item => item.category === category)
  })).filter(group => group.items.length > 0);

  const formatCategoryName = (category: string): string => {
    return category.charAt(0).toUpperCase() + category.slice(1) + 's';
  };

  return (
    <div className="py-8 px-4 animate-fade-in">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-primary-700 mb-4">Today's Menu</h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Explore our delicious selection of freshly prepared meals, snacks, and beverages
        </p>
      </div>
      
      {itemsByCategory.map((group, categoryIndex) => (
        <div key={group.category} className="mb-12 animate-scale-in" style={{
          animationDelay: `${categoryIndex * 0.1}s`
        }}>
          <h3 className="text-2xl font-bold mb-6 text-primary-600 flex items-center">
            <span className="relative">
              {formatCategoryName(group.category)}
              <span className="absolute bottom-0 left-0 w-full h-1 bg-primary-300 rounded-full transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
            </span>
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {group.items.map((item, itemIndex) => (
              <div key={item.id} className="animate-scale-in" style={{
                animationDelay: `${(categoryIndex * 0.1) + (itemIndex * 0.1)}s`
              }}>
                <MenuItem item={item} />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuList;