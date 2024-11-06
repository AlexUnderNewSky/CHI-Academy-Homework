import React, { useState, useEffect } from "react";
import { TextField, Button, Box, Typography, List, ListItem, ListItemText, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { addComment, fetchComments, deleteComment } from "../api/commentActions";
import { axiosInstance } from "../api/axiosInstance";

interface Comment {
  id: string;
  text: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
  };
}

interface CommentStripeProps {
  exhibitId: string;
}

const CommentStripe: React.FC<CommentStripeProps> = ({ exhibitId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadComments = async () => {
      try {
        const fetchedComments = await fetchComments(exhibitId);
        setComments(fetchedComments);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching comments:", error);
        setLoading(false);
      }
    };

    loadComments();
  }, [exhibitId]);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const response = await addComment(exhibitId, newComment);
        console.log("Server response:", response); // Добавим логирование
  
        // Проверяем, что ответ содержит нужные данные
        if (response && response.data) {
          const { id, createdAt, user } = response.data;
          setComments((prevComments) => [
            ...prevComments,
            {
              id: id,
              text: newComment,
              createdAt: createdAt,
              user: user,
            },
          ]);
          setNewComment(""); // очищаем поле ввода
        } else {
          console.error("Invalid response format:", response);
        }
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await deleteComment(commentId);
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== commentId)
      );
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  return (
    <Box sx={{ padding: 3, border: "1px solid #ccc", borderRadius: 2 }}>
      <Typography variant="h6">Comments</Typography>
      <Box sx={{ marginBottom: 2 }}>
        <TextField
          fullWidth
          variant="outlined"
          label="Add a comment"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          variant="contained"
          sx={{ marginTop: 2 }}
          onClick={handleAddComment}
        >
          Add Comment
        </Button>
      </Box>

      {loading ? (
        <Typography>Loading comments...</Typography>
      ) : (
        <List>
          {comments.map((comment) => (
            <ListItem key={comment.id} sx={{ borderBottom: "1px solid #ccc" }}>
              <ListItemText
                primary={comment.text}
                secondary={`by ${comment.user.username} on ${new Date(comment.createdAt).toLocaleString()}`}
              />
              <IconButton
                color="secondary"
                onClick={() => handleDeleteComment(comment.id)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}
    </Box>
  );
};

export default CommentStripe;
