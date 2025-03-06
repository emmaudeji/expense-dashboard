import { create } from "zustand";
import { Expense, Query } from "../types";
import {addExpense, deleteExpense, fetchExpenses, updateExpense} from "@/service/airtable"
import { expensesData } from "@/data";
import { settings } from "@/config/settings";

interface ExpenseStore {
  expenses: Expense[];
  addExpense: (expense: Expense) => Promise<Expense[]>;
  removeExpense: (id: string) => Promise<Expense[]>;
  updateExpense: (data: Expense) => Promise<Expense[]>;
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
      // const storedData = localStorage.getItem("expenses");
      // if (storedData) {
      //   const data = JSON.parse(storedData)
      //   set({ expenses:data })
      //   const slicedData =  data.slice(0, settings.LIMIT);
      //   set({ paginatedExpenses: slicedData });
      // } else {
        const {data} = await fetchExpenses({});
        localStorage.setItem("expenses", JSON.stringify(data));
        set({ expenses: data });
        const slicedData =  data.slice(0, settings.LIMIT);
        set({ paginatedExpenses: slicedData });
      // }
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

  addExpense: async (expense):Promise<Expense[]> => {
    const data = await addExpense(expense)
    const newExpenses = [data, ...get().expenses, ];
    await set({ expenses: newExpenses });
    localStorage.setItem("expenses", JSON.stringify(newExpenses));
    return newExpenses
  },

  removeExpense: async (id) => {
    await deleteExpense(id)
    const newExpenses = get().expenses.filter((exp) => exp.id !== id);
    set({ expenses: newExpenses });
    localStorage.setItem("expenses", JSON.stringify(newExpenses));
    return newExpenses
  },

  updateExpense: async (data) => {
    await updateExpense(data.id!, data,)
    const newExpenses = get().expenses.map((exp) =>
      exp.id === data.id ? { ...exp, ...data } : exp
    );
    set({ expenses: newExpenses });
    localStorage.setItem("expenses", JSON.stringify(newExpenses));
    return newExpenses
  },
}));


export default useExpenseStore;
