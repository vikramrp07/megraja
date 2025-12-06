import React from 'react';
import { Download, FileSpreadsheet } from 'lucide-react';
import { Transaction } from '../types';

interface DataExportProps {
  transactions: Transaction[];
}

const DataExport: React.FC<DataExportProps> = ({ transactions }) => {
  const handleExport = () => {
    if (transactions.length === 0) {
      return;
    }

    const headers = ['Date', 'Type', 'Category', 'Amount', 'Description'];
    const csvContent = [
      headers.join(','),
      ...transactions.map(t => {
        // Escape quotes and handle commas in description and category
        const description = t.description ? `"${t.description.replace(/"/g, '""')}"` : '';
        const category = `"${t.category.replace(/"/g, '""')}"`;
        return [
          t.date,
          t.type,
          category,
          t.amount,
          description
        ].join(',');
      })
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `megraja_finance_export_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 bg-slate-100 rounded-lg">
          <FileSpreadsheet className="w-5 h-5 text-slate-600" />
        </div>
        <h2 className="text-lg font-semibold text-slate-800">Export Data</h2>
      </div>
      <p className="text-sm text-slate-500 mb-6">
        Download your complete transaction history as a CSV file. You can import this file into spreadsheet software like Excel or Google Sheets for further analysis.
      </p>
      <button
        onClick={handleExport}
        disabled={transactions.length === 0}
        className="px-4 py-2 bg-slate-800 hover:bg-slate-900 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        <Download className="w-4 h-4" />
        Download CSV
      </button>
    </div>
  );
};

export default DataExport;