import React from "react";
import { ExhibitI } from "../../interfaces";
import ExhibitCardActionBar from "./ExhibitCardActionBar";
import { Card, CardMedia, Avatar, Typography, CardHeader, CardContent, Divider, Box } from "@mui/material";
import { format } from "date-fns";
import { red } from "@mui/material/colors";
import DeleteExhibitButton from './DeleteExhibitButton';

const ExhibitCard: React.FC<ExhibitI> = ({
  user,
  description,
  imageUrl,
  commentCount,
  createdAt,
  id,
}) => {
  return (
    <Card sx={{ maxWidth: 800, margin: "auto", mt: 3, borderRadius: 4, boxShadow: 3 }}>
      {/* Card Header */}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="user-avatar">
            {user.username[0].toUpperCase()}
          </Avatar>
        }
        title={
          <Typography variant="h6" fontWeight="bold">
            {user.username} (ID: {user.id})
          </Typography>
        }
        subheader={
          <Typography variant="body2" color="text.secondary">
            {format(new Date(createdAt), "dd.MM.yyyy HH:mm:ss")}
          </Typography>
        }
        action={
          user.id && (
            <DeleteExhibitButton exhibitId={id} ownerId={user.id} />
          )
        }
      />

      {/* Media Section */}
      <Box sx={{ display: "flex", justifyContent: "center", overflow: "hidden" }}>
        <CardMedia
          component="img"
          sx={{
            maxHeight: 400,
            width: "100%",
            objectFit: "cover",
            borderRadius: 2,
          }}
          image={`http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com${imageUrl}`}
          alt={description}
        />
      </Box>

      {/* Card Content */}
      <CardContent>
        <Typography variant="body1" sx={{ mb: 1 }}>
          <strong>Description:</strong> {description}
        </Typography>

        <Divider sx={{ my: 2 }} />

        {/* Image and Comment Details */}
        <Box>
          <Typography variant="body2" color="text.secondary">
            <strong>Image ID:</strong> {id}
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            <strong>Comments:</strong> {commentCount}
          </Typography>
        </Box>
      </CardContent>

      {/* Action Bar */}
      <ExhibitCardActionBar exhibitId={id} />
    </Card>
  );
};

export default ExhibitCard;