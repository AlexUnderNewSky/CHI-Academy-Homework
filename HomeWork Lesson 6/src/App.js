import React, { useState, useMemo } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Heroes from "./pages/Heroes";
import HeroDetails from "./pages/HeroDetails";
import About from "./pages/About";
import {
  CssBaseline,
  createTheme,
  ThemeProvider,
  Drawer,
  Box,
} from "@mui/material";
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

  const location = useLocation();
  const navigate = useNavigate();


  const isHeroDetailRoute = location.pathname.startsWith("/heroes/");

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar darkMode={darkMode} />
      <ThemeSwitcher darkMode={darkMode} setDarkMode={setDarkMode} />

      <Box display="flex">
        <Box sx={{ flexGrow: 1, padding: "20px" }}>
          <Routes
            location={isHeroDetailRoute ? { pathname: "/heroes" } : location}
          >
            <Route path="/" element={<Home />} />
            <Route path="/heroes" element={<Heroes darkMode={darkMode} />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Box>

        <Drawer
          anchor="right"
          open={isHeroDetailRoute}
          onClose={() => navigate(-1)}
          variant="temporary"
          sx={{
            "& .MuiDrawer-paper": {
              width: "345px",
              boxSizing: "border-box",
              padding: "20px",
            },
          }}
        >
          {isHeroDetailRoute && (
            <Routes>
              <Route path="/heroes/:id" element={<HeroDetails />} />
            </Routes>
          )}
        </Drawer>
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
