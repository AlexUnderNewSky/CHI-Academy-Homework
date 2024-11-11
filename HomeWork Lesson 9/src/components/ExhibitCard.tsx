import React from "react";
import { ExhibitI } from "../interfaces";
import ExhibitCardActionBar from "./ExhibitCardActionBar";
import { Card, CardContent, CardHeader, CardMedia, Avatar, Typography } from "@mui/material";
import { format } from "date-fns";
import { red } from "@mui/material/colors";
import { axiosInstance } from "../api/axiosInstance";

const ExhibitCard: React.FC<ExhibitI> = ({ user, description, imageUrl, createdAt, id }) => {
  return (
    <Card sx={{ maxWidth: 800, margin: "auto", mt: 2 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {user.username[0].toUpperCase()}
          </Avatar>
        }
        title={user.username}
        subheader={format(new Date(createdAt), "dd.MM.yyyy HH:mm:ss")}
      />
      <CardMedia
        component="img"
        image={axiosInstance.defaults.baseURL + imageUrl}
        alt={description}
      />
      <CardContent>
        <Typography variant="body1">Description: {description}</Typography>
      </CardContent>

      {/* Компонент для отображения и управления комментариями */}
      <ExhibitCardActionBar userId={user.id} exhibitId={id} />
    </Card>
  );
};

export default ExhibitCard;
