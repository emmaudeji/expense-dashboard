import { create } from "zustand";
import { Expense, Query } from "../types";
import {fetchExpenses} from "@/service/airtable"
import { expensesData } from "@/data";
import { settings } from "@/config/settings";

interface ExpenseStore {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
  updateExpense: (data: Expense) => void;
  getExpenses: (param:Query) => Promise<{data:Expense[], tableSize?:number, error?:string}>;
  loadExpenses: () => void;
  paginatedExpenses: Expense[];
  setPaginatedExpenses: (expenses:Expense[]) => void;
}

// Zustand Store
const useExpenseStore = create<ExpenseStore>((set, get) => ({
  expenses: [],
  paginatedExpenses: [],
  setPaginatedExpenses: (expenses:Expense[]) => {
    set({paginatedExpenses:expenses})
    },

  loadExpenses: async () => {
    try {
      const storedData = localStorage.getItem("expenses");
      if (storedData) {
        const data = JSON.parse(storedData)
        set({ expenses:data })
        const slicedData =  data.slice(0, settings.LIMIT);
        set({ paginatedExpenses: slicedData });
      } else {
        const {data} = await fetchExpenses({});
        localStorage.setItem("expenses", JSON.stringify(data));
        set({ expenses: data });
        const slicedData =  data.slice(0, settings.LIMIT);
        set({ paginatedExpenses: slicedData });
      }
    } catch (error) {
      console.error("Failed to parse expenses from localStorage", error);
      set({ expenses: expensesData })
      const slicedData =  expensesData.slice(0, settings.LIMIT);
      set({ paginatedExpenses: slicedData });  
    }
  },

  getExpenses: async (param:Query) => {
    const {data,tableSize,error} = await fetchExpenses(param);
    set({ expenses: data });
    return {data,tableSize,error} 
  },

  addExpense: (expense) => {
    // TODO: api add expenses, fetchPaginated expenses and set store state.
    const newExpenses = [expense, ...get().expenses, ];
    set({ expenses: newExpenses });
    localStorage.setItem("expenses", JSON.stringify(newExpenses));
  },

  removeExpense: (slug) => {
    // TODO: api add expenses, fetchPaginated expenses and set store state.
    const newExpenses = get().expenses.filter((exp) => exp.slug !== slug);
    set({ expenses: newExpenses });
    localStorage.setItem("expenses", JSON.stringify(newExpenses));
  },

  updateExpense: (data) => {
    // TODO: api add expenses, fetchPaginated expenses and set store state.
    const newExpenses = get().expenses.map((exp) =>
      exp.id === data.id ? { ...exp, ...data } : exp
    );
    set({ expenses: newExpenses });
    localStorage.setItem("expenses", JSON.stringify(newExpenses));
  },
}));

export default useExpenseStore;
