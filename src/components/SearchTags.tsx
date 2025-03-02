import { useExpenseContext } from "@/context/expensesContext";
import { Query } from "@/types";
import { format, isValid, parseISO } from "date-fns";

const SearchTags = ({setQuery}:{setQuery:(q:string)=>void}) => {
  const { filterExpenses,setCurrentPage,param } = useExpenseContext();

  // Filter out unwanted keys
  const filteredEntries = Object.entries(param).filter(
    ([key, value]) =>
      value !== null &&
      value !== undefined &&
      value !== "" &&
      ![ "page"].includes(key)
  );

  // Function to parse JSON lists safely
  const parseJSONList = (value: string) => {
    try {
      const parsed = JSON.parse(value);
      return Array.isArray(parsed) ? parsed.join(", ") : value;
    } catch {
      return value; // Return as-is if not valid JSON
    }
  };

  // Handle Date Range
  const fromDate = param.dateFrom ? parseISO(param.dateFrom) : null;
  const toDate = param.dateTo ? parseISO(param.dateTo) : null;
  const hasDateRange = isValid(fromDate) && isValid(toDate);

  const removeFilter = async (key: keyof Query) => {
    const updatedParams: Partial<Query> = { ...param};
    delete updatedParams[key];

    // If removing the date range, remove both "from" and "to"
    if (key === "dateFrom" || key === "dateTo") {
        delete updatedParams.dateFrom;
        delete updatedParams.dateTo;
        // setDateRange(undefined);
    }

    if (key === "search") {
        setQuery("");
    }

    // Remove page to avoid offset issues and reset pagination
    const { page, ...removedPage } = updatedParams;
    setCurrentPage(1);
 
    filterExpenses(removedPage as Query);
};

  if (filteredEntries.length === 0) return null;

  return (
    <div className="flex flex-wrap justify-center items-center gap-2 pt-2 text-[12px]">
      {filteredEntries
        .filter(([key]) => key !== "from" && key !== "to") // Exclude date fields here
        .map(([key, value]) => (
          <div
            key={key}
            className="flex items-center gap-2 bg-blue-100 text-blue-600 px-3 py-0.5 rounded-full"
          >
            <span className="capitalize">
              {parseJSONList(value as string)}
              {/* {key}: {parseJSONList(value as string)} */}
            </span>
            <button
              onClick={() => removeFilter(key as keyof Query)}
              className="text-red-600 hover:text-red-800"
            >
              ✕
            </button>
          </div>
        ))}

      {/* Display Date Range as a Single Tag */}
      {hasDateRange && (
        <div className="flex items-center gap-2 bg-blue-100 text-blue-600 px-3 py-0.5 rounded-full">
          <span>
            {format(fromDate!, "MMM dd, yyyy")} -{" "}{format(toDate!, "MMM dd, yyyy")}
          </span>
          <button
            onClick={() => removeFilter("dateFrom")}
            className="text-red-600 hover:text-red-800"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchTags;
