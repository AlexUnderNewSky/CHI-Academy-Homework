import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoginPage from "./layouts/LoginPage";
import RegisterPage from "./layouts/RegisterPage";
import StipePage from "./layouts/StipePage";
import Header from "./components/Header";
import NewPost from "./layouts/NewPost";
import ExhibitList from "./layouts/RemovePosts";

const App: React.FC = (): JSX.Element => {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<StipePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/new-post" element={<NewPost />} />
        <Route path="/remove-post" element={<ExhibitList />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
