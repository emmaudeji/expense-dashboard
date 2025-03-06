import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-9xl font-bold text-gray-800">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mt-4">Oops! Page not found</h2>
      <p className="text-gray-500 mt-2 text-center">
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        to="/"
        className="mt-6 px-6 py-3 text-white bg-blue-600 hover:bg-blue-700 transition rounded-lg shadow-md"
      >
        Go Home
      </Link>
    </div>
  );
};

export default NotFound;
