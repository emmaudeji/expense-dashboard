import { useMemo } from "react";
import { PopoverMenu } from "@/components/shared/PopoverMenu";
import { useExpenseContext } from "@/context/expensesContext";
import { Box, StatusIcon, TickedBox } from "@/contants";
import { expenseStatuses } from "@/data";

const FilterByStatus = () => {
  const { filterExpenses, param, setCurrentPage } = useExpenseContext();

  // Extract selected status from params safely
  const selectedStatuses = useMemo(() => {
    try {
      return param.status ? JSON.parse(param.status) : [];
    } catch (error) {
      console.log(error)
      return [];
    }
  }, [param.status]);

  // Toggle selection
  const toggleSelection = (status: string) => {
    const isAlreadySelected = selectedStatuses.includes(status);
    const updatedSelection = isAlreadySelected
      ? selectedStatuses.filter((s: string) => s !== status) // Remove status
      : [...selectedStatuses, status]; // Add status

    // Remove page number to avoid offset errors
    const { page, ...rest } = param;
    const newQueryParams = {
      ...rest,
      status: updatedSelection.length > 0 ? JSON.stringify(updatedSelection) : null,
    };

    setCurrentPage(1); // Reset pagination
    filterExpenses(newQueryParams); // Apply filter
  };

  return (
    <PopoverMenu
      trigerBtn={
        <button className="flex gap-2 items-center px-3 py-3 border rounded-md hover:bg-gray-100 w-44">
          <StatusIcon size={'16'} />
          <small className="text-sm font-medium">Status</small>
        </button>
      }
      className="w-44 bg-white"
    >
      <div className="p-3 ">
        {expenseStatuses.map(({ label, value }) => (
          <button
            key={value}
            className="flex items-center gap-2 w-full text-sm hover:bg-gray-100 p-1.5 rounded-md transition-all"
            onClick={() => toggleSelection(value)}
            aria-pressed={selectedStatuses.includes(value)}
          >
            {selectedStatuses.includes(value) ? (
              <TickedBox size={'14'} />
            ) : (
              <Box size={'14'} />
            )}
            {label}
          </button>
        ))}
      </div>
    </PopoverMenu>
  );
};

export default FilterByStatus;
