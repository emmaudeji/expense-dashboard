// src/hooks/useFilters.ts
import { useSearchParams } from "react-router-dom";

const useFilters = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Set a filter with proper type safety
  const setFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(key, value);
    setSearchParams(newParams);
  };

  // Convert URLSearchParams to a record
  const filters: Record<string, string> = Object.fromEntries(searchParams.entries());

  return { filters, setFilter };
};

export default useFilters;
