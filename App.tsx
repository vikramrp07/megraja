import React, { useState, useEffect } from 'react';
import { LayoutDashboard, PieChart, BrainCircuit, Settings } from 'lucide-react';
import SummaryCards from './components/SummaryCards';
import TransactionForm from './components/TransactionForm';
import Charts from './components/Charts';
import TransactionList from './components/TransactionList';
import Advisor from './components/Advisor';
import CategoryManager from './components/CategoryManager';
import DataExport from './components/DataExport';
import { Transaction, DEFAULT_EXPENSE_CATEGORIES, DEFAULT_INCOME_CATEGORIES } from './types';

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [expenseCategories, setExpenseCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('expenseCategories');
    return saved ? JSON.parse(saved) : DEFAULT_EXPENSE_CATEGORIES;
  });

  const [incomeCategories, setIncomeCategories] = useState<string[]>(() => {
    const saved = localStorage.getItem('incomeCategories');
    return saved ? JSON.parse(saved) : DEFAULT_INCOME_CATEGORIES;
  });
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'analytics' | 'advisor' | 'settings'>('dashboard');

  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions));
  }, [transactions]);

  useEffect(() => {
    localStorage.setItem('expenseCategories', JSON.stringify(expenseCategories));
  }, [expenseCategories]);

  useEffect(() => {
    localStorage.setItem('incomeCategories', JSON.stringify(incomeCategories));
  }, [incomeCategories]);

  const addTransaction = (newTransaction: Omit<Transaction, 'id'>) => {
    const transaction: Transaction = {
      ...newTransaction,
      id: crypto.randomUUID(),
    };
    setTransactions(prev => [...prev, transaction]);
  };

  const deleteTransaction = (id: string) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const handleAddCategory = (type: 'income' | 'expense', category: string) => {
    if (type === 'income') {
      setIncomeCategories(prev => [...prev, category]);
    } else {
      setExpenseCategories(prev => [...prev, category]);
    }
  };

  const handleRemoveCategory = (type: 'income' | 'expense', category: string) => {
    if (type === 'income') {
      setIncomeCategories(prev => prev.filter(c => c !== category));
    } else {
      setExpenseCategories(prev => prev.filter(c => c !== category));
    }
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <div className="min-h-screen bg-slate-50 pb-20 md:pb-10">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <span className="text-xl font-bold tracking-tight text-slate-900">MEGRAJA</span>
            </div>
            <div className="text-sm text-slate-500 hidden sm:block">
              {new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </div>
            
            {/* Desktop Settings Link (Alternative placement) */}
             <button 
               onClick={() => setActiveTab('settings')}
               className={`md:hidden p-2 rounded-full ${activeTab === 'settings' ? 'bg-slate-100 text-blue-600' : 'text-slate-400'}`}
             >
               <Settings className="w-6 h-6" />
             </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Mobile Tabs */}
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-50 px-6 py-3 flex justify-between shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
           <button 
             onClick={() => setActiveTab('dashboard')}
             className={`flex flex-col items-center gap-1 ${activeTab === 'dashboard' ? 'text-blue-600' : 'text-slate-400'}`}
           >
             <LayoutDashboard className="w-5 h-5" />
             <span className="text-[10px] font-medium">Home</span>
           </button>
           <button 
             onClick={() => setActiveTab('analytics')}
             className={`flex flex-col items-center gap-1 ${activeTab === 'analytics' ? 'text-blue-600' : 'text-slate-400'}`}
           >
             <PieChart className="w-5 h-5" />
             <span className="text-[10px] font-medium">Analytics</span>
           </button>
           <button 
             onClick={() => setActiveTab('advisor')}
             className={`flex flex-col items-center gap-1 ${activeTab === 'advisor' ? 'text-blue-600' : 'text-slate-400'}`}
           >
             <BrainCircuit className="w-5 h-5" />
             <span className="text-[10px] font-medium">Advisor</span>
           </button>
           <button 
             onClick={() => setActiveTab('settings')}
             className={`flex flex-col items-center gap-1 ${activeTab === 'settings' ? 'text-blue-600' : 'text-slate-400'}`}
           >
             <Settings className="w-5 h-5" />
             <span className="text-[10px] font-medium">Settings</span>
           </button>
        </div>

        {/* Desktop Tabs */}
        <div className="hidden md:flex space-x-1 bg-slate-200/50 p-1 rounded-xl mb-8 w-fit">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'dashboard' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('analytics')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'analytics' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setActiveTab('advisor')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'advisor' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            AI Advisor
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
              activeTab === 'settings' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Settings className="w-4 h-4" />
            Settings
          </button>
        </div>

        {/* Content Views */}
        <div className="animate-fade-in">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              <SummaryCards income={totalIncome} expenses={totalExpenses} />
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <TransactionList transactions={transactions} onDelete={deleteTransaction} />
                </div>
                <div className="lg:col-span-1">
                  <TransactionForm 
                    onAddTransaction={addTransaction} 
                    expenseCategories={expenseCategories}
                    incomeCategories={incomeCategories}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="md:col-span-2">
                 <SummaryCards income={totalIncome} expenses={totalExpenses} />
               </div>
               <div className="md:col-span-2">
                 <Charts transactions={transactions} />
               </div>
            </div>
          )}

          {activeTab === 'advisor' && (
            <div className="max-w-2xl mx-auto">
              <SummaryCards income={totalIncome} expenses={totalExpenses} />
              <Advisor transactions={transactions} />
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="max-w-4xl mx-auto space-y-6">
              <DataExport transactions={transactions} />
              <CategoryManager 
                incomeCategories={incomeCategories}
                expenseCategories={expenseCategories}
                onAddCategory={handleAddCategory}
                onRemoveCategory={handleRemoveCategory}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;