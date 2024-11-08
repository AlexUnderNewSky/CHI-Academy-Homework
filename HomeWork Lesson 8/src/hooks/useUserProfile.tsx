import { useState, useEffect } from "react";
import { getUserProfile } from "../api/userActions"; // импортируем функцию для запроса к API

// Хук для получения профиля пользователя
export const useUserProfile = () => {
  const [user, setUser] = useState<{ id: string; username: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const userData = await getUserProfile(); // Получаем данные пользователя
        setUser(userData); // Устанавливаем данные пользователя в state
        setLoading(false); // Устанавливаем loading в false
      } catch (error) {
        setError("Failed to fetch user profile"); // Обработка ошибок
        setLoading(false);
      }
    };

    fetchUserProfile(); // Загружаем данные при монтировании компонента
  }, []); // Загружаем один раз при монтировании

  return { user, loading, error }; // Возвращаем данные, статус загрузки и ошибку
};
