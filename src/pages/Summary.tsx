import CategoryExpenseSummary from "@/components/CategoryExpenseSummary";
import MonthlyExpenseSummary from "@/components/MonthlyExpenseSummary";
import StatusExpenseSummary from "@/components/StatusExpenseSummary";

const Summary = () => {
    return (

      <section className="space-y-">

        <h1 className="text-2xl font-bold">Summary</h1>
        <p>View your expenses summary</p>

        <section className="pt-10 grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <MonthlyExpenseSummary />
          <CategoryExpenseSummary />
          <StatusExpenseSummary />
        </section>

      </section>
    );
  };
  
  export default Summary;
  