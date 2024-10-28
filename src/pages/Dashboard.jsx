import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { PlusCircle, Wallet, TrendingUp, Clock } from 'lucide-react';
import { getExpenses, saveExpenses, formatCurrency } from '../utils/storage';
import ExpenseCard from '../components/ExpenseCard';
import LineChart from '../components/Charts/LineChart';
import PieChart from '../components/Charts/PieChart';

function Dashboard() {
  const [expenses, setExpenses] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newExpense, setNewExpense] = useState({
    amount: '',
    category: '',
    description: '',
    date: new Date().toISOString().split('T')[0]
  });
  const userPreferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');

  useEffect(() => {
    setExpenses(getExpenses());
  }, []);

  const handleAddExpense = (e) => {
    e.preventDefault();
    const expense = {
      ...newExpense,
      id: Date.now().toString(),
      amount: parseFloat(newExpense.amount)
    };
    const updatedExpenses = [...expenses, expense];
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
    setShowAddModal(false);
    setNewExpense({
      amount: '',
      category: '',
      description: '',
      date: new Date().toISOString().split('T')[0]
    });
  };

  const handleDeleteExpense = (id) => {
    const updatedExpenses = expenses.filter(exp => exp.id !== id);
    setExpenses(updatedExpenses);
    saveExpenses(updatedExpenses);
  };

  const currentMonth = new Date().toISOString().slice(0, 7);
  const currentMonthExpenses = expenses.filter(exp => exp.date.startsWith(currentMonth));
  
  const categoryTotals = currentMonthExpenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {});

  const pieChartData = {
    labels: Object.keys(categoryTotals),
    datasets: [{
      data: Object.values(categoryTotals),
      backgroundColor: [
        '#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'
      ]
    }]
  };

  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - i);
    return date.toISOString().split('T')[0];
  }).reverse();

  const lineChartData = {
    labels: last7Days.map(date => new Date(date).toLocaleDateString()),
    datasets: [{
      label: 'Daily Expenses',
      data: last7Days.map(date => 
        expenses
          .filter(exp => exp.date === date)
          .reduce((sum, exp) => sum + exp.amount, 0)
      ),
      borderColor: 'rgb(99, 102, 241)',
      tension: 0.4
    }]
  };

  const totalExpenses = expenses.reduce((sum, exp) => sum + exp.amount, 0);
  const averageExpense = expenses.length ? totalExpenses / expenses.length : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-4 sm:p-6 rounded-xl shadow-md"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500">Total Expenses</h3>
            <Wallet className="text-indigo-600 w-6 h-6" />
          </div>
          <p className="text-xl sm:text-2xl font-bold mt-2">
            {formatCurrency(totalExpenses, userPreferences.currency)}
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-4 sm:p-6 rounded-xl shadow-md"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500">Average Expense</h3>
            <TrendingUp className="text-green-600 w-6 h-6" />
          </div>
          <p className="text-xl sm:text-2xl font-bold mt-2">
            {formatCurrency(averageExpense, userPreferences.currency)}
          </p>
        </motion.div>

        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-4 sm:p-6 rounded-xl shadow-md"
        >
          <div className="flex items-center justify-between">
            <h3 className="text-gray-500">This Month</h3>
            <Clock className="text-blue-600 w-6 h-6" />
          </div>
          <p className="text-xl sm:text-2xl font-bold mt-2">
            {formatCurrency(
              currentMonthExpenses.reduce((sum, exp) => sum + exp.amount, 0),
              userPreferences.currency
            )}
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <h2 className="text-xl font-bold">Expense Trend</h2>
            <button
              onClick={() => setShowAddModal(true)}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <PlusCircle className="w-5 h-5" />
              Add Expense
            </button>
          </div>
          <div className="h-[300px]">
            <LineChart data={lineChartData} />
          </div>
        </div>

        <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
          <h2 className="text-xl font-bold mb-6">Category Distribution</h2>
          <div className="h-[300px]">
            <PieChart data={pieChartData} />
          </div>
        </div>
      </div>

      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
        <h2 className="text-xl font-bold mb-6">Recent Expenses</h2>
        <div className="space-y-4">
          {currentMonthExpenses.slice(-5).map(expense => (
            <ExpenseCard
              key={expense.id}
              expense={expense}
              currency={userPreferences.currency}
              onDelete={handleDeleteExpense}
            />
          ))}
        </div>
      </div>

      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-xl font-bold mb-4">Add New Expense</h2>
            <form onSubmit={handleAddExpense} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Amount
                </label>
                <input
                  type="number"
                  required
                  step="0.01"
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Category
                </label>
                <select
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                >
                  <option value="">Select category</option>
                  <option value="Food">Food</option>
                  <option value="Transport">Transport</option>
                  <option value="Entertainment">Entertainment</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Bills">Bills</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <input
                  type="text"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  required
                  className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                />
              </div>
              <div className="flex flex-col sm:flex-row justify-end space-y-2 sm:space-y-0 sm:space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                >
                  Add Expense
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;