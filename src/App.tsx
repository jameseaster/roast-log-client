// Imports
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuthContext } from "./context/AuthProvider";
import ProtectedRoute from "./components/ProtectedRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import TopNavigation from "./components/TopNavigation";

/**
 * App
 * Top level component
 */
function App() {
  const { user } = useAuthContext();
  return (
    <>
      <TopNavigation />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="login" element={<Login user={user} />} />
          <Route path="signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
