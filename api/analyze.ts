import { GoogleGenAI, Type } from "@google/genai";

export default async function handler(req: any, res: any) {
  // CORS handling
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API_KEY is missing in environment variables");
      return res.status(500).json({ error: "Server configuration error" });
    }

    const { transactions } = req.body;

    if (!transactions || !Array.isArray(transactions)) {
      return res.status(400).json({ error: "Invalid input: transactions array required" });
    }

    // Calculate summaries for the prompt
    const totalIncome = transactions
      .filter((t: any) => t.type === 'income')
      .reduce((sum: number, t: any) => sum + t.amount, 0);

    const totalExpense = transactions
      .filter((t: any) => t.type === 'expense')
      .reduce((sum: number, t: any) => sum + t.amount, 0);

    const expensesByCategory = transactions
      .filter((t: any) => t.type === 'expense')
      .reduce((acc: any, t: any) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

    const promptContext = JSON.stringify({
      totalIncome,
      totalExpense,
      savings: totalIncome - totalExpense,
      expensesBreakdown: expensesByCategory,
      transactionCount: transactions.length
    });

    const prompt = `You are a financial advisor. Analyze the following monthly financial summary: ${promptContext}. 
    Provide a brief analysis of the financial health (tone should be encouraging but realistic) and 3 specific, actionable tips to improve savings based on the spending categories.`;

    const ai = new GoogleGenAI({ apiKey });
    
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            analysis: { type: Type.STRING },
            tips: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            }
          },
          required: ["analysis", "tips"]
        }
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from AI");
    }

    const advice = JSON.parse(text);
    return res.status(200).json(advice);

  } catch (error) {
    console.error("Error in /api/analyze:", error);
    return res.status(500).json({ error: "Failed to generate advice" });
  }
}