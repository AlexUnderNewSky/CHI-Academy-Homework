"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { getUserProfile } from "../api/userActions";

const Header: React.FC = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<{ id: number; username: string } | null>(
    null
  );

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      setIsAuthenticated(true);

      getUserProfile()
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => {
          console.error("Failed to fetch user data:", error);
          setUser(null);
        });
    }
  }, []);

  // Обработчик выхода
  const handleLogout = () => {
    localStorage.removeItem("token");
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

        {/* Если пользователь авторизован, показываем его имя и id */}
        {isAuthenticated && user && (
          <Box sx={{ display: "flex", alignItems: "center", color: "white" }}>
            <Typography variant="body2" sx={{ marginRight: 2 }}>
              Welcome, {user.username} (ID: {user.id})
            </Typography>
          </Box>
        )}

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
      </Toolbar>
    </AppBar>
  );
};

export default Header;
