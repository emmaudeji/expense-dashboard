import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useExpenseContext } from "@/context/expensesContext";
import { Expense } from "@/types";
import { CustomInput } from "./CustomInput";
import { Button } from "./ui/button";
import { generateSlug } from "@/lib/generateSlug";
import { expenseCategories,   } from "@/data";

const ExpenseForm = ({ 
  expense, 
  closeModal, 
}: { 
  expense?: Expense; 
  closeModal:  (bool:boolean)=>void
}) => {
  const { handleAddExpense,handleUpdateExpense } = useExpenseContext();
//   const { push } = useRouter();
  const [error, setError] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  // Default Expense Data
  const defaultValues: Expense = {
    name: "",
    amount: 0,
    category: "",
    date: new Date().toISOString().split("T")[0], // Default to today's date
    slug: "",
    status: "ACTIVE",
  };

  const [formData, setFormData] = useState<Expense>({ ...defaultValues });

  // Sync existing expense data when provided
  useEffect(() => {
    console.log({expense})
    if (expense) {
      setFormData({
        ...expense, 
        date: new Date(expense.date).toISOString().split("T")[0] // Convert to "YYYY-MM-DD"
      });
    }
  }, [expense]);
  

  // Handle Input Changes
  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Validate Fields
  const validate = (): boolean => {
    const errors: Record<string, string> = {};
    if (!formData.name) errors.name = "Expense name is required.";
    if (!formData.amount || formData.amount <= 0) errors.amount = "Amount must be greater than zero.";
    if (!formData.category) errors.category = "Category is required.";
    if (!formData.date) errors.date = "Date is required.";

    setError(errors);
    return Object.keys(errors).length === 0;
  };

  // Handle Form Submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    try {
      const newExpense = { ...formData };

      if (expense) {
        await handleUpdateExpense(newExpense);
      } else {
        await handleAddExpense({...newExpense, slug:generateSlug(formData.name)});
      }

      setFormData(defaultValues);
      closeModal(false)
    //   push("/expenses?success=Expense saved successfully.");
    } catch (err) {
      console.error("Error saving expense:", err);
      setError({ general: "Something went wrong, please try again." });
    } finally {
      setLoading(false);
    }
  };

  const saveDraft = async () => {
    if (!validate()) return;

    setLoading(true);
    try {
      const newExpense = { ...formData, status: "DRAFT" as const };

      if (expense) {
        await handleUpdateExpense(newExpense);
      } else {
        await handleAddExpense({...newExpense, slug:generateSlug(formData.name)});
      }

      setFormData(defaultValues);
      closeModal(false)
    //   push("/expenses?success=Expense saved successfully.");
    } catch (err) {
      console.error("Error saving expense:", err);
      setError({ general: "Something went wrong, please try again." });
    } finally {
      setLoading(false);
    }
  }

  return (
    <form 
      onSubmit={handleSubmit} 
      className="max-w-3xl text-black mx-auto rounded-md bg-slate-50 p-6 sm:px-10 space-y-4"
    >
      <h4 className="font-medium text-xl">
        {expense ? `Edit Expense - ${expense.name}` : "Add a New Expense"}
      </h4>

      {/* Name Input */}
      <CustomInput
        name="name"
        label="Expense Name"
        type="text"
        error={error.name}
        value={formData.name}
        onChange={handleChange}
        required
      />

      {/* Amount Input */}
      <CustomInput
        name="amount"
        label="Amount"
        type="number"
        error={error.amount}
        value={formData.amount}
        onChange={handleChange}
        required
      />

      {/* Category Select */}
      <div>
        <label className="block text-sm font-medium">Category</label>
        <select 
          name="category" 
          value={formData.category} 
          onChange={handleChange} 
          className="w-full border rounded-md px-3 py-2 focus:outline-none"
        >
          <option value="">Select a category</option>
          {
            expenseCategories.map(({label,value},i)=>
                <option key={i} value={value}>{label}</option>
            )
          }
          <option value="Other">Other</option>
        </select>
        {error.category && <p className="text-red-500 text-sm">{error.category}</p>}
      </div>

      {/* Date Input */}
      <CustomInput
        name="date"
        label="Date"
        type="date"
        error={error.date}
        value={formData.date}
        onChange={handleChange}
        required
      />

      {/* Status Select */}
      {/* <div>
        <label className="block text-sm font-medium">Status</label>
        <select 
          name="status" 
          value={formData.status} 
          onChange={handleChange} 
          className="w-full border rounded-md px-3 py-2 focus:outline-none"
        >
          {
            expenseStatuses.map(({label,value},i)=>
                <option key={i} value={value}>{label}</option>
            )
          }
        </select>
      </div> */}

      {/* Submit Button */}
      <div className="flex gap-2">
      <Button 
        type="submit" 
        className="bg-black w-full text-white"
        disabled={loading}
      >
        {loading ? "Saving..." : expense ? "Update Expense" : "Add Expense"}
      </Button>
      </div>
      <Button 
      onClick={saveDraft}
        type="button" 
        variant={"outline"}
        className=" w-full text-black border border-black"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Draft"  }
      </Button>
    </form>
  );
};

export default ExpenseForm;
