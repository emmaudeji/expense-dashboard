import { useEffect, useState } from "react";
import { Expense } from "../types";
import { settings } from "../config/settings";
import { Query } from "../types";
import { useSearchParams } from "react-router-dom";
import { fetchExpenses } from "../lib/expenses";
import useExpenseStore from "@/store/useExpenseStore";

export const defaultParam: Query = {
  search: null,
  category: null,
  status: null,
  page: 1,
  dateFrom: null,
  dateTo: null,
};

export const useExpense = () => {
  const [param, setParam] = useState<Query>(defaultParam);
  const [error, setError] = useState("");
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const { addExpense, updateExpense, removeExpense, } = useExpenseStore();

  // Convert URLSearchParams to a Query object safely
  const getParamsFromURL = (): Query => {
    return {
      search: searchParams.get("search") || null,
      category: searchParams.get("category") || null,
      status: searchParams.get("status") || null,
      dateFrom: searchParams.get("dateFrom") || null,
      dateTo: searchParams.get("dateTo") || null,
      page: Number(searchParams.get("page")) || null,
    };
  };

  const updateURL = (params: Query) => {
    const newSearchParams = new URLSearchParams();
    if (params.search) newSearchParams.set("search", params.search);
    if (params.category) newSearchParams.set("category", params.category);
    if (params.dateFrom) newSearchParams.set("dateFrom", params.dateFrom);
    if (params.dateTo) newSearchParams.set("dateTo", params.dateTo);
    if (params.status) newSearchParams.set("status", params.status);
    if (params.page) newSearchParams.set("page", params.page.toString());

    // Only update if different from current params
    if (newSearchParams.toString() !== searchParams.toString()) {
      setSearchParams(newSearchParams);
    }
  };

  const filterExpenses = async (query: Query): Promise<void> => {
    setError("");
    setLoading(true);

    const { data, error, tableSize } = await fetchExpenses(query);

    if (error) {
      setError(error);
    } else {
      setExpenses(data)
    }

    setLoading(false);
    setTotalPages(Math.ceil((tableSize || 0) / settings.LIMIT));
    setParam(query);
    updateURL(query);
  };

  // Fetch expenses when URL changes
  useEffect(() => {
    const params = getParamsFromURL();
// console.log('loading')
  filterExpenses(params);
  }, [searchParams.toString()]);

  const refetch = async () => {
    setLoading(true);
    await filterExpenses(defaultParam);
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    await filterExpenses({ ...param, page });
  };

  // **Manage Expenses in Zustand**
  const handleAddExpense = (expense: Expense) => {
    addExpense(expense);
    refetch();
  };

  const handleUpdateExpense = (updatedExpense: Expense) => {
    updateExpense(updatedExpense);
    refetch();
  };

  const handleDeleteExpense = (slug: string) => {
    removeExpense(slug);
    refetch();
  };

  return {
    filterExpenses,
    refetch,
    handlePageChange,
    param,
    setParam,
    expenses,setExpenses,
    error,setError,
    totalPages,setTotalPages,
    currentPage, setCurrentPage,    
    loading,setLoading,
    handleAddExpense,
    handleUpdateExpense,
    handleDeleteExpense,
  };
};
