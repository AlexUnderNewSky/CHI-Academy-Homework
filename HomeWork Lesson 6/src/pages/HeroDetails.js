import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardMedia,
  CardContent,
  Typography,
  Container,
  CircularProgress,
  Box,
  Button,
} from "@mui/material";

const HeroDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCharacter = async () => {
      try {
        const response = await fetch(
          `https://rickandmortyapi.com/api/character/${id}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch character");
        }
        const data = await response.json();
        setCharacter(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchCharacter();
  }, [id]);

  if (loading) {
    return (
      <Container sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100%"
        >
          <CircularProgress />
          <Typography variant="h6" sx={{ mt: 2 }}>
            Loading...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  return (
    <Container sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
      <Card sx={{ maxWidth: 345, width: "100%", height: "100%" }}>
        <CardMedia
          component="img"
          image={character.image}
          alt={character.name}
        />
        <CardContent>
          <Typography variant="h5">{character.name}</Typography>
          <Typography>Status: {character.status}</Typography>
          <Typography>Species: {character.species}</Typography>
          <Typography>Gender: {character.gender}</Typography>
        </CardContent>
        <Button
          variant="contained"
          onClick={() => navigate(-1)}
          sx={{
            mb: 2,
            mr: 2,
            ml: 2,
            width: "calc(100% - 32px)",
            height: "50px",
            color: "black",
            bgcolor: "#36eee0",
            ":hover": {
              bgcolor: "#f652a0",
              color: "white",
            },
          }}
        >
          Back
        </Button>
      </Card>
    </Container>
  );
};

export default HeroDetails;
