import React, { useState, useEffect, forwardRef } from "react";
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
import { useUserProfile } from "../hooks/useUserProfile";

const CommentStripe: React.FC<CommentStripeProps> = ({
  exhibitId,
  expanded,
}) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const { userProfile } = useUserProfile();

  useEffect(() => {
    fetchComments(exhibitId).then(setComments).catch(console.error);
  }, [exhibitId]);

  const handleAddComment = async () => {
    const response = await addComment(exhibitId, newComment);
    setComments([...comments, response]);
    setNewComment("");
  };

  const handleDeleteComment = async (commentId: number) => {
    await deleteComment(exhibitId, commentId);
    setComments(comments.filter((c) => c.id !== commentId));
  };

  // console.log(userProfile);

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
              {userProfile?.id === comment.user.id && (
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
