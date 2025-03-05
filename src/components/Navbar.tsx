import { Link, useLocation } from "react-router-dom";

const navLinks = [
  { label: "Expenses", path: "/expenses" },
  { label: "Summary", path: "/summary" },
  // { label: "Add Expense", path: "/add-expense" },
];

const Navbar = () => {
  const location = useLocation(); // Get current route path

  return (
    <nav>
      <ul className="flex flex-col gap-3">
        {navLinks.map(({ label, path }) => (
          <li key={path}>
            <Link
              to={path}
              className={`hover:text-blue-400 px-3 py-2 rounded ${
                location.pathname === path ? "bg-blue-500 text-white" : ""
              }`}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
