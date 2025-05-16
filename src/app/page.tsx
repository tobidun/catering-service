import MenuList from '@/components/MenuList';
import Header from '@/components/Header';
import { menuItems } from '@/data/menuItems';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto pb-20">
        <MenuList items={menuItems} />
      </main>
    </div>
  );
}