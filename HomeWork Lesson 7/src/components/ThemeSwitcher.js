import React from "react";
import { Switch, FormControlLabel } from "@mui/material";

const ThemeSwitcher = ({ darkMode, setDarkMode }) => (
  <FormControlLabel
    control={<Switch checked={darkMode} onChange={() => setDarkMode(!darkMode)} />}
    label="Dark Mode"
    sx={{ position: "absolute", top: 16, right: 16 }}
  />
);

export default ThemeSwitcher;
