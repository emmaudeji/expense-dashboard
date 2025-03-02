import { Link } from "react-router-dom";
import Fitering from "../components/Fitering";
import ExpensesTable from "../components/ExpensesTable";
import PaginationMain from "@/components/shared/PaginationMain";
import { useExpenseContext } from "@/context/expensesContext";
import ExpensesFormModal from "@/components/ExpensesFormModal";
import { Button } from "@/components/ui/button";

const Expenses = () => {

  const {totalPages,currentPage,handlePageChange} = useExpenseContext()
  return (
    <section className="">
    <div className="pb-8">
      <h1 className="text-2xl font-bold">Expenses</h1>
      <p className="max-w-md pb-6">
        View and add expenses 
      </p>
      <div className="flex">
        <ExpensesFormModal 
          btn={<Button className="text-white rounded-full bg-black px-4 py-2 block">Add Expense</Button>}
        />
        {/* <Link to="/add-expense" className="text-white rounded-full bg-black px-4 py-2 block">
          Add Expense
        </Link> */}
      </div>
      </div>

      <section className=" pb-12  space-y-6">
        <Fitering/>
        <ExpensesTable />
      </section>

      <div className="absolute left-0 bottom-0  bg-white w-full p-2">
        <PaginationMain totalPages={totalPages} currentPage={currentPage} onPageChange={handlePageChange} />
      </div>


      </section>
  );
};

export default Expenses;
