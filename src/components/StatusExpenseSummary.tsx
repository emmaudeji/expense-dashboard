import { getStatusExpenseSummary } from "@/lib/summary";
import useExpenseStore from "@/store/useExpenseStore";
import StatusPieChart from "./chart/StatusPieChart";
import { formatAmount } from "@/lib/formatCurrency";

const StatusExpenseSummary = () => {
  const { expenses } = useExpenseStore();
  const statusSummary = expenses ?
  getStatusExpenseSummary(expenses) : [] 

  return (
    <div className=""> 
    {/* <h4 className="font-semibold text-lg pb-2">Status summary</h4> */}
    <StatusPieChart />
    <div className="overflow-x-auto">
      <table className="min-w-full  text-sm  bg-white border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left border-b">Status</th>
            <th className="p-3 text-left border-b">Total Expenses</th>
            <th className="p-3 text-left border-b">Amount (₦)</th>
          </tr>
        </thead>
        <tbody>
          {statusSummary.length ? statusSummary.map(({ status, total, count }) => (
            <tr key={status} className="border-b hover:bg-gray-50">
              <td className="p-3 capitalize">{status.toLowerCase()}</td>
              <td className="p-3">{count}</td>
              <td className="p-3 font-semibold">{formatAmount(total)}</td>
            </tr>
          )) : null}
        </tbody>
      </table>
    </div>
    </div>
  );
};

export default StatusExpenseSummary;
