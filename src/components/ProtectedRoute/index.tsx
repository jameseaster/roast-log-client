// Imports
import { IProtectedRoute } from "./types";
import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute - Navigates to sign in page if user is not authenticated
 */
const ProtectedRoute = ({ user, children }: IProtectedRoute) => {
  if (!user) {
    return <Navigate to="/signin" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
