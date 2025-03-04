import { getMonthlyExpenseSummary,   } from "@/lib/summary";
import useExpenseStore from "@/store/useExpenseStore";

const MonthlyExpenseSummary = () => {
  const { expenses } = useExpenseStore();
  const statusSummary = getMonthlyExpenseSummary(expenses);

  return (
    <div className=""> 
    <h4 className="font-semibold text-lg pb-2">Monthly summary</h4>
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm bg-white border rounded-lg">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left border-b">Month</th>
            <th className="p-3 text-left border-b">Total Expenses</th>
            <th className="p-3 text-left border-b">Amount ($)</th>
          </tr>
        </thead>
        <tbody>
          {statusSummary.map(({ month, total, count }) => (
            <tr key={status} className="border-b hover:bg-gray-50">
              <td className="p-3 capitalize">{month.toLowerCase()}</td>
              <td className="p-3">{count}</td>
              <td className="p-3 font-semibold">${total.toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default MonthlyExpenseSummary;
