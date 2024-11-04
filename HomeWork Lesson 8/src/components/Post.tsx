import React from "react";
import { axiosInstance } from "../api/axiosInstance"; // Убедитесь, что BASE_URL правильно экспортируется
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

interface PostProps {
  id: number;
  imageUrl: string; // Предполагается, что imageUrl начинается с "/uploads/...".
  description: string;
  username: string;
  userid: number;
  commentCount: number;
}

const Post: React.FC<PostProps> = ({
  id,
  imageUrl,
  description,
  username,
  userid,
  commentCount,
}) => {
  return (
    <Card sx={{ margin: 2, borderRadius: 2, boxShadow: 2 }}>
      <Typography variant="subtitle1" fontWeight="bold" sx={{ ml: 1 }}>
        Image id: {id}
      </Typography>
      <CardMedia
        component="img"
        height="200"
        sx={{ width: "50%", height: "auto", objectFit: "cover" }}
        image={`${axiosInstance.defaults.baseURL}${imageUrl}`}
        alt={description}
      />
      <CardContent>
        <Typography variant="subtitle1" fontWeight="bold">
          User id: {userid}
        </Typography>
        <Typography variant="subtitle1" fontWeight="bold">
          User name: {username}
        </Typography>
        <Typography>
          <Typography component="span" sx={{ fontWeight: "bold" }}>
            Description:
          </Typography>{" "}
          {description}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <Typography component="span" sx={{ fontWeight: "bold" }}>
            {commentCount}
          </Typography>{" "}
          Comments
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Post;
