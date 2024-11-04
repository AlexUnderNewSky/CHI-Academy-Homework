import { axiosInstance } from "../api/axiosInstance";

// Функция для входа пользователя
export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post("api/auth/login", {
      username,
      password,
    });
    localStorage.setItem("token", response.data.access_token);
    return response.data.access_token; // Возвращаем данные ответа
  } catch (error) {
    throw error; // Обработка ошибок
  }
};

// Функция для регистрации пользователя (если требуется)
export const registerUser = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post("users/register", {
      username,
      password,
    });
    return response.data; // Возвращаем данные ответа
  } catch (error) {
    throw error; // Обработка ошибок
  }
};
