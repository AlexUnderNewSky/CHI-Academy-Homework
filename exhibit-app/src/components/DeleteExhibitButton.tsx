"use client";

import React, { useState, useEffect } from "react";
import { IconButton, Tooltip } from "@mui/material";
import { red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeExhibit } from "../api/exhibitActions";
import { getUserProfile } from "../api/userActions"; 

interface DeleteExhibitButtonProps {
  exhibitId: number;
  ownerId: number; 
}

const DeleteExhibitButton: React.FC<DeleteExhibitButtonProps> = ({ exhibitId, ownerId }) => {
  const [userId, setUserId] = useState<number | null>(null); // Состояние для хранения ID текущего пользователя
  const [isClient, setIsClient] = useState(false); // Флаг для проверки, что компонент отрендерен на клиенте

 
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const user = await getUserProfile(); 
        setUserId(user.id); 
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchUserProfile(); 
    setIsClient(true); 
  }, []);

  const handleRemoveExhibit = async () => {
    try {
      await removeExhibit(exhibitId);
      window.location.reload(); 
    } catch (error) {
      console.error("Failed to remove exhibit:", error);
    }
  };

  
  if (!isClient || userId !== ownerId) {
    return null; 
  }

  return (
    <Tooltip title="Remove Exhibit" arrow>
      <IconButton
        onClick={handleRemoveExhibit}
        color="error"
        sx={{
          padding: 1,
          "&:hover": {
            backgroundColor: red[100],
          },
          "&:active": {
            backgroundColor: red[200],
          },
          borderRadius: "50%",
        }}
      >
        <DeleteIcon sx={{ fontSize: 24 }} />
      </IconButton>
    </Tooltip>
  );
};

export default DeleteExhibitButton;
