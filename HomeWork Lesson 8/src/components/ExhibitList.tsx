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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { axiosInstance } from "../api/axiosInstance";
import { useSelector, useDispatch } from "react-redux";
import { getUserProfile } from "../api/userActions";

const ExhibitList: React.FC = () => {
  const [exhibits, setExhibits] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [userProfile, setUserProfile] = useState<any>(null); // Храним профиль текущего пользователя
  const [selectedExhibit, setSelectedExhibit] = useState<any | null>(null); // Храним информацию о выбранной выставке
  const [openDialog, setOpenDialog] = useState(false); // Состояние для управления открытием модального окна
  const userId = useSelector((state: any) => state.user?.id); // Получаем userId из состояния Redux

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

  const loadUserProfile = async () => {
    try {
      const profileData = await getUserProfile();
      setUserProfile(profileData); // Загружаем профиль текущего пользователя
    } catch (error) {
      console.error("Error fetching user profile:", error);
      setError("Failed to fetch user profile");
    }
  };

  useEffect(() => {
    loadExhibits(currentPage);
    loadUserProfile(); // Загружаем профиль пользователя при монтировании компонента
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

  const handleCardClick = (exhibit: any) => {
    setSelectedExhibit(exhibit); // Сохраняем выбранную выставку
    setOpenDialog(true); // Открываем модальное окно
  };

  const handleCloseDialog = () => {
    setOpenDialog(false); // Закрываем модальное окно
    setSelectedExhibit(null); // Очищаем выбранную выставку
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
            <Card
              onClick={() => handleCardClick(exhibit)} // При клике открываем модалку
              sx={{ cursor: "pointer" }}
            >
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
                {/* Отображаем кнопку "Remove", если выставка принадлежит текущему пользователю */}
                {userProfile && userProfile.id === exhibit.user.id && (
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

      {/* Модальное окно с деталями выставки */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Exhibit Details</DialogTitle>
        <DialogContent>
          {selectedExhibit && (
            <Box>
              {/* Добавляем картинку в модальное окно */}
              <CardMedia
                component="img"
                image={`${axiosInstance.defaults.baseURL}${selectedExhibit.imageUrl}`}
                alt={selectedExhibit.description}
                sx={{ height: 300, marginBottom: 2 }} // Размер картинки
              />
              <Typography variant="h6">Description</Typography>
              <Typography variant="body1">{selectedExhibit.description}</Typography>
              <Typography variant="body1">Username: {selectedExhibit.user.username}</Typography>
              <Typography variant="body1">User ID: {selectedExhibit.user.id}</Typography>
              <Typography variant="body1">Created At: {new Date(selectedExhibit.createdAt).toLocaleString()}</Typography>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>

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
