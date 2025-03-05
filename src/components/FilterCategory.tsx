import { useMemo } from "react";
import { PopoverMenu } from "@/components/shared/PopoverMenu";
import { useExpenseContext } from "@/context/expensesContext";
import { Box, TickedBox,   } from "@/contants";
import { Layout } from "lucide-react";
import { expenseCategories } from "@/data";

const FilterCategory = () => {
  const { filterExpenses, param, setCurrentPage } = useExpenseContext();

  // Extract selected categories from params safely
  const selectedCategories = useMemo(() => {
    try {
      return param.category ? JSON.parse(param.category) : [];
    } catch (error) {
      console.error("Invalid category param:", error);
      return [];
    }
  }, [param.category]);

  // Toggle category selection
  const toggleSelection = (category: string) => {
    const isAlreadySelected = selectedCategories.includes(category);
    const updatedSelection = isAlreadySelected
      ? selectedCategories.filter((c: string) => c !== category) // Remove category
      : [...selectedCategories, category]; // Add category

    // Remove `page` from params to prevent pagination issues
    const { page, ...rest } = param;
    const newQueryParams = {
      ...rest,
      category: updatedSelection.length > 0 ? JSON.stringify(updatedSelection) : null,
    };

    setCurrentPage(1); // Reset pagination
    filterExpenses(newQueryParams); // Apply filter
  };

  return (
    <PopoverMenu
      trigerBtn={
        <button className="flex gap-2 items-center px-3 py-3 border rounded-md hover:bg-gray-100 w-44">
          <Layout size={"16"} />
          <small className="text-sm font-medium">Category</small>
        </button>
      }
      className="w-44 bg-white"
    >
      <div className="p-3 space-y-">
        {expenseCategories.map(({ label, value }) => (
          <button
            key={value}
            className="flex items-center gap-3 w-full text-sm hover:bg-gray-100 p-2 py-1.5 rounded-md transition-all"
            onClick={() => toggleSelection(value)}
            aria-pressed={selectedCategories.includes(value)}
          >
            {selectedCategories.includes(value) ? (
              <TickedBox size={"14"} />
            ) : (
              <Box size={"14"} />
            )}
            {label}
          </button>
        ))}
      </div>
    </PopoverMenu>
  );
};

export default FilterCategory;
