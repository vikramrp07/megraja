import React from 'react';
import { Trash2, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { Transaction } from '../types';

interface TransactionListProps {
  transactions: Transaction[];
  onDelete: (id: string) => void;
}

const TransactionList: React.FC<TransactionListProps> = ({ transactions, onDelete }) => {
  // Sort by date descending
  const sortedTransactions = [...transactions].sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  if (transactions.length === 0) {
    return (
      <div className="text-center py-10 bg-white rounded-xl border border-slate-100">
        <div className="bg-slate-50 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
          <ArrowUpRight className="w-6 h-6 text-slate-300" />
        </div>
        <p className="text-slate-500">No transactions yet.</p>
        <p className="text-xs text-slate-400">Add your first income or expense above.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        <h3 className="font-semibold text-slate-800">Recent Transactions</h3>
      </div>
      <div className="divide-y divide-slate-100 max-h-[500px] overflow-y-auto">
        {sortedTransactions.map((t) => (
          <div key={t.id} className="p-4 hover:bg-slate-50 transition-colors flex items-center justify-between group">
            <div className="flex items-center gap-4">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                t.type === 'income' ? 'bg-emerald-100 text-emerald-600' : 'bg-rose-100 text-rose-600'
              }`}>
                {t.type === 'income' ? <ArrowDownLeft className="w-5 h-5" /> : <ArrowUpRight className="w-5 h-5" />}
              </div>
              <div>
                <p className="font-medium text-slate-800">{t.category}</p>
                <div className="flex items-center gap-2 text-xs text-slate-500">
                  <span>{new Date(t.date).toLocaleDateString()}</span>
                  {t.description && (
                    <>
                      <span>•</span>
                      <span className="truncate max-w-[150px]">{t.description}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className={`font-semibold ${t.type === 'income' ? 'text-emerald-600' : 'text-slate-700'}`}>
                {t.type === 'income' ? '+' : '-'}${t.amount.toFixed(2)}
              </span>
              <button 
                onClick={() => onDelete(t.id)}
                className="text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100 p-1"
                aria-label="Delete transaction"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TransactionList;
