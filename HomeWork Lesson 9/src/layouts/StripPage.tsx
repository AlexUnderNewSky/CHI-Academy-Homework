import React, { useEffect, useState } from "react";
import ExhibitList from "../components/ExhibitList";
import { Container } from "@mui/material";
import { ExhibitI } from "../interfaces";
import { fetchExhibits } from "../api/exhibitActions";
import { useLocation } from "react-router-dom"; 

const StripPage: React.FC = () => {
  const location = useLocation();
  const [exhibits, setExhibits] = useState<ExhibitI[]>([]);
  const [page, setPage] = useState<number>(1);
  const [lastPage, setLastPage] = useState<number>(1);

  // Извлекаем параметр page из URL
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const pageFromQuery = queryParams.get("page");
    setPage(pageFromQuery ? parseInt(pageFromQuery, 10) : 1);
  }, [location.search]);

  // Загружаем данные для текущей страницы
  useEffect(() => {
    const loadExhibits = async () => {
      try {
        const { data, lastPage } = await fetchExhibits(page);
        setExhibits(data);
        setLastPage(lastPage);
      } catch (error) {
        console.error("Failed to fetch exhibits:", error);
      }
    };

    loadExhibits();
  }, [page]);

  return (
    <Container>
      <ExhibitList data={exhibits} page={page} lastPage={lastPage} />
    </Container>
  );
};

export default StripPage;
