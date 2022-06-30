// Imports
import React from "react";
import { Navigate } from "react-router-dom";

// Types
interface IProtectedRoute {
  user: string;
  children: React.ReactNode;
}

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
