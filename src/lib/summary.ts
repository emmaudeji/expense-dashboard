import { Expense } from "@/types";

export const getMonthlyExpenseSummary = (expenses: Expense[]) => {
    // Create an object to store monthly totals
    const monthlySummary: Record<string, { month: string; total: number; count: number }> = {};
  
    expenses.forEach(({ amount, date }) => {
      const expenseDate = new Date(date);
      const monthKey = `${expenseDate.getFullYear()}-${String(expenseDate.getMonth() + 1).padStart(2, "0")}`; // Format: YYYY-MM
  
      if (!monthlySummary[monthKey]) {
        monthlySummary[monthKey] = {
          month: new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long" }).format(expenseDate),
          total: 0,
          count: 0,
        };
      }
  
      monthlySummary[monthKey].total += amount;
      monthlySummary[monthKey].count += 1;
    });
  
    // Convert object to an array for charting or UI display
    return Object.values(monthlySummary);
  };
  

  export const getCategoryExpenseSummary = (expenses: Expense[]) => {
    // Create an object to store category totals
    const categorySummary: Record<string, { category: string; total: number; count: number }> = {};
  
    expenses.forEach(({ amount, category }) => {
      if (!categorySummary[category]) {
        categorySummary[category] = {
          category,
          total: 0,
          count: 0,
        };
      }
  
      categorySummary[category].total += amount;
      categorySummary[category].count += 1;
    });
  
    // Convert object to an array for easy charting or UI display
    return Object.values(categorySummary);
  };
  

  export const getStatusExpenseSummary = (expenses: Expense[]) => {
    // Create an object to store status totals
    const statusSummary: Record<string, { status: string; total: number; count: number }> = {};
  
    expenses.forEach(({ amount, status }) => {
      if (!statusSummary[status]) {
        statusSummary[status] = {
          status,
          total: 0,
          count: 0,
        };
      }
  
      statusSummary[status].total += amount;
      statusSummary[status].count += 1;
    });
  
    // Convert object to an array for easy charting or UI display
    return Object.values(statusSummary);
  };
  