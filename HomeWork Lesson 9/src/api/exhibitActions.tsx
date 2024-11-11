import { axiosInstance } from "./axiosInstance";

export const fetchExhibits = async (page: number) => {
  try {
    const response = await axiosInstance.get("api/exhibits", {
      params: {
        page: page,
      },
    });
    return {
      data: response.data.data,
      lastPage: response.data.lastPage,
    };
  } catch (error) {
    throw error;
  }
};

export const removeExhibit = async (id: number) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Unauthorized");
  }

  return axiosInstance.delete(`api/exhibits/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const fetchComments = async (exhibitId: number) => {
  const response = await axiosInstance.get(`/exhibits/${exhibitId}/comments`);
  return response.data;
};

export const addComment = async (exhibitId: number, text: string) => {
  const response = await axiosInstance.post(`/exhibits/${exhibitId}/comments`, {
    text,
  });
  return response.data;
};

export const deleteComment = async (exhibitId: number, commentId: number) => {
  await axiosInstance.delete(`/exhibits/${exhibitId}/comments/${commentId}`);
};

export const fetchUserPosts = async () => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("No token found");
  }

  try {
    const response = await axiosInstance.get("api/exhibits/my-posts", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export const uploadExhibit = async (formData: FormData) => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Unauthorized");
  }

  return axiosInstance.post("api/exhibits", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });
};
