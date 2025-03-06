import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import SignIn from "./pages/auth/SignIn";
import SignUp from "./pages/auth/SignUp";
import DashboardLayout from "./components/Dashboard";
import Expenses from "./pages/Expenses";
import ExpenseDetail from "./pages/ExpensesSlug/ExpenseDetail";
import Summary from "./pages/Summary";
import ProtectedRoute from "./components/ProtectedRoute";
import { ExpenseProvider } from "./context/expensesContext";
import NotFound from "./components/NotFound";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Dashboard Routes */}
        <Route element={<ProtectedRoute />}>
        <Route  element={<DashboardLayout />}>
          <Route path="/expenses" element={<ExpenseProvider><Expenses /></ExpenseProvider>} />
          <Route path="/expenses/:slug" element={<ExpenseProvider><ExpenseDetail /></ExpenseProvider>} />
          <Route path="/summary" element={<Summary />} />
        </Route>
        </Route>

        {/* 404 Page */}
        <Route path="*" element={<NotFound/>} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;
