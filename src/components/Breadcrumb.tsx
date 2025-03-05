import { Link, useLocation } from "react-router-dom";
import { Home, ChevronRight } from "lucide-react";

const Breadcrumb = () => {
  const location = useLocation();
  const paths = location.pathname.split("/").filter(Boolean); // Remove empty segments

  return (
    <nav className="flex items-center gap-2 text-gray-600 text-sm">
      {/* Home Icon Link */}
      <Link to="/" className="flex items-center gap-1 text-blue-600 hover:text-blue-800">
        <Home size={18} />
      </Link>

      {paths.map((segment, index) => {
        const fullPath = `/${paths.slice(0, index + 1).join("/")}`;
        const isLast = index === paths.length - 1;

        return (
          <div key={fullPath} className="flex items-center gap-2">
            <ChevronRight size={16} className="text-gray-400" />
            {isLast ? (
              <span className="text-gray-900 font-medium capitalize">{decodeURIComponent(segment)}</span>
            ) : (
              <Link to={fullPath} className="text-blue-600 hover:text-blue-800 capitalize">
                {decodeURIComponent(segment)}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
