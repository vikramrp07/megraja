import React, { useState } from 'react';
import { Plus, X, Tag, AlertCircle } from 'lucide-react';

interface CategoryManagerProps {
  incomeCategories: string[];
  expenseCategories: string[];
  onAddCategory: (type: 'income' | 'expense', category: string) => void;
  onRemoveCategory: (type: 'income' | 'expense', category: string) => void;
}

const CategoryManager: React.FC<CategoryManagerProps> = ({
  incomeCategories,
  expenseCategories,
  onAddCategory,
  onRemoveCategory
}) => {
  const [newExpenseCat, setNewExpenseCat] = useState('');
  const [newIncomeCat, setNewIncomeCat] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleAdd = (type: 'income' | 'expense', value: string, setValue: (s: string) => void) => {
    const trimmed = value.trim();
    if (!trimmed) return;
    
    const currentList = type === 'income' ? incomeCategories : expenseCategories;
    if (currentList.includes(trimmed)) {
      setError(`'${trimmed}' already exists in ${type} categories.`);
      setTimeout(() => setError(null), 3000);
      return;
    }

    onAddCategory(type, trimmed);
    setValue('');
    setError(null);
  };

  const handleKeyDown = (e: React.KeyboardEvent, type: 'income' | 'expense', value: string, setValue: (s: string) => void) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAdd(type, value, setValue);
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Tag className="w-5 h-5 text-blue-600" />
          </div>
          <h2 className="text-lg font-semibold text-slate-800">Manage Categories</h2>
        </div>
        <p className="text-sm text-slate-500 mb-6">
          Customize your income and expense categories. Deleting a category will not remove existing transactions associated with it.
        </p>

        {error && (
          <div className="mb-6 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center gap-2 animate-fade-in">
            <AlertCircle className="w-4 h-4" />
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Expense Categories */}
          <div>
            <h3 className="font-medium text-slate-700 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-rose-500"></span>
              Expense Categories
            </h3>
            
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newExpenseCat}
                onChange={(e) => setNewExpenseCat(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'expense', newExpenseCat, setNewExpenseCat)}
                placeholder="New expense category..."
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rose-500"
              />
              <button
                onClick={() => handleAdd('expense', newExpenseCat, setNewExpenseCat)}
                disabled={!newExpenseCat.trim()}
                className="bg-rose-600 hover:bg-rose-700 disabled:opacity-50 text-white p-2 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
              {expenseCategories.map(cat => (
                <div key={cat} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg group hover:bg-white hover:shadow-sm hover:border-slate-200 border border-transparent transition-all">
                  <span className="text-slate-700 text-sm">{cat}</span>
                  <button
                    onClick={() => onRemoveCategory('expense', cat)}
                    className="text-slate-400 hover:text-rose-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove category"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {expenseCategories.length === 0 && (
                <p className="text-slate-400 text-xs italic text-center py-2">No expense categories</p>
              )}
            </div>
          </div>

          {/* Income Categories */}
          <div>
            <h3 className="font-medium text-slate-700 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              Income Categories
            </h3>
            
            <div className="flex gap-2 mb-4">
              <input
                type="text"
                value={newIncomeCat}
                onChange={(e) => setNewIncomeCat(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e, 'income', newIncomeCat, setNewIncomeCat)}
                placeholder="New income category..."
                className="flex-1 rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
              <button
                onClick={() => handleAdd('income', newIncomeCat, setNewIncomeCat)}
                disabled={!newIncomeCat.trim()}
                className="bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white p-2 rounded-lg transition-colors"
              >
                <Plus className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-2">
              {incomeCategories.map(cat => (
                <div key={cat} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg group hover:bg-white hover:shadow-sm hover:border-slate-200 border border-transparent transition-all">
                  <span className="text-slate-700 text-sm">{cat}</span>
                  <button
                    onClick={() => onRemoveCategory('income', cat)}
                    className="text-slate-400 hover:text-rose-500 p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                    title="Remove category"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
              {incomeCategories.length === 0 && (
                <p className="text-slate-400 text-xs italic text-center py-2">No income categories</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryManager;