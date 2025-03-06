import useExpenseStore from "@/store/useExpenseStore";
import { useMemo } from "react";

const TotalExpenses = () => {
  const { expenses } = useExpenseStore();

  // Sum amount
  const totalExp = useMemo(() => {
    return expenses.reduce((acc, item) => acc + item.amount, 0);
  }, [expenses]);

  return (
    <div className="leading">
      <small className="">Total Expenses</small>
      <h6 className="font-bold bg-blue-50 border rounded-md px-2 text-center py-1">₦{totalExp}</h6>
    </div>
  );
};

export default TotalExpenses;
