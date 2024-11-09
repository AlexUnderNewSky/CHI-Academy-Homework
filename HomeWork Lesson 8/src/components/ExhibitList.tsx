import React, { useEffect, useState } from "react";
import { fetchExhibits } from "../api/exhibitActions";
import {
  fetchComments,
  addComment,
  deleteComment,
} from "../api/commentActions";
import ExhibitCard from "./ExhibitCard";
import PaginationControls from "./PaginationControls";
import { Box, Grid, Typography } from "@mui/material";
import { Exhibit, Comment } from "../interfaces";
import { useUserProfile } from "../hooks/useUserProfile";
import { axiosInstance } from "../api/axiosInstance";
import NotificationComponent from "../hooks/useSocket";

const ExhibitList: React.FC = () => {
  const [exhibits, setExhibits] = useState<Exhibit[]>([]);
  const [commentsMap, setCommentsMap] = useState<Record<string, Comment[]>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  const { user, loading, error: userError } = useUserProfile();

  const loadExhibitsAndComments = async () => {
    try {
      const { data, lastPage } = await fetchExhibits(currentPage);
      setExhibits(data);
      setLastPage(lastPage);

      const commentsFetches = data.map((exhibit: Exhibit) =>
        fetchComments(exhibit.id).then((comments) => ({
          exhibitId: exhibit.id,
          comments,
        }))
      );

      const commentsData = await Promise.all(commentsFetches);
      const newCommentsMap: Record<string, Comment[]> = {};

      commentsData.forEach(({ exhibitId, comments }) => {
        newCommentsMap[exhibitId] = comments;
      });

      setCommentsMap(newCommentsMap);
    } catch (error) {
      setError("Failed to fetch exhibits or comments");
    }
  };

  useEffect(() => {
    loadExhibitsAndComments();
  }, [currentPage]);

  const handleNewPost = () => {
    if (currentPage === 1) {
      loadExhibitsAndComments();
    }
  };

  const handleAddComment = async (exhibitId: string, commentText: string) => {
    if (!commentText.trim()) return;
    try {
      const comment = await addComment(exhibitId, commentText);
      setCommentsMap((prevCommentsMap) => ({
        ...prevCommentsMap,
        [exhibitId]: [...(prevCommentsMap[exhibitId] || []), comment],
      }));
    } catch (error) {
      console.error("Failed to add comment:", error);
    }
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

  const handleRemoveExhibit = async (exhibitId: string) => {
    try {
      await axiosInstance.delete(`/api/exhibits/${exhibitId}`);

      setExhibits((prevExhibits) =>
        prevExhibits.filter((exhibit) => exhibit.id !== exhibitId)
      );
    } catch (error) {
      console.error("Failed to remove exhibit:", error);
      setError("Failed to remove exhibit");
    }
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > lastPage) return;
    setCurrentPage(page);
  };

  if (loading) {
    return <Typography>Loading user data...</Typography>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <NotificationComponent onNewPost={handleNewPost}/>
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        List of Exhibits!
      </Typography>
      {error && <Typography color="error">{error}</Typography>}

      {/* Pagination */}
      <PaginationControls
        currentPage={currentPage}
        lastPage={lastPage}
        onPageChange={handlePageChange}
      />

      <Grid container direction="column" spacing={2}>
        {exhibits.map((exhibit) => (
          <ExhibitCard
            key={exhibit.id}
            exhibit={exhibit}
            user={user}
            commentsMap={commentsMap}
            onAddComment={handleAddComment}
            onDeleteComment={handleDeleteComment}
            onRemove={handleRemoveExhibit}
          />
        ))}
      </Grid>

      {/* Pagination */}
      <PaginationControls
        currentPage={currentPage}
        lastPage={lastPage}
        onPageChange={handlePageChange}
      />
    </Box>
  );
};

export default ExhibitList;
