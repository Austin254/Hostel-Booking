import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CreditCard, Loader } from 'lucide-react';

interface PaymentFormProps {
  amount: number;
  onSubmit: (details: any) => void;
  loading: boolean;
}

export default function PaymentForm({ amount, onSubmit, loading }: PaymentFormProps) {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ phoneNumber });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="border-t pt-6"
    >
      <h2 className="text-xl font-semibold mb-4">Payment Details</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            M-Pesa Phone Number
          </label>
          <input
            type="tel"
            placeholder="254700000000"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex justify-between items-center">
            <span className="font-medium">Total Amount:</span>
            <span className="text-xl font-bold text-blue-900">
              KSH {amount.toLocaleString()}
            </span>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition flex items-center justify-center space-x-2"
        >
          {loading ? (
            <Loader className="h-5 w-5 animate-spin" />
          ) : (
            <CreditCard className="h-5 w-5" />
          )}
          <span>Pay with M-Pesa</span>
        </button>
      </form>
    </motion.div>
  );
}