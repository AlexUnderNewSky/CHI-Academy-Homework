import React, { useEffect, useState } from "react";
import { fetchExhibits, removeExhibit } from "../api/exhibitActions";
import {
  fetchComments,
  deleteComment,
  addComment,
} from "../api/commentActions";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
  IconButton,
  Collapse,
  Divider,
  TextField,
} from "@mui/material";
import {
  ExpandMore,
  ExpandLess,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { axiosInstance } from "../api/axiosInstance";

interface Exhibit {
  id: string;
  imageUrl: string;
  description: string;
  user: { id: string; username: string };
  createdAt: string;
}

interface Comment {
  id: string;
  text: string;
  user: { id: string; username: string };
}

const ExhibitList: React.FC = () => {
  const [exhibits, setExhibits] = useState<Exhibit[]>([]);
  const [user, setUser] = useState<{ id: string; username: string } | null>(
    null
  ); // Храним информацию о пользователе
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [expandedComments, setExpandedComments] = useState<
    Record<string, boolean>
  >({});
  const [commentsMap, setCommentsMap] = useState<Record<string, Comment[]>>({});
  const [newComment, setNewComment] = useState<string>("");

  const token = localStorage.getItem("token"); // Получаем токен из хранилища (или другого места)

  const loadUserData = async () => {
    if (!token) return;
    try {
      const response = await fetch(
        "http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com/users/my-profile",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "*/*",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to fetch user data");
      }

      const data = await response.json();
      setUser(data); // Сохраняем информацию о пользователе
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  const loadExhibits = async (page: number) => {
    try {
      const { data, lastPage } = await fetchExhibits(page);
      setExhibits(data);
      setLastPage(lastPage);

      // Fetch comments for each exhibit
      const commentsFetches = data.map((exhibit: Exhibit) =>
        fetchComments(exhibit.id).then((comments) => ({
          exhibitId: exhibit.id,
          comments,
        }))
      );

      const commentsResults = await Promise.all(commentsFetches);
      const commentsData = commentsResults.reduce(
        (acc, { exhibitId, comments }) => {
          acc[exhibitId] = comments;
          return acc;
        },
        {} as Record<string, Comment[]>
      );

      setCommentsMap(commentsData);
    } catch (error) {
      console.error("Error fetching exhibits:", error);
      setError("Failed to fetch exhibits");
    }
  };

  useEffect(() => {
    loadUserData(); // Загружаем данные о пользователе
    loadExhibits(currentPage); // Загружаем выставки
  }, [currentPage]);

  const toggleComments = (exhibitId: string) => {
    setExpandedComments((prevState) => ({
      ...prevState,
      [exhibitId]: !prevState[exhibitId],
    }));
  };

  const handleDeleteComment = async (exhibitId: string, commentId: string) => {
    try {
      await deleteComment(exhibitId, commentId);
      setCommentsMap((prevCommentsMap) => ({
        ...prevCommentsMap,
        [exhibitId]: prevCommentsMap[exhibitId].filter(
          (comment) => comment.id !== commentId
        ),
      }));
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };

  const handleAddComment = async (exhibitId: string) => {
    if (!newComment.trim()) return; // Don't allow empty comments
    try {
      const comment = await addComment(exhibitId, newComment);
      setCommentsMap((prevCommentsMap) => ({
        ...prevCommentsMap,
        [exhibitId]: [...(prevCommentsMap[exhibitId] || []), comment],
      }));
      setNewComment(""); // Clear input field after submitting
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Exhibit List
      </Typography>
      {error && <Typography color="error">{error}</Typography>}

      {/* Pagination Controls */}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Button
          variant="contained"
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <Typography sx={{ padding: 2 }}>
          Page {currentPage} of {lastPage}
        </Typography>
        <Button
          variant="contained"
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, lastPage))}
          disabled={currentPage === lastPage}
        >
          Next
        </Button>
      </Box>

      <Grid container direction="column" spacing={2}>
        {exhibits.map((exhibit) => (
          <Grid item key={exhibit.id}>
            <Card sx={{ maxWidth: 800, margin: "0 auto", padding: 2 }}>
              <CardMedia
                component="img"
                image={`${axiosInstance.defaults.baseURL}${exhibit.imageUrl}`}
                alt={exhibit.description}
                sx={{ height: 300, width: "100%", objectFit: "cover" }}
              />
              <CardContent>
                <Typography variant="body2">Image ID: {exhibit.id}</Typography>
                <Typography variant="h6">{exhibit.description}</Typography>
                <Typography variant="body2">
                  By {exhibit.user.username}
                </Typography>
                <Typography variant="body2">
                  Created at: {new Date(exhibit.createdAt).toLocaleString()}
                </Typography>
                <Typography variant="body2">
                  User ID: {exhibit.user.id}
                </Typography>
              </CardContent>

              {/* Toggle Comments Section */}
              <CardActions>
                <Button
                  onClick={() => toggleComments(exhibit.id)}
                  startIcon={
                    expandedComments[exhibit.id] ? (
                      <ExpandLess />
                    ) : (
                      <ExpandMore />
                    )
                  }
                >
                  {expandedComments[exhibit.id]
                    ? "Hide Comments"
                    : "Show Comments"}
                </Button>

                {/* Show "Remove" button if current user is exhibit owner */}
                {user && user.id === exhibit.user.id && (
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => removeExhibit(exhibit.id)}
                  >
                    Remove Exhibit
                  </Button>
                )}
              </CardActions>

              {/* Comments Section */}
              <Collapse
                in={expandedComments[exhibit.id]}
                timeout="auto"
                unmountOnExit
              >
                <Divider />
                <Box sx={{ padding: 2 }}>
                  <Typography variant="subtitle1">Comments:</Typography>
                  <TextField
                    label="Write a comment"
                    variant="outlined"
                    fullWidth
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    sx={{ marginBottom: 2 }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddComment(exhibit.id)}
                    sx={{ marginBottom: 2 }}
                  >
                    Add Comment
                  </Button>

                  {commentsMap[exhibit.id]?.length ? (
                    commentsMap[exhibit.id].map((comment) => (
                      <Box
                        key={comment.id}
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          paddingY: 1,
                        }}
                      >
                        <Typography variant="body2" color="text.secondary">
                          <strong>{comment.user.username}:</strong>{" "}
                          {comment.text}
                        </Typography>
                        {/* Only show delete button if the current user is the comment author */}
                        {user && user.id === comment.user.id && (
                          <IconButton
                            color="error"
                            onClick={() =>
                              handleDeleteComment(exhibit.id, comment.id)
                            }
                          >
                            <DeleteIcon />
                          </IconButton>
                        )}
                      </Box>
                    ))
                  ) : (
                    <Typography variant="body2" color="text.secondary">
                      No comments yet.
                    </Typography>
                  )}
                </Box>
              </Collapse>
            </Card>
          </Grid>
        ))}
        {/* Pagination Controls */}
        <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
          <Button
            variant="contained"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Typography sx={{ padding: 2 }}>
            Page {currentPage} of {lastPage}
          </Typography>
          <Button
            variant="contained"
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, lastPage))
            }
            disabled={currentPage === lastPage}
          >
            Next
          </Button>
        </Box>
      </Grid>
    </Box>
  );
};

export default ExhibitList;
