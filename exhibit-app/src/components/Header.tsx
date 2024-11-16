// src/components/Header.tsx
'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Для навигации
import Link from "next/link";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const Header: React.FC = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);

  // Проверка токена и получение пользователя
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  // Обработчик выхода
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    setUser(null);
    router.push("/login");
  };

  return (
    <AppBar position="fixed" sx={{ top: 0, left: 0, right: 0 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Instagram Clone
        </Typography>

        {isAuthenticated && (
          <>
            <Button
              sx={{ mx: 3, color: "white" }}
              component={Link}
              href="/my-posts"
            >
              My Posts
            </Button>
            <Button
              sx={{ mr: 3, color: "white" }}
              component={Link}
              href="/upload-post"
            >
              <AddIcon />
            </Button>
          </>
        )}

        <Button color="inherit" component={Link} href="/exhibits">
          Home
        </Button>

        {isAuthenticated ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" onClick={() => router.push("/login")}>
            Login
          </Button>
        )}

        {/* Информация о пользователе */}
        {isAuthenticated && user && (
          <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
            <Typography variant="body2" color="inherit">
              Welcome, {user.username} (ID: {user.id})
            </Typography>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
