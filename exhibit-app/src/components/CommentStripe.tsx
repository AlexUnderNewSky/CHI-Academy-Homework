"use client";

import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  List,
  ListItem,
  IconButton,
} from "@mui/material";
import { Delete as DeleteIcon } from "@mui/icons-material";
import {
  addComment,
  fetchComments,
  deleteComment,
} from "../api/commentActions";
import { Comment, CommentStripeProps } from "../../interfaces";

const CommentStripe: React.FC<CommentStripeProps> = ({
  exhibitId,
  expanded,
  userId,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");

  // Fetch comments when the exhibitId changes
  useEffect(() => {
    if (exhibitId) {
      fetchComments(exhibitId)
        .then((data) => setComments(data))
        .catch(console.error);
    }
  }, [exhibitId]);

  // Add a new comment
  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await addComment(exhibitId, newComment);
      setComments((prevComments) => [...prevComments, response]);
      setNewComment("");
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
  };

  // Delete a comment
  const handleDeleteComment = async (commentId: number) => {
    try {
      await deleteComment(exhibitId, commentId);
      setComments((prevComments) =>
        prevComments.filter((c) => c.id !== commentId)
      );
    } catch (error) {
      console.error("Failed to delete comment:", error);
    }
  };
  return (
    <Box
      sx={{
        backgroundColor: "#f9f9f9",
        padding: 2,
        borderRadius: 2,
        boxShadow: 1,
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 1 }}>
        Comments: {comments.length}
      </Typography>

      {/* Show comments when expanded */}
      {expanded && (
        <List sx={{ marginBottom: 2 }}>
          {comments.map((comment) => (
            <ListItem
              key={comment.id}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 0",
                borderBottom: "1px solid #ddd",
              }}
            >
              <Typography sx={{ fontSize: 14, color: "text.secondary" }}>
                {comment.text} - by <strong>{comment.user.username}</strong>
              </Typography>
              {userId === comment.user.id && (
                <IconButton onClick={() => handleDeleteComment(comment.id)}>
                  <DeleteIcon />
                </IconButton>
              )}
            </ListItem>
          ))}
        </List>
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          variant="outlined"
          label="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          fullWidth
          sx={{
            borderRadius: 2,
            backgroundColor: "white",
            "& .MuiOutlinedInput-root": {
              borderRadius: "8px",
            },
          }}
        />
        <Button
          onClick={handleAddComment}
          disabled={!newComment.trim()}
          variant="contained"
          color="primary"
          sx={{
            alignSelf: "flex-start",
            textTransform: "none",
            padding: "8px 16px",
            borderRadius: 2,
          }}
        >
          Add Comment
        </Button>
      </Box>
    </Box>
  );
};

export default CommentStripe;
