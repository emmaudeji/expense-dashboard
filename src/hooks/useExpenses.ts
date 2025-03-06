import { useEffect, useState } from "react";
import { Expense } from "../types";
import { settings } from "../config/settings";
import { Query } from "../types";
import { useSearchParams } from "react-router-dom";
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
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();

  const { addExpense, updateExpense, removeExpense, getExpenses, expenses, paginatedExpenses, setPaginatedExpenses} = useExpenseStore();

  // used to achieve pagination
  const sliceExpenses = (page:number, data?:Expense[]) => {
    const refactoredData = data?data:expenses
    const slicedData =  refactoredData.slice((page - 1) * settings.LIMIT, page * settings.LIMIT);
    setPaginatedExpenses(slicedData)
  }
 
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

    const { data, error, tableSize } = await getExpenses(query);

    if (error) {
      setError(error);
    }  else {
      sliceExpenses(query.page || currentPage, data)
    }
    console.log({data,query})
    setLoading(false);
    setTotalPages(Math.ceil((tableSize || 0) / settings.LIMIT));
    setParam(query);
    updateURL(query);
  };

  // Fetch expenses when URL changes
  useEffect(() => {
    const params = getParamsFromURL();
      filterExpenses(params)
  }, [searchParams.toString()]);

  const refetch = async () => {
    setLoading(true);
    await filterExpenses(defaultParam);
  };

  const handlePageChange = async (page: number) => {
    setCurrentPage(page);
    sliceExpenses(page)
    // await filterExpenses({ ...param, page });
  };

  // **Manage Expenses in Zustand**
  const handleAddExpense = async (expense: Expense) => {
    await addExpense(expense);
    sliceExpenses(1)
    setCurrentPage(1)
    // refetch();
  };

  const handleUpdateExpense = async (updatedExpense: Expense) => {
    await updateExpense(updatedExpense);
    sliceExpenses(currentPage)
    // refetch();
  };

  const handleDeleteExpense = async (slug: string) => {
    await removeExpense(slug);
    sliceExpenses(currentPage)
    // refetch();
  };

  return {
    filterExpenses,
    refetch,
    handlePageChange,
    param,
    setParam,
    expenses, 
    paginatedExpenses,
    error,setError,
    totalPages,setTotalPages,
    currentPage, setCurrentPage,    
    loading,setLoading,
    handleAddExpense,
    handleUpdateExpense,
    handleDeleteExpense,
  };
};
