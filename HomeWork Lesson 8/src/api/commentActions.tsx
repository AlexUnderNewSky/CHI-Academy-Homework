import { axiosInstance } from "./axiosInstance";

export const addComment = async (postId: string, comment: string) => {
  return axiosInstance.post(`api/posts/${postId}/comments`, { comment });
};

export const deleteComment = async (commentId: string) => {
  return axiosInstance.delete(`api/comments/${commentId}`);
};

export const fetchComments = async (postId: string) => {
  const response = await axiosInstance.get(`api/posts/${postId}/comments`);
  return response.data; 
};
