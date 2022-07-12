// Imports
import React from "react";
import { IAuthContext } from "types/auth";

// Auth Default Context
export const AuthContext = React.createContext<IAuthContext>(null!);

// Create Auth Context
export const useAuthContext = () => React.useContext(AuthContext);
