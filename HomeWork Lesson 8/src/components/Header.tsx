import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Определяем, на какой странице находится пользователь
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  // Проверяем, авторизован ли пользователь
  const isAuthenticated = !!localStorage.getItem("token");

  // Функция для обработки клика по кнопке "Logout"
  const handleLogout = () => {
    localStorage.removeItem("token"); // Удаляем токен из локального хранилища
    navigate("/login"); // Перенаправляем на страницу входа
  };

  // Функция для обработки клика по кнопке "Login/Register"
  const handleAuthButtonClick = () => {
    if (isLoginPage) {
      navigate("/register");
    } else if (isRegisterPage) {
      navigate("/login");
    } else {
      navigate("/login"); // По умолчанию
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Button
              sx={{ mr: 8, color: "white" }}
              onClick={() => navigate("/")}
            >
              Main Page
            </Button>
            <Button
              sx={{ mr: 8, color: "white" }}
              onClick={() => navigate("/new-post")}
            >
              New Post
            </Button>
            Main Page for Instagram
          </Typography>

          {/* Условно отображаем кнопки на основе состояния авторизации */}
          {isAuthenticated ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" onClick={handleAuthButtonClick}>
              {isLoginPage ? "Register" : "Login"}
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
