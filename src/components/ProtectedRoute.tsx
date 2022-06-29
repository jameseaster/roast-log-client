// Imports
import React from "react";
import { Navigate } from "react-router-dom";

// Types
interface IProtectedRoute {
  user: string;
  children: React.ReactNode;
}

/**
 * ProtectedRoute - Navigates to login if there is no user
 */
const ProtectedRoute = ({ user, children }: IProtectedRoute) => {
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
