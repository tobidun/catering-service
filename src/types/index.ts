export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'main' | 'side' | 'drink' | 'dessert';
  image: string;
}

export interface CartItem extends MenuItem {
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  timestamp: Date;
  status: 'pending' | 'paid' | 'completed';
  paymentMethod?: 'cash' | 'paypal';
  paymentId?: string;
}