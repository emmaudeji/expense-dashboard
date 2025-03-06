import CategoryExpenseSummary from "@/components/CategoryExpenseSummary";
import MonthlyExpenseSummary from "@/components/MonthlyExpenseSummary";
import StatusExpenseSummary from "@/components/StatusExpenseSummary";
import TotalExpenses from "@/components/TotalExpenses";
import useExpenseStore from "@/store/useExpenseStore";
import { useEffect } from "react";

const Summary = () => {
  const {loadExpenses} = useExpenseStore()
  useEffect(() => {
    loadExpenses()
  }, [])
  
    return (

      <section className="space-y-">
        <div className='flex justify-between flex-wrap gap-x-6 items-center pb-4'>
          <div className="">
            <h1 className="text-2xl font-bold">Summary</h1>
            <p>View your expenses summary</p>
          </div>
          <TotalExpenses/>
        </div>

        <section className="pt-10 grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <MonthlyExpenseSummary />
          <CategoryExpenseSummary />
          <StatusExpenseSummary />
        </section>

      </section>
    );
  };
  
  export default Summary;
  