'use client';

import CardActions from "@mui/material/CardActions";
import { useState, useEffect } from "react";
import React from "react";
import { IconButton, IconButtonProps, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { styled } from "@mui/material/styles";
import CommentStripe from "./CommentStripe";
import { getUserProfile } from "../api/userActions"; // Добавьте импорт функции для получения данных пользователя

interface ExhibitCardActionBarPropsI {
  exhibitId: number;
}

interface ExpandMorePropsI extends IconButtonProps {
  expand: boolean;
}

const ExpandMore = styled((props: ExpandMorePropsI) => {
  const { ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
  transform: expand ? "rotate(180deg)" : "rotate(0deg)",
}));

const ExhibitCardActionBar: React.FC<ExhibitCardActionBarPropsI> = ({
  exhibitId,
}) => {
  const [expanded, setExpanded] = useState(false); // Состояние для скрытия/показа
  const [userId, setUserId] = useState<number | null>(null); // Состояние для хранения userId
  const [loading, setLoading] = useState<boolean>(true); 

  // Функция для получения данных о текущем пользователе
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userProfile = await getUserProfile(); // Получаем данные о пользователе
        setUserId(userProfile.id); // Устанавливаем id текущего пользователя
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setLoading(false);
      }
    };

    fetchUserProfile();
  }, []);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  if (loading) {
    return <Typography>Loading...</Typography>; // Пока идет загрузка, можно отобразить текст
  }

  return (
    <>
      <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
        <Typography variant="body1" sx={{ marginRight: 1 }}>
          Show Comments
        </Typography>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>

      {/* Передаем userId в CommentStripe */}
      {expanded && userId && (
        <CommentStripe exhibitId={exhibitId} expanded={expanded} userId={userId} />
      )}
    </>
  );
};

export default ExhibitCardActionBar;
