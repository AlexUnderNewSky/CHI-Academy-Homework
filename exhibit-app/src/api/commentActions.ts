import { axiosInstance } from "./axiosInstance";

export const addComment = async (exhibitId: number, comment: string) => {
  const response = await axiosInstance.post(
    `/api/exhibits/${exhibitId}/comments`,
    { text: comment }
  );
  return response.data;
};

export const fetchComments = async (exhibitId: number) => {
  const response = await axiosInstance.get(
    `/api/exhibits/${exhibitId}/comments`
  );
  return response.data;
};

export const deleteComment = async (exhibitId: number, commentId: number) => {
  const response = await axiosInstance.delete(
    `/api/exhibits/${exhibitId}/comments/${commentId}`
  );
  return response.data;
};
