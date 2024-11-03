import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./layouts/LoginPage"; // Обновите путь в зависимости от вашей структуры папок
import RegisterPage from "./layouts/RegisterPage";

const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        {/* Добавьте другие маршруты здесь */}
      </Routes>
    </Router>
  );
};

export default App;
