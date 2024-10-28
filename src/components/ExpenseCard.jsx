import React from 'react';
import { motion } from 'framer-motion';
import { formatCurrency } from '../utils/storage';
import { Trash2 } from 'lucide-react';

function ExpenseCard({ expense, currency, onDelete }) {
  const categoryColors = {
    Food: 'bg-green-100 text-green-800',
    Transport: 'bg-blue-100 text-blue-800',
    Entertainment: 'bg-purple-100 text-purple-800',
    Shopping: 'bg-pink-100 text-pink-800',
    Bills: 'bg-red-100 text-red-800',
    Other: 'bg-gray-100 text-gray-800'
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white p-4 rounded-lg shadow-md"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800 break-words">{expense.description}</h3>
          <span className={`inline-block px-2 py-1 rounded-full text-sm mt-2 ${categoryColors[expense.category]}`}>
            {expense.category}
          </span>
        </div>
        <div className="flex flex-row sm:flex-col items-start sm:items-end justify-between sm:justify-start gap-2">
          <p className="text-lg font-bold text-gray-900 order-1 sm:order-none">
            {formatCurrency(expense.amount, currency)}
          </p>
          <p className="text-sm text-gray-500">
            {new Date(expense.date).toLocaleDateString()}
          </p>
        </div>
      </div>
      <button
        onClick={() => onDelete(expense.id)}
        className="mt-3 flex items-center gap-1 text-red-600 hover:text-red-800 transition-colors"
      >
        <Trash2 className="w-4 h-4" />
        <span>Delete</span>
      </button>
    </motion.div>
  );
}

export default ExpenseCard;