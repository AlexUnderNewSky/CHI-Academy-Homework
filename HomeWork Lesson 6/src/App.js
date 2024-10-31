import React, { useState, useMemo } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Heroes from "./pages/Heroes";
import About from "./pages/About";
import { CssBaseline, createTheme, ThemeProvider, Box } from "@mui/material";
import ThemeSwitcher from "./components/ThemeSwitcher";
import HeroDetails from "./components/HeroDetails";

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
      <Navbar darkMode={darkMode} />
      <ThemeSwitcher darkMode={darkMode} setDarkMode={setDarkMode} />
      <Box display="flex">
        <Box sx={{ flexGrow: 1, padding: "20px" }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/heroes" element={<Heroes darkMode={darkMode} />}>
              {/* ВЛОЖИЛ МАРШРУТ */}
              <Route path=":id" element={<HeroDetails />} />
            </Route>
            <Route path="/about" element={<About />} />
          </Routes>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

const MainApp = () => (
  <Router>
    <App />
  </Router>
);

export default MainApp;
