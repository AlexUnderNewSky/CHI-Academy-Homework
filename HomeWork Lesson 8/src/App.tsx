import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./layouts/LoginPage";
import RegisterPage from "./layouts/RegisterPage";
import StripPage from "./layouts/StripPage";
import Header from "./components/Header";
import UploadExhibit from "./layouts/UploadPosts";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  const isAuthenticated = useSelector(
    (state: any) => state.auth.isAuthenticated
  );

  return (
    <Router>
      <Header />
      <Routes>
        <Route
          path="/login"
          element={
            <ProtectedRoute requiresAuth={false}>
              <LoginPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/register"
          element={
            <ProtectedRoute requiresAuth={false}>
              <RegisterPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={
            <ProtectedRoute requiresAuth={true}>
              <StripPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/new-post"
          element={
            <ProtectedRoute requiresAuth={true}>
              <UploadExhibit />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
