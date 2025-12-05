export type TransactionType = 'income' | 'expense';

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: string;
  date: string; // ISO string YYYY-MM-DD
  description: string;
}

export interface ExpenseCategory {
  name: string;
  value: number;
  color: string;
}

export interface FinancialAdvice {
  analysis: string;
  tips: string[];
}

// Predefined categories for UI consisteny
export const DEFAULT_EXPENSE_CATEGORIES = [
  'Housing',
  'Food',
  'Transportation',
  'Utilities',
  'Entertainment',
  'Healthcare',
  'Shopping',
  'Personal',
  'Education',
  'Other'
];

export const DEFAULT_INCOME_CATEGORIES = [
  'Salary',
  'Freelance',
  'Investments',
  'Gifts',
  'Other'
];