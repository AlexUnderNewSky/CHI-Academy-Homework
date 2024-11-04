import React, { useEffect, useState } from "react";
import { fetchExhibits, removeExhibit } from "../api/exhibitActions";
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
import { axiosInstance } from "../api/axiosInstance";

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
      }
    };

    loadExhibits();
  }, []);

  const handleRemove = async (id: string) => {
    try {
      await removeExhibit(id);
      setExhibits(exhibits.filter((exhibit) => exhibit.id !== id));
    } catch (error) {
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
                sx={{ height: 140 }}
              />
              <CardContent>
                <Typography variant="body1">Image ID: {exhibit.id}</Typography>
                <Typography variant="body1">{exhibit.description}</Typography>
                <Typography variant="body1">
                  Username: {exhibit.user.username}
                </Typography>
                <Typography variant="body1">
                  User ID: {exhibit.user.id}
                </Typography>
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
