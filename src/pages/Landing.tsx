import { useEffect } from "react";
import { Link } from "react-router-dom";
import useExpenseStore from "../store/useExpenseStore";

const Landing = () => {
  const { loadExpenses } = useExpenseStore();
 
  useEffect(() => {
    // loading domi data
    loadExpenses();
  }, []);

  // const handleAdd = async() => {
  //   const data = await addExpense(expensesData)
  //   console.log({data})
  // }

  return (
    <main className="p-4 min-h-screen max-w-3xl mx-auto space-y-8">
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

      <div className="mx-auto max-w-md p-8 rounded-lg italic font-semibold bg-gray-200">
        The table was updated with some domi data to properly implement pagination
      </div>
    </main>
  );
};

export default Landing;
