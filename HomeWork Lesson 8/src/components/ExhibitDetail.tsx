import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../api/axiosInstance";
import { Box, Typography, Card, CardMedia, CardContent, Button, CircularProgress } from "@mui/material";
import CommentStripe from "../components/CommentStripe";

const ExhibitDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Получаем id из URL
  const [exhibit, setExhibit] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchExhibitDetail = async () => {
      try {
        const response = await axiosInstance.get(`/api/exhibits/post/${id}`);
        setExhibit(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch exhibit details");
        setLoading(false);
      }
    };

    if (id) {
      fetchExhibitDetail();
    }
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Exhibit Detail - ID: {exhibit?.id}
      </Typography>
      <Card>
        <CardMedia
          component="img"
          image={`${axiosInstance.defaults.baseURL}${exhibit?.imageUrl}`}
          alt={exhibit?.description}
          sx={{ height: 300 }}
        />
        <CardContent>
          <Typography variant="h6">Description</Typography>
          <Typography variant="body1">{exhibit?.description}</Typography>
          <Typography variant="body2">Username: {exhibit?.user.username}</Typography>
          <Typography variant="body2">Created At: {new Date(exhibit?.createdAt).toLocaleString()}</Typography>
        </CardContent>
        <Button variant="contained" color="primary" onClick={() => window.history.back()}>
          Back
        </Button>
      </Card>

      <CommentStripe exhibitId={id!} /> {/* Передаем exhibitId для работы с комментариями */}
    </Box>
  );
};

export default ExhibitDetail;
