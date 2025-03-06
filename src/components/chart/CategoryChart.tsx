import { getCategoryExpenseSummary } from "@/lib/summary";
import useExpenseStore from "@/store/useExpenseStore";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const CategoryExpensesChart = () => {
  const { expenses } = useExpenseStore();
  const categorySummary = getCategoryExpenseSummary(expenses); // [{ category, total, count }]

  // Structure data for Recharts
  const data = categorySummary.map(({ category, total, count }) => ({
    category,
    totalExpenses: count,
    amount: total,
  }));

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-center">Expenses by Category</h2>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 20, right: 30, left: 80, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis type="number" />
          <YAxis dataKey="category" type="category" width={120} />
          <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" name="Amount (₦)" barSize={15} />
          <Bar dataKey="totalExpenses" fill="#82ca9d" name="Total Expenses" barSize={15} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryExpensesChart;
