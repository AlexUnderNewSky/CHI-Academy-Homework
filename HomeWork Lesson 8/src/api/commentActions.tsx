import { axiosInstance } from "./axiosInstance";

// Добавить комментарий
export const addComment = async (exhibitId: string, comment: string) => {
  const response = await axiosInstance.post(`/api/exhibits/${exhibitId}/comments`, { text: comment });
  return response.data;
};

// Получить все комментарии для экспоната
export const fetchComments = async (exhibitId: string) => {
  const response = await axiosInstance.get(`/api/exhibits/${exhibitId}/comments`);
  return response.data;
};

// Удалить комментарий
export const deleteComment = async (commentId: string) => {
  const response = await axiosInstance.delete(`/api/exhibits/{exhibitId}/comments/${commentId}`);
  return response.data;
};
