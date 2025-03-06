import { useEffect } from "react";
import { Link } from "react-router-dom";
import useExpenseStore from "../store/useExpenseStore";
import { fetchExpenses,  fetchExpenses2} from "@/service/airtable";
// import { expensesData } from "@/data";
 

const Landing = () => {
  const { loadExpenses } = useExpenseStore();
 

  useEffect(() => {
    loadExpenses();
    const fetch = async () => {
      const res = await fetchExpenses2({minAmount: 5000,})
      console.log({res})
    }
    fetch()
  }, []);

  // const handleAdd = async() => {
  //   const data = await addExpense(expensesData)
  //   console.log({data})
  // }

  
  return (
    <main className="p-4 min-h-screen max-w-3xl mx-auto">
      <section className="p-6 flex flex-col justify-between gap-24 text-white rounded-lg min-h-60 bg-blue-600">
        <div>
          <h1 className="font-bold text-4xl max-w-md">
            Welcome to your expenses dashboard
          </h1>
          <p>Manage your expenses on the go</p>
        </div>
        <div className="flex gap-4">
          <Link to={"/expenses"} className="bg-white py-2 px-6 rounded-md text-blue-600">
            View dashboard
          </Link>
          {/* <Link to={"/add-expense"} className="bg-white py-2 px-6 rounded-md text-blue-600">
            Add expenses
          </Link> */}
          {/* <button onClick={handleAdd}>Add</button> */}
        </div>
      </section>
    </main>
  );
};

export default Landing;
