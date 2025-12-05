import React from 'react';
import { TrendingUp, TrendingDown, Wallet } from 'lucide-react';

interface SummaryCardsProps {
  income: number;
  expenses: number;
}

const SummaryCards: React.FC<SummaryCardsProps> = ({ income, expenses }) => {
  const balance = income - expenses;
  const savingsRate = income > 0 ? ((balance / income) * 100).toFixed(1) : '0';

  // Use Intl.NumberFormat for robust currency formatting
  // Standardizing on en-US/USD for now, but this approach allows easy localization updates later.
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {/* Income Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Total Income</p>
          <h3 className="text-2xl font-bold text-emerald-600">{formatCurrency(income)}</h3>
        </div>
        <div className="bg-emerald-100 p-3 rounded-full">
          <TrendingUp className="w-6 h-6 text-emerald-600" />
        </div>
      </div>

      {/* Expenses Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Total Expenses</p>
          <h3 className="text-2xl font-bold text-rose-600">{formatCurrency(expenses)}</h3>
        </div>
        <div className="bg-rose-100 p-3 rounded-full">
          <TrendingDown className="w-6 h-6 text-rose-600" />
        </div>
      </div>

      {/* Balance Card */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-slate-100 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500 mb-1">Net Savings</p>
          <h3 className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-red-500'}`}>
            {formatCurrency(balance)}
          </h3>
          <p className="text-xs text-slate-400 mt-1">{savingsRate}% savings rate</p>
        </div>
        <div className={`p-3 rounded-full ${balance >= 0 ? 'bg-blue-100' : 'bg-red-100'}`}>
          <Wallet className={`w-6 h-6 ${balance >= 0 ? 'text-blue-600' : 'text-red-500'}`} />
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;