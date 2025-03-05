import { useParams } from "react-router-dom";

const ExpenseDetail = () => {
  const { slug } = useParams();
  return <h1 className="text-2xl">Expense Details: {slug}</h1>;
};

export default ExpenseDetail;
