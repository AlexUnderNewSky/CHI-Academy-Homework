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
import {
  ExpandMore,
  ExpandLess,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import {
  addComment,
  fetchComments,
  deleteComment,
} from "../api/commentActions";
import { Comment, CommentStripeProps } from "../interfaces";

const CommentStripe: React.FC<CommentStripeProps> = ({ exhibitId }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    fetchComments(exhibitId).then(setComments).catch(console.error);
  }, [exhibitId]);

  const handleAddComment = async () => {
    const response = await addComment(exhibitId, newComment);
    setComments([...comments, response]);
    setNewComment("");
  };

  const handleDeleteComment = async (commentId: string) => {
    await deleteComment(exhibitId, commentId);
    setComments(comments.filter((c) => c.id !== commentId));
  };

  return (
    <Box>
      <Typography variant="h6">Comments</Typography>
      <Button onClick={() => setExpanded(!expanded)}>
        {expanded ? <ExpandLess /> : <ExpandMore />}{" "}
        {expanded ? "Hide" : "Show"} Comments
      </Button>

      {expanded && (
        <List>
          {comments.map((comment) => (
            <ListItem key={comment.id}>
              <Typography>
                {comment.text} - by {comment.user.username}
              </Typography>
              <IconButton onClick={() => handleDeleteComment(comment.id)}>
                <DeleteIcon />
              </IconButton>
            </ListItem>
          ))}
        </List>
      )}

      <TextField
        variant="outlined"
        label="Add a comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
      />
      <Button onClick={handleAddComment}>Add Comment</Button>
    </Box>
  );
};

export default CommentStripe;
