import { axiosInstance } from "./axiosInstance"; // Import your axios instance

export const fetchExhibits = async (page: number) => {
  try {
    const response = await axiosInstance.get("api/exhibits", {
      params: {
        page: page,
      },
    });
    return {
      data: response.data.data, // Список выставок
      lastPage: response.data.lastPage, // Последняя страница
    };
  } catch (error) {
    throw error;
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

export const fetchComments = async (exhibitId: string) => {
  const response = await axiosInstance.get(`/exhibits/${exhibitId}/comments`);
  return response.data;
};

export const addComment = async (exhibitId: string, text: string) => {
  const response = await axiosInstance.post(`/exhibits/${exhibitId}/comments`, { text });
  return response.data;
};

export const deleteComment = async (exhibitId: string, commentId: string) => {
  await axiosInstance.delete(`/exhibits/${exhibitId}/comments/${commentId}`);
};

// Добавление недостающих функций:

// Получение постов пользователя
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

// Загрузка нового exhibit
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
