import { expensesData,     } from "../data";

import { Expense, Query } from "../types";
import useExpenseStore from "../store/useExpenseStore";
import {settings} from "../config/settings";  

export const fetchExpenses = async (params: Query) => {
  try {
    const { expenses } = useExpenseStore.getState();

    // Apply filtering
    let filteredExpenses = [...expenses];

    if (params.search) {
      filteredExpenses = filteredExpenses.filter((exp) =>
        exp.name.toLowerCase().includes(params.search!.toLowerCase())
      );
    }

    if (params.category) {
      console.log("Filtering by category:", params.category);
      const selectedCategories = Array.isArray(params.category)
        ? params.category
        : JSON.parse(params.category); // Ensure it's an array

      filteredExpenses = filteredExpenses.filter((exp) =>
        selectedCategories.includes(exp.category)
      );
    }

    if (params.status) {
      console.log("Filtering by status:", params.status);
      const selectedStatuses = Array.isArray(params.status)
        ? params.status
        : JSON.parse(params.status); // Ensure it's an array

      filteredExpenses = filteredExpenses.filter((exp) =>
        selectedStatuses.includes(exp.status)
      );
    }

    if (params.dateFrom) {
      const fromDate = new Date(params.dateFrom);
      if (!isNaN(fromDate.getTime())) {
        filteredExpenses = filteredExpenses.filter(
          (exp) => new Date(exp.date) >= fromDate
        );
      }
    }

    if (params.dateTo) {
      const toDate = new Date(params.dateTo);
      if (!isNaN(toDate.getTime())) {
        filteredExpenses = filteredExpenses.filter(
          (exp) => new Date(exp.date) <= toDate
        );
      }
    }

    // Pagination logic
    const tableSize = filteredExpenses.length;
    const page = params.page || 1;
    const limit = settings.LIMIT || 8;
    const startIndex = (page - 1) * limit;
    const paginatedExpenses = filteredExpenses.slice(startIndex, startIndex + limit);

    return { data: paginatedExpenses, error: "", tableSize };
  } catch (error) {
    console.error("Error fetching expenses:", error);
    return { data: [], error: "Failed to fetch expenses", tableSize: 0 };
  }
};



// Function to load data from localStorage OR set default data
export const getInitialExpenses = (): Expense[] => {
  try {
    const storedData = localStorage.getItem("expenses");
    if (storedData) return JSON.parse(storedData);
    
    // If no stored data, use dummy expenses
    localStorage.setItem("expenses", JSON.stringify(expensesData));
    return expensesData;
  } catch (error) {
    console.error("Failed to parse expenses from localStorage", error);
    return expensesData;  
  }
};
