import React, { useEffect, useState } from "react";
import { Calendar, ChevronLeft, ChevronRight, UserCircle } from "lucide-react";
import Breadcrumb from "./Breadcrumb";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import { ExpenseProvider } from "../context/expensesContext";

const DashboardLayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState("");
  
  useEffect(() => {
    const interval = setInterval(() => {
      setDate(new Date().toLocaleString());
    }, 1000); // Updates every second
  
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);
  
  return (
    <ExpenseProvider>
      <main className="bg-blue-50">
        {/* Sidebar */}
        <aside
          className={`${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } fixed top-0 left-0 h-screen w-60 bg-blue-50 px-6 py-8 flex flex-col justify-between gap-6 transform transition-transform duration-300 ease-in-out z-50 md:translate-x-0`}
        >
          <div className="space-y-4">
            {/* Sidebar Header */}
            <div className="w-full border-b flex justify-between items-center pb-2">
              <div className="h-14 w-14 bg-blue-100 flex justify-center items-center rounded-full shrink-0"></div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-md bg-blue-100 text-blue-600 md:hidden"
                aria-label="Close sidebar"
              >
                <ChevronLeft size={20} />
              </button>
            </div>

            {/* Navigation Placeholder */}
            <Navbar/>
          </div>

          {/* User Profile */}
            <div className="flex gap-2 items-center border-t pt-3 w-full   overflow-hidden">
              <div className="h-10 w-10 bg-blue-100 flex justify-center items-center rounded-full flex-shrink-0"><UserCircle/></div>
              <div>
                  <strong className="text-sm block">Emma Udeji</strong>
                  <small className="text-gray-500 text-[12px] ">emmaudeji23@gmail.com</small>
              </div>
            </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-screen md:pl-60 md:pr-4">
          {/* Header */}
          <header className="w-full overflow-hidden h-12 px-6 flex items-center justify-between">
            <div className="flex gap-2 items-center">
              <button
                onClick={() => setIsOpen(true)}
                className="md:hidden p-2 rounded-md bg-blue-100 text-blue-600"
                aria-label="Open sidebar"
              >
                <ChevronRight size={20} />
              </button>
              <Breadcrumb />
            </div>
            <div className="flex gap-1 items-center text-blue-400 text-sm">
              <Calendar size={16}/>
              <p>{date}</p>
            </div>
          </header>

          {/* Content Section */}
          <section className="bg-white flex-1 relative w-full border rounded-2xl py-8 px-3 md:px-6">
            <Outlet/>
          </section>

          {/* Footer */}
          <footer className="h-8 flex items-center justify-center text-center text-gray-600 text-sm">
            Copyright 2025. Expense Dashboard.
          </footer>
        </div>
      </main>
    </ExpenseProvider>
  );
};

export default DashboardLayout;
