import { axiosInstance } from "./axiosInstance"; // Import your axios instance

export const fetchExhibits = async () => {
  try {
    const response = await axiosInstance.get("api/exhibits");
    return response.data.data; // Предполагаем, что данные находятся в response.data.data
  } catch (error) {
    throw error; // Перебрасываем ошибку для обработки
  }
};

export const removeExhibit = async (id: string) => {
  const token = localStorage.getItem("token"); // Получаем токен из localStorage
  if (!token) {
    throw new Error("Unauthorized"); // Если токена нет, выбрасываем ошибку
  }

  // Выполняем запрос на удаление с токеном в заголовке
  return axiosInstance.delete(`api/exhibits/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`, // Добавляем токен в заголовки
    },
  });
};

export const uploadExhibit = async (formData: FormData) => {
  const token = localStorage.getItem("token"); // Получаем токен
  if (!token) {
    throw new Error("Unauthorized"); // Проверка на наличие токена
  }

  return axiosInstance.post("api/exhibits", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`, // Добавляем токен в заголовки
    },
  });
};

export const fetchUserPosts = async () => {
  const token = localStorage.getItem("token"); // Получаем токен из localStorage
  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axiosInstance.get("api/exhibits/my-posts", {
      headers: {
        Authorization: `Bearer ${token}`, // Убедитесь, что вы отправляете токен
      },
    });
    return response.data.data; // Предполагаем, что данные находятся здесь
  } catch (error) {
    throw error;
  }
};
