import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAdmin = false, component }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  if (loading) {
    console.log("Loading......");
    return null;
  }
  console.log(isAuthenticated);

  const isNotOk =
    !isAuthenticated || (isAdmin === true && user.role !== "admin");
  console.log(isNotOk);

  return isNotOk ? <Navigate to="/login" /> : component;
};

export default ProtectedRoute;
