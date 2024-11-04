import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./layouts/LoginPage";
import RegisterPage from "./layouts/RegisterPage";
import ExhibitPage from "./layouts/ExhibitPage";
import Header from "./components/Header";
import UploadExhibit from "./layouts/UploadPosts";

const App: React.FC = () => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/" element={<ExhibitPage />} />
        <Route path="/new-post" element={<UploadExhibit />} />
      </Routes>
    </Router>
  );
};

export default App;
