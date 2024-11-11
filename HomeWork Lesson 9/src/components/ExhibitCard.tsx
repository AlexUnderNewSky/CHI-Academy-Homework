import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { ExhibitI } from "../interfaces";
import { format } from "date-fns";
import ExhibitCardActionBar from "./ExhibitCardActionBar";
import { Card, CardContent, CardHeader, CardMedia } from "@mui/material";
import React from "react";
import { axiosInstance } from "../api/axiosInstance";
import CommentStripe from "./CommentStripe"; // Импортируем компонент для комментариев

const ExhibitCard: React.FC<ExhibitI> = ({
  user,
  description,
  imageUrl,
  createdAt,
  id,
}) => {
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

      {/* Pass CommentStripe as a child of ExhibitCardActionBar */}
      <ExhibitCardActionBar userId={user.id} exhibitId={id}>
       
      </ExhibitCardActionBar>
    </Card>
  );
};

export default ExhibitCard;
