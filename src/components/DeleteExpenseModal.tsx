import { useState } from "react";
import CenterModal from "./shared/CenterModal";
import { useExpenseContext } from "@/context/expensesContext";
import { Expense } from "@/types";
import { Button } from "@/components/ui/button";

const DeleteExpenseModal = ({ expense, btn }: { expense: Expense; btn: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  const { handleDeleteExpense } = useExpenseContext();

  const onDelete = () => {
    handleDeleteExpense(expense.id!);
    setOpen(false);
  };

  return (
    <CenterModal open={open} setOpen={setOpen} triggerBtn={btn} className="bg-white">
      <div className="text-center p-4">
        <h2 className="text-lg font-semibold">Delete Expense</h2>
        <p className="text-sm text-gray-600 mt-2">
          Are you sure you want to delete this expense? This action cannot be undone.
        </p>

        <div className="flex justify-center gap-4 mt-6">
          <Button   className="bg-black text-white" onClick={() => setOpen(false)}>
            Cancel
          </Button>
          <Button variant="destructive" className="bg-red-600 text-white" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </div>
    </CenterModal>
  );
};

export default DeleteExpenseModal;
