import { useState } from "react";
import { useExpenseContext } from "../context/expensesContext";
import FilterCategory from "./FilterCategory";
import FilterByStatus from "./FilterByStatus";
import SearchTags from "./SearchTags";
import FilterByAmount from "./FilterByAmount";
import { Search } from "lucide-react";

const Filtering = () => {
  const { param, setCurrentPage, updateURL } = useExpenseContext();
  const [query, setQuery] = useState("");

  const handleOnChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (!value.length || value.length >= 3) {
      const {page, ...newParam} = param
      updateURL({ ...newParam, search: value });
      setCurrentPage(1);
    }
  };

  return (
    <section className="space-y-2 w-full overflow-x-hidden">

      <section className="w-full flex flex-col gap-2 xl:flex-row md:justify-between">
        {/* Search Input */}
        <div className="flex max-w-md min-w-sm  w-full hover:border-gray-400 duration-300  border-gray-300 gap-2 items-center mx-auto xl:mx-0 border rounded-full  px-4 h-12">
          <Search className="shrink-0 text-gray-300" size={20}/>
          <input
            type="search"
            placeholder="Search by expense name"
            className=" bg-transparent focus:outline-none w-full  text-sm"
            value={query}
            name="query"
            id="query"
            onChange={handleOnChange}
          />
        </div>
 
        <div className=" gap-2 flex flex-col sm:flex-row justify-center items-center xl:justify-end w-full">
          <div className="flex items-center gap-2">
            <FilterCategory />
            <FilterByStatus />
          </div>
          <FilterByAmount />
        </div>
      </section>

      <SearchTags setQuery={setQuery} />
    </section>
  );
};

export default Filtering;


  // Debounce effect for search input
  // useEffect(() => {
  //   const delayDebounce = setTimeout(() => {
  //     const { page, ...rest } = param;
  //     setCurrentPage(1);
  //     filterExpenses({ ...rest, search: query });
  //   }, 300); // Adjust debounce delay as needed

  //   return () => clearTimeout(delayDebounce);
  // }, [query]); // Runs only when `query` changes