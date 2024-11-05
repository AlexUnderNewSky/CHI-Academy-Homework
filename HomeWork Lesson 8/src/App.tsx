import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";
import LoginPage from "./layouts/LoginPage";
import RegisterPage from "./layouts/RegisterPage";
import StripPage from "./layouts/StripPage"; // Это, видимо, ваша главная страница
import Header from "./components/Header";
import UploadExhibit from "./layouts/UploadPosts";
import ProtectedRoute from "./components/ProtectedRoute";
import HomePage from "./layouts/HomePage"; // Импортируйте HomePage

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
        {/* Главная страница доступна для всех */}
        <Route
          path="/"
          element={<StripPage />} 
        />
        <Route
          path="/home"
          element={
            <ProtectedRoute requiresAuth={true}>
              <HomePage /> 
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
