import React, { useEffect, useState } from "react";
import { fetchExhibits } from "../api/exhibitActions";
import {
  fetchComments,
  addComment,
  deleteComment,
} from "../api/commentActions";
import ExhibitCard from "./ExhibitCard";
import PaginationControls from "./PaginationControls"; // Импорт компонента пагинации
import { Box, Grid, Typography } from "@mui/material";
import { Exhibit, Comment } from "../types";
import { useUserProfile } from "../hooks/useUserProfile"; // Импортируем наш хук
import { axiosInstance } from "../api/axiosInstance";

const ExhibitList: React.FC = () => {
  const [exhibits, setExhibits] = useState<Exhibit[]>([]);
  const [commentsMap, setCommentsMap] = useState<Record<string, Comment[]>>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [error, setError] = useState<string | null>(null);

  // Используем хук для получения данных пользователя
  const { user, loading, error: userError } = useUserProfile();

  // Функция для загрузки экспонатов и комментариев
  const loadExhibitsAndComments = async () => {
    try {
      const { data, lastPage } = await fetchExhibits(currentPage);
      setExhibits(data);
      setLastPage(lastPage);

      // Загрузка комментариев для каждого экспоната
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
  }, [currentPage]); // Перезапрос данных при изменении страницы

  // Добавление комментария
  const handleAddComment = async (exhibitId: string, commentText: string) => {
    if (!commentText.trim()) return; // Не позволять отправлять пустые комментарии
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

  // Удаление комментария
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

  // Удаление выставки
  const handleRemoveExhibit = async (exhibitId: string) => {
    try {
      // Выполнить запрос на сервер для удаления выставки
      await axiosInstance.delete(`/api/exhibits/${exhibitId}`);

      // Обновить состояние, удалив выставку из списка
      setExhibits((prevExhibits) =>
        prevExhibits.filter((exhibit) => exhibit.id !== exhibitId)
      );
    } catch (error) {
      console.error("Failed to remove exhibit:", error);
      setError("Failed to remove exhibit");
    }
  };

  // Функция для изменения текущей страницы
  const handlePageChange = (page: number) => {
    if (page < 1 || page > lastPage) return; // Ограничение страниц
    setCurrentPage(page); // Обновляем текущую страницу
  };

  // Проверка, если данные пользователя еще не загружены
  if (loading) {
    return <Typography>Loading user data...</Typography>;
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Exhibit List
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
            user={user} // Передаем данные пользователя
            commentsMap={commentsMap}
            onAddComment={handleAddComment}
            onDeleteComment={handleDeleteComment}
            onRemove={handleRemoveExhibit} // Передаем функцию удаления
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
