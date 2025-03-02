import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import DashboardLayout from "./components/Dashboard";
import Expenses from "./pages/Expenses";
import ExpenseDetail from "./pages/ExpensesSlug/ExpenseDetail";
import Summary from "./pages/Summary";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Dashboard Routes */}
        <Route path="/" element={<DashboardLayout />}>
          <Route path="/expenses" element={<Expenses />} />
          <Route path="/expenses/:slug" element={<ExpenseDetail />} />
          <Route path="/summary" element={<Summary />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
