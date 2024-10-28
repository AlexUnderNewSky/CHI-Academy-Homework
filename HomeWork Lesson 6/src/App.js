import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Heroes from "./pages/Heroes";
import HeroDetails from "./pages/HeroDetails";
import About from "./pages/About";
import { CssBaseline, createTheme, ThemeProvider } from "@mui/material";
import ThemeSwitcher from "./components/ThemeSwitcher";

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar darkMode={darkMode} />
        <ThemeSwitcher darkMode={darkMode} setDarkMode={setDarkMode} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/heroes" element={<Heroes darkMode={darkMode} />} /> 
          <Route path="/heroes/:id" element={<HeroDetails />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
