"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Box, Typography, Grid, Card, CardContent, Button, CardHeader, Avatar, IconButton, Tooltip, Divider, CardMedia } from "@mui/material";
import { format } from "date-fns";
import { red } from "@mui/material/colors";
import DeleteIcon from "@mui/icons-material/Delete";
import { fetchUserPosts, removeExhibit } from "../../api/exhibitActions";
import { getUserProfile } from "../../api/userActions"; 

interface Post {
  id: number;
  imageUrl: string;
  description: string;
  user: { id: number; username: string };
  commentCount: number;
  createdAt: string;
}

const MyPostsPage: React.FC = () => {
  const router = useRouter();
  const [posts, setPosts] = useState<Post[]>([]);
  const [user, setUser] = useState<{ id: number; username: string } | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);

      getUserProfile()
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => {
          console.error("Failed to fetch user data:", error);
          setUser(null);
        });
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated && user) {
      fetchUserPosts()
        .then((data) => setPosts(data))
        .catch((error) => console.error("Failed to fetch posts:", error));
    }
  }, [isAuthenticated, user]);

  const handleRemove = async (postId: number) => {
    try {
      await removeExhibit(postId);
      setPosts(posts.filter((post) => post.id !== postId)); // Обновляем список постов
    } catch (error) {
      console.error("Failed to remove post:", error);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        My Posts
      </Typography>
      <Grid container spacing={2}>
        {posts.map((post) => (
          <Grid item xs={12} sm={6} md={4} key={post.id}>
            <Card sx={{ maxWidth: 800, margin: "auto", mt: 3, borderRadius: 4, boxShadow: 3 }}>
              <CardHeader
                avatar={<Avatar sx={{ bgcolor: red[500] }}>{post.user.username[0]}</Avatar>}
                title={<Typography variant="h6">{post.user.username}</Typography>}
                subheader={format(new Date(post.createdAt), "dd.MM.yyyy HH:mm:ss")}
                action={
                  user?.id === post.user.id && (
                    <Tooltip title="Remove Post" arrow>
                      <IconButton
                        onClick={() => handleRemove(post.id)}
                        color="error"
                        sx={{
                          padding: 1,
                          "&:hover": { backgroundColor: red[100] },
                          "&:active": { backgroundColor: red[200] },
                          borderRadius: "50%",
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  )
                }
              />

              <Box sx={{ display: "flex", justifyContent: "center", overflow: "hidden" }}>
                <CardMedia
                  component="img"
                  sx={{ maxHeight: 400, width: "100%", objectFit: "cover", borderRadius: 2 }}
                  image={`http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com${post.imageUrl}`}
                  alt={post.description}
                />
              </Box>

              <CardContent>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Description:</strong> {post.description}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Box>
                  <Typography variant="body2" color="text.secondary">
                    <strong>Image ID:</strong> {post.id}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                    <strong>Comments:</strong> {post.commentCount}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default MyPostsPage;
