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
import { getUserProfile } from "../api/userActions";

// Добавьте экшен и редьюсер для сохранения данных о пользователе в Redux (если необходимо)


const ExhibitList: React.FC = () => {
  const [exhibits, setExhibits] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [userId, setUserId] = useState<number | null>(null); // Для хранения ID текущего пользователя

  // Загружаем данные о текущем пользователе при монтировании компонента
  useEffect(() => {
    const loadUserProfile = async () => {
      try {
        const userData = await getUserProfile();
        setUserId(userData.id); // Сохраняем ID пользователя
      } catch (error) {
        console.error("Failed to load user profile:", error);
      }
    };

    loadUserProfile();
  }, []); // Этот useEffect сработает только при монтировании компонента

  // Загрузка выставок
  const loadExhibits = async (page: number) => {
    try {
      const { data, lastPage } = await fetchExhibits(page);
      console.log("Received data:", data);

      setExhibits(data);
      setLastPage(lastPage); // Устанавливаем последнюю страницу
    } catch (error) {
      console.error("Error fetching exhibits:", error);
      setError("Failed to fetch exhibits");
    }
  };

  useEffect(() => {
    loadExhibits(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < lastPage) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

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
        Exhibit List (Page {currentPage} of {lastPage})
      </Typography>
      {error && <Alert severity="error">{error}</Alert>}
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Button
          variant="contained"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          sx={{ marginRight: 2 }}
        >
          Previous
        </Button>
        <Typography variant="body1" sx={{ padding: 2 }}>
          Page {currentPage} of {lastPage}
        </Typography>
        <Button
          variant="contained"
          onClick={handleNextPage}
          disabled={currentPage === lastPage}
          sx={{ marginLeft: 2 }}
        >
          Next
        </Button>
      </Box>
      <Box sx={{ m: 4 }} />
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
                {userId === exhibit.user.id && ( // Проверка, что кнопка должна быть только для пользователя
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => handleRemove(exhibit.id)}
                  >
                    Remove
                  </Button>
                )}
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4 }}>
        <Button
          variant="contained"
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          sx={{ marginRight: 2 }}
        >
          Previous
        </Button>
        <Typography variant="body1" sx={{ padding: 2 }}>
          Page {currentPage} of {lastPage}
        </Typography>
        <Button
          variant="contained"
          onClick={handleNextPage}
          disabled={currentPage === lastPage}
          sx={{ marginLeft: 2 }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default ExhibitList;
