import React, { useState } from "react";
import { ExhibitI } from "../interfaces";
import ExhibitCardActionBar from "./ExhibitCardActionBar";
import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Avatar,
  Typography,
  Button,
  Box,
  Tooltip,
  IconButton,
} from "@mui/material";
import { format } from "date-fns";
import { red } from "@mui/material/colors";
import { axiosInstance } from "../api/axiosInstance";
import { removeExhibit } from "../api/exhibitActions";
import { useUserProfile } from "../hooks/useUserProfile";
import { Delete as DeleteIcon } from "@mui/icons-material";

const ExhibitCard: React.FC<ExhibitI> = ({
  user,
  description,
  imageUrl,
  createdAt,
  id,
}) => {
  const { userProfile } = useUserProfile();
  const handleRemoveExhibit = async (exhibitId: number) => {
    await removeExhibit(exhibitId);
    window.location.reload();
  };

  // console.log(id);

  return (
    <Card sx={{ maxWidth: 800, margin: "auto", mt: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {user.username[0].toUpperCase()}
          </Avatar>
        }
        title={`${user.username} (ID: ${user.id})`}
        subheader={format(new Date(createdAt), "dd.MM.yyyy HH:mm:ss")}
        action={
          userProfile?.id === user.id && (
            <Tooltip title="Remove Exhibit" arrow>
              <IconButton
                onClick={() => handleRemoveExhibit(id)}
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
          )
        }
      />
      <CardMedia
        component="img"
        image={axiosInstance.defaults.baseURL + imageUrl}
        alt={description}
      />
      <CardContent>
        <Typography variant="body2">Card ID: {id}</Typography>
        <Typography variant="body1">Description: {description}</Typography>
      </CardContent>

      {/* Компонент для отображения и управления комментариями */}
      <ExhibitCardActionBar userId={user.id} exhibitId={id} />
    </Card>
  );
};

export default ExhibitCard;
