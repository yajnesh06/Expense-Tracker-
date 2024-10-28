import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Save, Trash2, Calendar } from 'lucide-react';
import { getUserPreferences, saveUserPreferences } from '../utils/storage';

function Settings() {
  const [preferences, setPreferences] = useState(getUserPreferences() || {});
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleSave = () => {
    saveUserPreferences(preferences);
    // Show success message
    const toast = document.createElement('div');
    toast.className = 'fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg';
    toast.textContent = 'Settings saved successfully!';
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3000);
  };

  const handleReset = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white p-6 rounded-xl shadow-md"
      >
        <h2 className="text-xl font-bold mb-6">User Preferences</h2>
        
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Display Name
            </label>
            <input
              type="text"
              value={preferences.name || ''}
              onChange={(e) => setPreferences({ ...preferences, name: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Currency
            </label>
            <select
              value={preferences.currency || 'USD'}
              onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <option value="JPY">JPY (¥)</option>
              <option value="INR">INR (₹)</option>
            </select>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={handleSave}
              className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <Save className="w-4 h-4" />
              Save Changes
            </button>

            <button
              onClick={() => setShowResetConfirm(true)}
              className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Reset All Data
            </button>
          </div>
        </div>
      </motion.div>

      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-white p-6 rounded-xl shadow-xl max-w-md w-full"
          >
            <h3 className="text-xl font-bold mb-4">Confirm Reset</h3>
            <p className="text-gray-600 mb-6">
              This will delete all your expenses and preferences. This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Reset Everything
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default Settings;