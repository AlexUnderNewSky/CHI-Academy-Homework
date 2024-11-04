// src/components/ExhibitList.tsx
import React, { useEffect, useState } from "react";
import { fetchExhibits, removeExhibits } from "../api/exhibitActions";
import { axiosInstance } from "../api/axiosInstance";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Grid,
  Alert,
} from "@mui/material";

const ExhibitList: React.FC = () => {
  const [exhibits, setExhibits] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadExhibits = async () => {
      try {
        const data = await fetchExhibits();
        setExhibits(data);
      } catch (error) {
        setError("Failed to fetch exhibits");
        console.error("Error fetching exhibits:", error);
      }
    };

    loadExhibits();
  }, []);

  const handleRemove = async (id: string) => {
    try {
      await removeExhibits(id);
      // Обновляем состояние, удаляя удаленный экспонат
      setExhibits(exhibits.filter((exhibit) => exhibit.id !== id));
      console.log(`Exhibit ${id} removed successfully`);
    } catch (error) {
      console.error("Error removing exhibit:", error);
      setError("Failed to remove exhibit");
    }
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Exhibit List
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={2}>
        {exhibits.map((exhibit) => (
          <Grid item xs={12} sm={6} md={4} key={exhibit.id}>
            <Card>
              <CardMedia
                component="img"
                image={`${axiosInstance.defaults.baseURL}${exhibit.imageUrl}`}
                alt={exhibit.description}
                sx={{ height: 140 }} // Высота изображения
              />
              <CardContent>
                <Typography variant="body1">{exhibit.description}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={() => handleRemove(exhibit.id)}
                >
                  Remove
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ExhibitList;
