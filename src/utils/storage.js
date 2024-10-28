export const saveExpenses = (expenses) => {
  localStorage.setItem('expenses', JSON.stringify(expenses));
};

export const getExpenses = () => {
  const expenses = localStorage.getItem('expenses');
  return expenses ? JSON.parse(expenses) : [];
};

export const saveUserPreferences = (prefs) => {
  localStorage.setItem('userPreferences', JSON.stringify(prefs));
};

export const getUserPreferences = () => {
  const prefs = localStorage.getItem('userPreferences');
  return prefs ? JSON.parse(prefs) : null;
};

export const getMonthlyData = (expenses) => {
  const monthlyMap = new Map();
  
  expenses.forEach(expense => {
    const month = expense.date.substring(0, 7);
    const existing = monthlyMap.get(month) || [];
    monthlyMap.set(month, [...existing, expense]);
  });

  return Array.from(monthlyMap.entries()).map(([month, expenses]) => ({
    month,
    expenses,
    total: expenses.reduce((sum, exp) => sum + exp.amount, 0)
  })).sort((a, b) => b.month.localeCompare(a.month));
};

export const formatCurrency = (amount, currency) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD'
  }).format(amount);
};