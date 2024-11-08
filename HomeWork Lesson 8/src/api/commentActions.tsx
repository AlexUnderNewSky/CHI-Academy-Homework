import { axiosInstance } from "./axiosInstance";

export const addComment = async (exhibitId: string, comment: string) => {
  const response = await axiosInstance.post(
    `/api/exhibits/${exhibitId}/comments`,
    { text: comment }
  );
  return response.data;
};

export const fetchComments = async (exhibitId: string) => {
  const response = await axiosInstance.get(
    `/api/exhibits/${exhibitId}/comments`
  );
  return response.data;
};

export const deleteComment = async (exhibitId: string, commentId: string) => {
  const response = await axiosInstance.delete(
    `/api/exhibits/${exhibitId}/comments/${commentId}`
  );
  return response.data;
};
