import axios from "axios";

const AIRTABLE_API_KEY = import.meta.env.VITE_AIRTABLE_API_KEY;
const AIRTABLE_BASE_ID = import.meta.env.VITE_AIRTABLE_BASE_ID;
const TABLE_NAME = import.meta.env.VITE_AIRTABLE_TABLE_NAME;

const BASE_URL = `https://api.airtable.com/v0/${AIRTABLE_BASE_ID}/${TABLE_NAME}`;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${AIRTABLE_API_KEY}`,
    "Content-Type": "application/json",
  },
});

export interface Expense {
  id?: string;
  name: string;
  amount: number;
  category: string;
  date: string;
}

// 🔹 Fetch all expenses
export const fetchExpenses = async (): Promise<Expense[]> => {
  const response = await api.get("");
  return response.data.records.map((record: any) => ({
    id: record.id,
    ...record.fields,
  }));
};

// 🔹 Add a new expense
export const addExpense = async (expense: Expense): Promise<Expense> => {
  const response = await api.post("", {
    fields: expense,
  });
  return { id: response.data.id, ...response.data.fields };
};

// 🔹 Update an expense
export const updateExpense = async (id: string, updatedExpense: Partial<Expense>): Promise<Expense> => {
  const response = await api.patch(`/${id}`, {
    fields: updatedExpense,
  });
  return { id: response.data.id, ...response.data.fields };
};

// 🔹 Delete an expense
export const deleteExpense = async (id: string): Promise<void> => {
  await api.delete(`/${id}`);
};
