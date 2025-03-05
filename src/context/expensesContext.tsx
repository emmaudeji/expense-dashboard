import { createContext, useContext, ReactNode } from "react";
import { Expense, Query } from "../types";
import { useExpense } from "../hooks/useExpenses";

// Define the context type
interface ExpenseContextType {
  filterExpenses: (query: Query) => Promise<void>;
  refetch: () => Promise<void>;
  handlePageChange: (page: number) => Promise<void>;
  param: Query;
  setParam: (param: Query) => void;
  expenses: Expense[];
  setExpenses: (expenses: Expense[]) => void;
  error: string;
  setError: (error: string) => void;
  totalPages: number;
  setTotalPages: (pages: number) => void;
  currentPage: number;
  setCurrentPage: (page: number) => void;
  loading: boolean;
  setLoading: (loading: boolean) => void;
  handleAddExpense:(data:Expense)=>void,
  handleUpdateExpense:(data:Expense)=>void,
  handleDeleteExpense:(slug:string)=>void,
}

// Create context
const ExpenseContext = createContext<ExpenseContextType | undefined>(undefined);

// Provider component
export const ExpenseProvider = ({ children }: { children: ReactNode }) => {
  const expenseValues = useExpense();

  return <ExpenseContext.Provider value={expenseValues}>{children}</ExpenseContext.Provider>;
};

// Custom hook to use ExpenseContext
export const useExpenseContext = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error("useExpenseContext must be used within an ExpenseProvider");
  }
  return context;
};
