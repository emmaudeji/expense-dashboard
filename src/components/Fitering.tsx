import { useState, useEffect } from "react";
import { useExpenseContext } from "../context/expensesContext";
import FilterCategory from "./FilterCategory";
import FilterByStatus from "./FilterByStatus";
import SearchTags from "./SearchTags";

const Filtering = () => {
  const { filterExpenses, param, setCurrentPage } = useExpenseContext();
  const [query, setQuery] = useState("");

  // Debounce effect for search input
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      const { page, ...rest } = param;
      setCurrentPage(1);
      filterExpenses({ ...rest, search: query });
    }, 300); // Adjust debounce delay as needed

    return () => clearTimeout(delayDebounce);
  }, [query]); // Runs only when `query` changes

  return (
    <section className="space-y-2">
      <section className="w-full flex flex-col gap-4 md:flex-row md:justify-between">
        {/* Search Input */}
        <div className="flex max-w-md w-full gap-2 items-center">
          <input
            type="search"
            placeholder="Search by expense name"
            className="border rounded-full bg-transparent px-3 border-input flex-1 focus:outline-none focus-within:outline-none py-3 border-gray-500 text-sm"
            value={query}
            name="query"
            id="query"
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div>
          <div className="pt-2 flex w-full overflow-auto no-scrollbar gap-4 items-center justify-center gap-4 max-w-3xl mx-auto">
            <FilterCategory />
            <FilterByStatus />
          </div>
        </div>
      </section>

      <SearchTags setQuery={setQuery} />
    </section>
  );
};

export default Filtering;
