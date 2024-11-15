import React from "react";
import { ExhibitI } from "../../interfaces";
import ExhibitCardActionBar from "./ExhibitCardActionBar";
import { Card, CardMedia, Avatar, Typography, CardHeader } from "@mui/material";
import { format } from "date-fns";
import { red } from "@mui/material/colors";
import { axiosInstance } from "../api/axiosInstance";

const ExhibitCard: React.FC<ExhibitI> = ({
  user,
  description,
  imageUrl,
  commentCount,
  createdAt,
  id,
}) => {
  console.log(imageUrl);
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
      />
      <CardMedia
        component="img"
        height="200"
        sx={{ width: "50%", height: "auto", objectFit: "cover" }}
        image={`http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com${imageUrl}`}
        alt={description}
      />
      <Typography variant="subtitle1" fontWeight="bold" sx={{ ml: 1 }}>
        Image id: {id}
      </Typography>
      <Typography variant="subtitle1" fontWeight="bold">
        User id: {user.id}
      </Typography>
      <Typography variant="subtitle1" fontWeight="bold">
        User name: {user.username}
      </Typography>
      <Typography>
        <Typography component="span" sx={{ fontWeight: "bold" }}>
          Description:
        </Typography>{" "}
        {description}
      </Typography>
      <Typography>
        <Typography component="span" sx={{ fontWeight: "bold" }}>
          Comment count:
        </Typography>{" "}
        {commentCount}
      </Typography>
      <ExhibitCardActionBar userId={user.id} exhibitId={id} />
    </Card>
  );
};

export default ExhibitCard;
