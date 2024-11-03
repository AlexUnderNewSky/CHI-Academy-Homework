import React from "react";
import { BASE_URL } from "../api/axiosInstance"; // Убедитесь, что BASE_URL правильно экспортируется
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

interface PostProps {
  id: number;
  imageUrl: string; // Предполагается, что imageUrl начинается с "/uploads/...".
  description: string;
  username: string;
  commentCount: number;
}

const Post: React.FC<PostProps> = ({
  id,
  imageUrl,
  description,
  username,
  commentCount,
}) => {
  // Убираем "/uploads/" или "/static/" из imageUrl
  const cleanImageUrl = imageUrl
    .replace(/^\/uploads\//, "")
    .replace(/^\/static\//, "");

  return (
    <Card sx={{ margin: 2, borderRadius: 2, boxShadow: 2 }}>
      <CardMedia
        component="img"
        height="200"
        sx={{ width: "50%", height: "auto", objectFit: "cover" }}
        image={`${BASE_URL}/api/exhibits/static/%2Fuploads%2F${cleanImageUrl}`}
        alt={description}
      />
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold">
          {username}
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {commentCount} Comments
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
