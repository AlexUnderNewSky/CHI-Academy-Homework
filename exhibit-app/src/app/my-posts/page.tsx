'use client';

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { fetchUserPosts, removeExhibit } from "../../api/exhibitActions";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Button,
  Grid,
  Alert,
  CardMedia,
} from "@mui/material";
import { axiosInstance } from "../../api/axiosInstance";

// Определяем интерфейсы для типов данных
interface User {
  username: string;
}

interface Post {
  id: number;
  imageUrl: string;
  description: string;
  user: User;
}

const HomePage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]); // типизируем массив постов
  const [error, setError] = useState<string | null>(null); // типизируем ошибку
  const isAuthenticated = useSelector(
    (state: { auth: { isAuthenticated: boolean } }) => state.auth.isAuthenticated
  );

  useEffect(() => {
    if (isAuthenticated) {
      const loadUserPosts = async () => {
        try {
          const data = await fetchUserPosts();
          setPosts(data);
        } catch (error) {
            console.error(error);
            setError("Failed to fetch your posts");
          }
      };

      loadUserPosts();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return (
      <Typography variant="h6">Please log in to see your posts.</Typography>
    );
  }

  const handleRemove = async (id: number) => {
    try {
      await removeExhibit(id);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
        console.error(error);
        setError("Failed to fetch your posts");
      }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Posts
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card>
              <CardMedia
                component="img"
                image={`${axiosInstance.defaults.baseURL}${post.imageUrl}`}
                alt={post.description}
                sx={{ height: 140 }}
              />
              <CardContent>
                <Typography variant="body1">Post ID: {post.id}</Typography>
                <Typography variant="body1">{post.description}</Typography>
                <Typography variant="body1">
                  Username: {post.user.username}
                </Typography>
              </CardContent>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRemove(post.id)}
              >
                Remove
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default HomePage;
