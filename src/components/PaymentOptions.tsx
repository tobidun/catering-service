import React, { useState } from 'react';
import { ArrowLeft, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatCurrency } from '../utils/cartUtils';
import PaypalButton from './PaypalButton';

interface PaymentOptionsProps {
  total: number;
  onBack: () => void;
  onComplete: () => void;
}

const PaymentOptions: React.FC<PaymentOptionsProps> = ({ 
  total, 
  onBack,
  onComplete
}) => {
  const { clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<'cash' | 'paypal' | null>(null);
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleCashPayment = () => {
    setPaymentMethod('cash');
    setOrderId(`ORD-${Math.floor(100000 + Math.random() * 900000)}`);
    setPaymentComplete(true);
    clearCart();
  };

  const handlePaypalSuccess = (details: any) => {
    setPaymentMethod('paypal');
    setOrderId(details.id || `ORD-${Math.floor(100000 + Math.random() * 900000)}`);
    setPaymentComplete(true);
    clearCart();
  };

  if (paymentComplete) {
    return (
      <div className="p-6 flex flex-col items-center justify-center h-full">
        <div className="bg-green-100 rounded-full p-4 mb-4">
          <Check className="h-12 w-12 text-green-600" />
        </div>
        <h3 className="text-2xl font-semibold text-center mb-2">Payment Successful!</h3>
        <p className="text-gray-600 text-center mb-6">
          {paymentMethod === 'cash' 
            ? 'Please pay at the counter when you pick up your order.' 
            : 'Your PayPal payment has been processed successfully.'}
        </p>
        <div className="bg-gray-100 rounded-lg p-4 w-full mb-6">
          <p className="text-sm text-gray-600">Order ID:</p>
          <p className="font-semibold">{orderId}</p>
        </div>
        <button
          onClick={onComplete}
          className="w-full py-3 bg-blue-800 hover:bg-blue-900 text-white rounded-md transition-colors"
        >
          Done
        </button>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="p-1 mr-2 hover:bg-gray-200 rounded-full transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h3 className="text-xl font-semibold">Payment Options</h3>
      </div>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg">
        <div className="text-sm text-gray-600 mb-1">Total Amount:</div>
        <div className="text-2xl font-bold text-blue-800">{formatCurrency(total)}</div>
      </div>

      <div className="space-y-4">
        <button
          onClick={handleCashPayment}
          className="w-full p-4 border-2 border-blue-800 rounded-lg text-blue-800 hover:bg-blue-50 transition-colors flex justify-between items-center"
        >
          <div>
            <div className="font-semibold">Pay at Counter</div>
            <div className="text-sm text-gray-600">Pay when you pick up your order</div>
          </div>
          <span className="text-xl">💵</span>
        </button>

        <div className="relative">
          <div className="text-center mb-2 font-semibold">- OR -</div>
          <div className="w-full p-4 border-2 border-amber-500 rounded-lg">
            <div className="font-semibold text-amber-700 mb-2">Pay Online with PayPal</div>
            <PaypalButton 
              amount={total} 
              onSuccess={handlePaypalSuccess} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentOptions;