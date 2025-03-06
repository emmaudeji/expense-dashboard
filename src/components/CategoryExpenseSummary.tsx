import { getCategoryExpenseSummary } from "@/lib/summary";
import useExpenseStore from "@/store/useExpenseStore";
import CategoryChart from "./chart/CategoryChart";

const CategoryExpenseSummary = () => {
  const { expenses } = useExpenseStore();
  
  const statusSummary = expenses ?
  getCategoryExpenseSummary(expenses) : []
  
  console.log({expenses,statusSummary})
  return (
    <div className=""> 
    <h4 className="font-semibold text-lg pb-2">Category summary</h4>
    <CategoryChart />
    <div className="overflow-x-auto">
      <table className="min-w-full  text-sm  bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left border-b">Category</th>
            <th className="p-3 text-left border-b">Total Expenses</th>
            <th className="p-3 text-left border-b">Amount (₦)</th>
          </tr>
        </thead>
        <tbody>
          {statusSummary.length ? statusSummary.map(({ category, total, count }) => (
            <tr key={category} className="border-b hover:bg-gray-50">
              <td className="p-3 capitalize">{category.toLowerCase()}</td>
              <td className="p-3">{count}</td>
              <td className="p-3 font-semibold">₦{total?.toFixed(2)}</td>
            </tr>
          ))
        : null }
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default CategoryExpenseSummary;
