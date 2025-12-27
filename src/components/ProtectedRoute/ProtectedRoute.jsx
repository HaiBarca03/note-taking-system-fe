// src/components/ProtectedRoute/ProtectedRoute.jsx
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ children, requireAdmin = false }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  // Chưa login
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Nếu sau này có isAdmin thì check ở đây
  // if (requireAdmin && !isAdmin) {
  //   return <Navigate to="/unauthorized" replace />;
  // }

  return children;
};

export default ProtectedRoute;
