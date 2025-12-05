import { Transaction, FinancialAdvice } from "../types";

export const getFinancialAdvice = async (transactions: Transaction[]): Promise<FinancialAdvice> => {
  try {
    // We now send the transactions to our own Node.js backend
    // This keeps the API key secure on the server side
    const response = await fetch('/api/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ transactions }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `Server error: ${response.status}`);
    }

    const data = await response.json();
    return data as FinancialAdvice;
  } catch (error) {
    console.error("Error fetching financial advice:", error);
    throw error;
  }
};