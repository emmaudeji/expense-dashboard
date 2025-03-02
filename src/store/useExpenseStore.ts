import { create } from "zustand";
import { Expense } from "../types";
import { getInitialExpenses } from "../lib/expenses";

interface ExpenseStore {
  expenses: Expense[];
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
  updateExpense: (data: Expense) => void;
  loadExpenses: () => void;
}

// Zustand Store
const useExpenseStore = create<ExpenseStore>((set, get) => ({
  expenses: getInitialExpenses(),

  loadExpenses: () => {
    const storedExpenses = getInitialExpenses();
    set({ expenses: storedExpenses });
  },

  addExpense: (expense) => {
    const newExpenses = [expense, ...get().expenses, ];
    set({ expenses: newExpenses });
    localStorage.setItem("expenses", JSON.stringify(newExpenses));
  },

  removeExpense: (slug) => {
    const newExpenses = get().expenses.filter((exp) => exp.slug !== slug);
    set({ expenses: newExpenses });
    localStorage.setItem("expenses", JSON.stringify(newExpenses));
  },

  updateExpense: (data) => {
    const newExpenses = get().expenses.map((exp) =>
      exp.id === data.id ? { ...exp, ...data } : exp
    );
    set({ expenses: newExpenses });
    localStorage.setItem("expenses", JSON.stringify(newExpenses));
  },
}));

export default useExpenseStore;
