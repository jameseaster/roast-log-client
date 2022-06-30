// Imports
import React from "react";
import { IAuthContext } from "./authTypes";

// Auth Default Context
export const AuthContext = React.createContext<IAuthContext>(null!);

// Create Auth Context
export const useAuthContext = () => React.useContext(AuthContext);
