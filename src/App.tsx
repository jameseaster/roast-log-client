// Imports
import Signin from "pages/Signin";
import Tabs from "components/Tabs";
import NewLog from "pages/NewLog";
import History from "pages/History";
import Dashboard from "pages/Dashboard";
import Register from "pages/Register";
import AppBar from "components/AppBar";
import { useAuthContext } from "state/authContext";
import ProtectedRoute from "components/ProtectedRoute";
import { BrowserRouter, Route, Routes } from "react-router-dom";

// Pages and their tab title
const pages = [
  { tabTitle: "Dashboard", renderPage: () => <Dashboard /> },
  { tabTitle: "New Log", renderPage: () => <NewLog /> },
  { tabTitle: "History", renderPage: () => <History /> },
];

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
          <Route path="signin" element={<Signin user={user} />} />
          <Route path="register" element={<Register />} />
          <Route
            path="/"
            element={
              <ProtectedRoute user={user}>
                <Tabs pages={pages} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
