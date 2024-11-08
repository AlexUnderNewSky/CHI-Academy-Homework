// Header.tsx
import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/userSlice";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("token");

  const handleAuthButtonClick = () => {
    const targetRoute = location.pathname === "/login" ? "/register" : "/login";
    navigate(targetRoute);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu">
          <MenuIcon />
        </IconButton>
        <Button
              sx={{ mr: 8, color: "white" }}
              onClick={() => navigate("/new-post")}
            >
              New Post
            </Button>
            <Button
              sx={{ mr: 8, color: "white" }}
              onClick={() => navigate("/home")}
            >
              My Post
            </Button>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>Instagram Clone</Typography>
        <Button color="inherit" onClick={() => navigate("/")}>Home</Button>
        {isAuthenticated ? (
          <Button color="inherit" onClick={() => { dispatch(logout()); navigate("/login"); }}>Logout</Button>
        ) : (
          <Button color="inherit" onClick={handleAuthButtonClick}>
            {location.pathname === "/login" ? "Register" : "Login"}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
