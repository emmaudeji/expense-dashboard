import { getMonthlyExpenseSummary } from "@/lib/summary";
import useExpenseStore from "@/store/useExpenseStore";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const TotalExpensesChart = () => {
  const { expenses } = useExpenseStore();
  const statusSummary = getMonthlyExpenseSummary(expenses); // [{ month, total, count }]

  // Map data to match the expected format for Recharts
  const data = statusSummary.map(({ month, total, count }) => ({
    month,
    totalExpenses: count,
    amount: total,
  }));

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-center">Total Expenses (2025)</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" angle={-45} textAnchor="end" height={60} />
          <YAxis />
          <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
          <Legend />
          <Bar dataKey="amount" fill="#8884d8" name="Amount (₦)" />
          <Bar dataKey="totalExpenses" fill="#82ca9d" name="Total Expenses" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TotalExpensesChart;
