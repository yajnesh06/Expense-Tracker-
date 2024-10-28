import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { Calendar } from 'lucide-react';
import { getExpenses, getMonthlyData, formatCurrency } from '../utils/storage';
import PieChart from '../components/Charts/PieChart';

function History() {
  const [monthlyData, setMonthlyData] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState('');
  const userPreferences = JSON.parse(localStorage.getItem('userPreferences') || '{}');

  useEffect(() => {
    const expenses = getExpenses();
    const data = getMonthlyData(expenses);
    setMonthlyData(data);
    if (data.length > 0) {
      setSelectedMonth(data[0].month);
    }
  }, []);

  const currentMonthData = monthlyData.find(data => data.month === selectedMonth);
  
  const categoryTotals = currentMonthData?.expenses.reduce((acc, exp) => {
    acc[exp.category] = (acc[exp.category] || 0) + exp.amount;
    return acc;
  }, {}) || {};

  const pieChartData = {
    labels: Object.keys(categoryTotals),
    datasets: [{
      data: Object.values(categoryTotals),
      backgroundColor: [
        '#4F46E5', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'
      ]
    }]
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-6">
          <Calendar className="w-5 h-5 text-indigo-600" />
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="w-full sm:w-auto px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
          >
            {monthlyData.map(data => (
              <option key={data.month} value={data.month}>
                {format(new Date(data.month), 'MMMM yyyy')}
              </option>
            ))}
          </select>
        </div>

        {currentMonthData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Monthly Overview</h2>
              <div className="h-[300px]">
                <PieChart data={pieChartData} />
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold mb-4">Category Breakdown</h2>
              <div className="space-y-3">
                {Object.entries(categoryTotals).map(([category, amount]) => (
                  <div key={category} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                    <span className="font-medium">{category}</span>
                    <span className="font-bold">
                      {formatCurrency(amount, userPreferences.currency)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-indigo-50 rounded-lg">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-indigo-900">Total Expenses</span>
                  <span className="font-bold text-indigo-900">
                    {formatCurrency(
                      Object.values(categoryTotals).reduce((a, b) => a + b, 0),
                      userPreferences.currency
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default History;