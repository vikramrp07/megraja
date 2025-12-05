import React, { useState, useEffect } from 'react';
import { PlusCircle, MinusCircle } from 'lucide-react';
import { Transaction, TransactionType } from '../types';

interface TransactionFormProps {
  onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  expenseCategories: string[];
  incomeCategories: string[];
}

const TransactionForm: React.FC<TransactionFormProps> = ({ 
  onAddTransaction, 
  expenseCategories, 
  incomeCategories 
}) => {
  const [type, setType] = useState<TransactionType>('expense');
  const [amount, setAmount] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [description, setDescription] = useState<string>('');

  // Update selected category when type changes or categories list updates
  useEffect(() => {
    const currentCategories = type === 'expense' ? expenseCategories : incomeCategories;
    
    // If current category is not in the list (or empty), select the first one
    if (!category || !currentCategories.includes(category)) {
      if (currentCategories.length > 0) {
        setCategory(currentCategories[0]);
      } else {
        setCategory('');
      }
    }
  }, [type, expenseCategories, incomeCategories, category]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || isNaN(Number(amount))) return;
    if (!category) return;

    onAddTransaction({
      type,
      amount: Number(amount),
      category,
      date,
      description
    });

    // Reset form
    setAmount('');
    setDescription('');
    // Keep date, type, and category for convenience
  };

  const handleTypeChange = (newType: TransactionType) => {
    setType(newType);
    // Category will be updated by useEffect
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
      <h2 className="text-lg font-semibold text-slate-800 mb-4">Add Transaction</h2>
      
      {/* Type Toggle */}
      <div className="flex space-x-4 mb-6">
        <button
          type="button"
          onClick={() => handleTypeChange('income')}
          className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
            type === 'income' 
              ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' 
              : 'bg-slate-50 text-slate-500 border border-transparent hover:bg-slate-100'
          }`}
        >
          <PlusCircle className="w-4 h-4" /> Income
        </button>
        <button
          type="button"
          onClick={() => handleTypeChange('expense')}
          className={`flex-1 py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors ${
            type === 'expense' 
              ? 'bg-rose-100 text-rose-700 border border-rose-200' 
              : 'bg-slate-50 text-slate-500 border border-transparent hover:bg-slate-100'
          }`}
        >
          <MinusCircle className="w-4 h-4" /> Expense
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Amount ($)</label>
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="0.00"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
            required
          >
            {(type === 'expense' ? expenseCategories : incomeCategories).map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
            {(type === 'expense' ? expenseCategories : incomeCategories).length === 0 && (
              <option value="" disabled>No categories available</option>
            )}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">Description (Optional)</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., Grocery shopping, Monthly rent"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors focus:ring-4 focus:ring-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!category}
        >
          Add {type === 'income' ? 'Income' : 'Expense'}
        </button>
      </form>
    </div>
  );
};

export default TransactionForm;