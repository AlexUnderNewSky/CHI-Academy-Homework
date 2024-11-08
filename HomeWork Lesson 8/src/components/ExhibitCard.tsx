import React, { useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Collapse,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import {
  ExpandMore,
  ExpandLess,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { User, Exhibit, Comment } from "../types";
import { axiosInstance } from "../api/axiosInstance";

interface ExhibitCardProps {
  exhibit: Exhibit;
  user: User | null;
  onRemove: (id: string) => void;
  onAddComment: (exhibitId: string, comment: string) => void;
  onDeleteComment: (exhibitId: string, commentId: string) => void;
  commentsMap: Record<string, Comment[]>; 
}

const ExhibitCard: React.FC<ExhibitCardProps> = ({
  exhibit,
  user,
  onRemove,
  onAddComment,
  onDeleteComment,
  commentsMap,
}) => {
  const [expandedComments, setExpandedComments] = useState<Record<string, boolean>>({});
  const [newComment, setNewComment] = useState<string>("");

  const toggleComments = (exhibitId: string) => {
    setExpandedComments((prevState) => ({
      ...prevState,
      [exhibitId]: !prevState[exhibitId],
    }));
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return; 
    onAddComment(exhibit.id, newComment);
    setNewComment(""); 
  };

  // Удаление комментария
  const handleDeleteComment = (commentId: string) => {
    onDeleteComment(exhibit.id, commentId);
  };

  return (
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
          <Typography variant="body2">By {exhibit.user.username}</Typography>
          <Typography variant="body2">
            Created at: {new Date(exhibit.createdAt).toLocaleString()}
          </Typography>
        </CardContent>

        <CardActions>
          <Button onClick={() => toggleComments(exhibit.id)}>
            {expandedComments[exhibit.id] ? <ExpandLess /> : <ExpandMore />}
            {expandedComments[exhibit.id] ? "Hide Comments" : "Show Comments"}
          </Button>
          {user && user.id === exhibit.user.id && (
            <Button variant="contained" color="secondary" onClick={() => onRemove(exhibit.id)}>
              Remove Exhibit
            </Button>
          )}
        </CardActions>

        <Collapse in={expandedComments[exhibit.id]} timeout="auto" unmountOnExit>
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
            <Button variant="contained" color="primary" onClick={handleAddComment} sx={{ marginBottom: 2 }}>
              Add Comment
            </Button>

            {commentsMap[exhibit.id]?.length ? (
              commentsMap[exhibit.id].map((comment) => (
                <Box key={comment.id} sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingY: 1 }}>
                  <Typography variant="body2" color="text.secondary">
                    <strong>{comment.user.username}:</strong> {comment.text}
                  </Typography>
                  {user && user.id === comment.user.id && (
                    <IconButton color="error" onClick={() => handleDeleteComment(comment.id)}>
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
  );
};

export default ExhibitCard;
