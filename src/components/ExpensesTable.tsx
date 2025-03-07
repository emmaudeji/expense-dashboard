import { Edit, Eye, Trash } from "lucide-react";
import { useExpenseContext } from "../context/expensesContext";
import { Expense } from "../types";
import ExpensesFormModal from "./ExpensesFormModal";
import DeleteExpenseModal from "./DeleteExpenseModal";
import { Link } from "react-router-dom";
import useExpenseStore from "@/store/useExpenseStore";
import { formatAmount } from "@/lib/formatCurrency";
// import { Link } from "react-router-dom";

const ExpensesTable = () => {
  const {  loading, error } = useExpenseContext();
  const {paginatedExpenses} = useExpenseStore()

  return (
    < >
      {/* Error Message */}
      {error && <p className="text-red-500 text-sm">{error}</p>}

      {/* Loading Skeleton */}
      {loading ? (
        <div className="space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-gray-200 animate-pulse rounded-md" />
          ))}
        </div>
      ) : (
        // Expenses Table
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr className="text-left text-[12px] text-gray-600">
                <th className="p-3">Date</th>
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Amount</th>
                <th className="p-3">Status</th>
                <th className="p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedExpenses.length > 0 ? (
                paginatedExpenses.map((expense: Expense) => (
                  <tr
                    key={expense.id}
                    className="border-t text-sm hover:bg-gray-50 transition"
                  >
                    <td className="p-3">{new Date(expense.date).toLocaleDateString()}</td>
                    <td className="p-3">{expense.name}</td>
                    <td className="p-3">{expense.category}</td>
                    <td className="p-3 font-medium text-gray-800"> {formatAmount(expense.amount)}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 text-xs font-semibold rounded-full 
                        ${expense.status === "ACTIVE" ? "bg-blue-100 text-blue-600" : 
                          expense.status === "DRAFT" ? "bg-gray-100 text-gray-600" :
                          "bg-red-100 text-red-600"}
                      `}>
                        {expense.status}
                      </span>
                    </td>
                    
                    <td className="p-3 text-center flex justify-center gap-2">
                      <Link
                        className="text-blue-500 cursor-pointer hover:text-blue-700"
                        role="button"
                        tabIndex={0}
                        to={`/expenses/${expense.slug}`}
                        onKeyDown={(e) => e.key === "Enter" && console.log("View expense:", expense)}
                      >
                        <Eye size={16} />
                      </Link>

                      <span 
                        className="text-green-500 cursor-pointer hover:text-green-700"
                        role="button"
                        tabIndex={0}
                      >
                        <ExpensesFormModal btn={<Edit size={16} />} expense={expense} />
                      </span>

                      <span 
                        className="text-red-500 cursor-pointer hover:text-red-700"
                        role="button"
                        tabIndex={0}
                        onKeyDown={(e) => e.key === "Enter" && console.log("Delete expense:", expense)}
                      >
                        <DeleteExpenseModal expense={expense} btn={<Trash size={16} />}/>
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-gray-500">
                    No expenses found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </ >
  );
};

export default ExpensesTable;
