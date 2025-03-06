import { getStatusExpenseSummary } from "@/lib/summary";
import useExpenseStore from "@/store/useExpenseStore";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"]; // Colors for Active, Draft, Archived

const StatusExpensesPieChart = () => {
  const { expenses } = useExpenseStore();
  const statusSummary = getStatusExpenseSummary(expenses); // [{ status, total, count }]

  // Map data for Recharts
  const data = statusSummary.map(({ status, total }) => ({
    name: status,
    value: total,
  }));

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <h2 className="text-lg font-semibold mb-4 text-center">Expenses by Status</h2>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
            outerRadius={120}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((_, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => `₦${value.toLocaleString()}`} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StatusExpensesPieChart;
