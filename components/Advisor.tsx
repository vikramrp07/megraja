import React, { useState } from 'react';
import { Sparkles, Lightbulb, TrendingUp, AlertCircle, Loader2 } from 'lucide-react';
import { Transaction, FinancialAdvice } from '../types';
import { getFinancialAdvice } from '../services/geminiService';

interface AdvisorProps {
  transactions: Transaction[];
}

const Advisor: React.FC<AdvisorProps> = ({ transactions }) => {
  const [advice, setAdvice] = useState<FinancialAdvice | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetAdvice = async () => {
    if (transactions.length === 0) {
      setError("Please add some transactions first so I can analyze your data.");
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const result = await getFinancialAdvice(transactions);
      setAdvice(result);
    } catch (err) {
      setError("Failed to generate advice. Please check your API key and internet connection.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
      <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="flex items-center gap-3 mb-2">
          <Sparkles className="w-6 h-6 text-yellow-300" />
          <h2 className="text-xl font-bold">AI Financial Advisor</h2>
        </div>
        <p className="text-blue-100 text-sm">
          Powered by Gemini. Get personalized insights to grow your savings.
        </p>
      </div>

      <div className="p-6">
        {!advice && !loading && (
          <div className="text-center py-8">
            <div className="bg-blue-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lightbulb className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-lg font-medium text-slate-800 mb-2">Ready to Analyze?</h3>
            <p className="text-slate-500 mb-6 max-w-md mx-auto">
              I can analyze your income and spending patterns to provide actionable tips on how to save more money this month.
            </p>
            <button
              onClick={handleGetAdvice}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-medium transition-all shadow-md hover:shadow-lg flex items-center gap-2 mx-auto"
            >
              <Sparkles className="w-4 h-4" />
              Generate Insight
            </button>
            {error && (
               <div className="mt-4 p-3 bg-red-50 text-red-600 text-sm rounded-lg flex items-center justify-center gap-2">
                 <AlertCircle className="w-4 h-4" />
                 {error}
               </div>
            )}
          </div>
        )}

        {loading && (
          <div className="py-12 flex flex-col items-center justify-center">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin mb-4" />
            <p className="text-slate-600 font-medium">Analyzing your finances...</p>
            <p className="text-slate-400 text-sm">Crunching the numbers with Gemini</p>
          </div>
        )}

        {advice && (
          <div className="space-y-6 animate-fade-in">
            <div className="p-5 bg-slate-50 rounded-xl border border-slate-200">
              <h3 className="font-semibold text-slate-800 mb-2 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-indigo-600" />
                Financial Health Analysis
              </h3>
              <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                {advice.analysis}
              </p>
            </div>

            <div>
              <h3 className="font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Lightbulb className="w-5 h-5 text-amber-500" />
                Smart Saving Tips
              </h3>
              <div className="grid gap-4">
                {advice.tips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-white border border-slate-100 rounded-lg shadow-sm hover:border-blue-200 transition-colors">
                    <div className="bg-blue-100 text-blue-600 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold mt-0.5">
                      {index + 1}
                    </div>
                    <p className="text-slate-600 text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <button
              onClick={handleGetAdvice}
              className="w-full py-2 text-sm text-blue-600 font-medium hover:bg-blue-50 rounded-lg transition-colors"
            >
              Refresh Analysis
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Advisor;
