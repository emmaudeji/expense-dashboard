import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const isAuthenticated =  true // !!localStorage.getItem("authToken");  
  return isAuthenticated ? <Outlet/> : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;
