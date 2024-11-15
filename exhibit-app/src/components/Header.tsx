'use client';

import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
} from "@mui/material";
import { useDispatch } from "react-redux";
import { logout } from "../store/slices/userSlice";
import { useUserProfile } from "../hooks/useUserProfile";
import AddIcon from "@mui/icons-material/Add";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem("token");

  const { userProfile, loading } = useUserProfile();

  const handleAuthButtonClick = () => {
    const targetRoute = location.pathname === "/login" ? "/register" : "/login";
    navigate(targetRoute);
  };

  return (
    <>
      <AppBar position="fixed" sx={{ top: 0, left: 0, right: 0 }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu"></IconButton>

          {isAuthenticated && (
            <>
              <Button
                sx={{ mx: 3, color: "white" }}
                onClick={() => navigate("/my-posts")}
              >
                My Posts
              </Button>
              <Button
                sx={{ mr: 30, color: "white" }}
                onClick={() => navigate("/new-post")}
              >
                <AddIcon />
              </Button>
            </>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Instagram Clone
          </Typography>

          {/* Если пользователь авторизован, показываем его имя и id */}
          {isAuthenticated && !loading && userProfile && (
            <Box sx={{ display: "flex", alignItems: "center", color: "white" }}>
              <Typography variant="body2" sx={{ marginRight: 2 }}>
                Welcome, {userProfile.username} (ID: {userProfile.id})
              </Typography>
            </Box>
          )}

          <Button color="inherit" onClick={() => navigate("/")}>
            Home
          </Button>
          {isAuthenticated ? (
            <Button
              color="inherit"
              onClick={() => {
                dispatch(logout());
                navigate("/login");
              }}
            >
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={handleAuthButtonClick}>
              {location.pathname === "/login" ? "Register" : "Login"}
            </Button>
          )}
        </Toolbar>
      </AppBar>

      <Box sx={{ paddingTop: "64px" }} />
    </>
  );
};

export default Header;
