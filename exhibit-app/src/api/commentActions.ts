"use client";

import { axiosInstance } from "./axiosInstance";
import {
  AddCommentResponse,
  FetchCommentsResponse,
} from "../../interfaces";

export const addComment = async (
  exhibitId: number,
  comment: string
): Promise<AddCommentResponse> => {
  const response = await axiosInstance.post(
    `/api/exhibits/${exhibitId}/comments`,
    { text: comment }
  );
  return response.data; // The response data is now typed as AddCommentResponse
};

export const fetchComments = async (
  exhibitId: number
): Promise<FetchCommentsResponse> => {
  const response = await axiosInstance.get(
    `/api/exhibits/${exhibitId}/comments`
  );
  return response.data; // Response is typed as FetchCommentsResponse
};

export const deleteComment = async (
  exhibitId: number,
  commentId: number
): Promise<void> => {
  await axiosInstance.delete(
    `/api/exhibits/${exhibitId}/comments/${commentId}`
  );
  // No response is expected here, so just return nothing
};
