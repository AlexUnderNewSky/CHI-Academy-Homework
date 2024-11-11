import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { PaginationProps } from "../interfaces";
import { useNavigate, useLocation } from "react-router-dom";

const PaginationControls: React.FC<PaginationProps> = ({
  currentPage,
  lastPage,
  onPageChange,
}) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Получаем текущую страницу из URL параметра
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const pageFromUrl = parseInt(params.get("page") || "1", 10);
    
    // Если страница из URL не совпадает с текущей страницей в состоянии, обновляем состояние
    if (pageFromUrl && pageFromUrl !== currentPage) {
      onPageChange(pageFromUrl);
    }
  }, [location.search, currentPage, onPageChange]);

  // Функция для изменения URL при изменении страницы
  const handlePageChange = (newPage: number) => {
    // Обновляем URL с новой страницей
    navigate(`?page=${newPage}`);
    // Вызываем функцию изменения страницы в родительском компоненте
    onPageChange(newPage);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", marginTop: 4, mb: 2, mt: 2 }}>
      <Button
        variant="contained"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        Previous
      </Button>
      <Typography sx={{ padding: 2 }}>
        Page {currentPage} of {lastPage}
      </Typography>
      <Button
        variant="contained"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === lastPage}
      >
        Next
      </Button>
    </Box>
  );
};

export default PaginationControls;
