import React, { useContext } from "react";
import Authenticate from "./Authenticate";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import { AuthContext } from "./context/AuthContext";

const App = () => {
  const { currentUser } = useContext(AuthContext);
  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />;
    }

    return children;
  };
  console.log(currentUser);
  return (
    <div className="bg-gradient-to-r from-gray-100 to-indigo-200 flex items-center justify-center flex-col min-h-screen">
      {/* <Authenticate /> */}
      {/* <Home /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route
              index
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route path="login" element={<Authenticate />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
