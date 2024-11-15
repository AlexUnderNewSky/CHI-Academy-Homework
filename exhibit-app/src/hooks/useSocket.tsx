'use client';

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Snackbar, Alert } from "@mui/material";
import { axiosInstance } from "../api/axiosInstance";

const SOCKET_SERVER_URL = `${axiosInstance.defaults.baseURL}notifications`;

function NotificationComponent({ onNewPost }: { onNewPost: () => void }) {
  const [notifications, setNotifications] = useState<{
    data: string;
    user: string;
    imageUrl: string;
  }>({
    data: "",
    user: "",
    imageUrl: "",
  });

  const [open, setOpen] = useState(false);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL, {
      transports: ["websocket"],
      autoConnect: true,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 5000,
      extraHeaders: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    socket.on("newPost", (data) => {
      setNotifications({
        data: data.message,
        user: data.user,
        imageUrl: data.imageUrl,
      });
      setOpen(true);

      onNewPost();
    });

    return () => {
      socket.disconnect();
    };
  }, [onNewPost]);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity="info" sx={{ width: "100%" }}>
        {notifications.imageUrl}
        {notifications.user}: {notifications.data}
      </Alert>
    </Snackbar>
  );
}

export default NotificationComponent;
