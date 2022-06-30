// Imports
import Home from "pages/Home";
import Signin from "pages/Signin";
import Register from "pages/Register";
import AppBar from "components/AppBar";
import { useAuthContext } from "state/authContext";
import ProtectedRoute from "components/ProtectedRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";

/**
 * App - top level component
 */
function App() {
  // Auth
  const { user } = useAuthContext();

  return (
    <>
      <AppBar user={user} />
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
          <Route path="register" element={<Register />} />
          <Route path="signin" element={<Signin user={user} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
