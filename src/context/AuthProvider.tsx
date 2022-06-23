import {
  createContext,
  useState,
  useContext,
  Dispatch,
  SetStateAction,
} from "react";

interface IAuthContext {
  auth: {
    loggedIn: boolean;
    email: string;
  };
  setAuth: Dispatch<SetStateAction<{ email: string; loggedIn: boolean }>>;
}

const AuthContext = createContext<IAuthContext>({
  auth: { email: "", loggedIn: false },
  setAuth: () => {},
});

type Props = {
  children: React.ReactNode | React.ReactNode[];
};

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: Props) => {
  const [auth, setAuth] = useState({ email: "", loggedIn: false });

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};
