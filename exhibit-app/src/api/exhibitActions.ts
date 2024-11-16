import { axiosInstance } from "./axiosInstance";
import { ExhibitsResponse, ExhibitI, AddCommentResponse, Comment } from "../../interfaces";

// Fetch exhibits with pagination
export const fetchExhibits = async (page: number): Promise<ExhibitsResponse> => {
  try {
    const response = await axiosInstance.get("api/exhibits", {
      params: {
        page: page,
      },
    });
    // Typing the response based on the expected data structure
    return {
      data: response.data.data, // Array of exhibits
      lastPage: response.data.lastPage, // Last page for pagination
    };
  } catch (error) {
    throw error;
  }
};

// Remove exhibit
export const removeExhibit = async (id: number): Promise<void> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Unauthorized");
  }

  await axiosInstance.delete(`api/exhibits/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

// Fetch comments for a specific exhibit
export const fetchComments = async (exhibitId: number): Promise<Comment[]> => {
  const response = await axiosInstance.get(`/exhibits/${exhibitId}/comments`);
  // Assuming the response contains an array of comments
  return response.data; // Array of Comment objects
};

// Add a comment to an exhibit
export const addComment = async (exhibitId: number, text: string): Promise<AddCommentResponse> => {
  const response = await axiosInstance.post(`/exhibits/${exhibitId}/comments`, {
    text,
  });
  // Typing the response to match the expected structure
  return response.data; // AddCommentResponse is defined in the interfaces
};

// Delete a comment from an exhibit
export const deleteComment = async (exhibitId: number, commentId: number): Promise<void> => {
  await axiosInstance.delete(`/exhibits/${exhibitId}/comments/${commentId}`);
  // No response expected here, so we return nothing
};

// Fetch user-specific posts
export const fetchUserPosts = async (): Promise<ExhibitI[]> => {
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
    // Return data as an array of exhibits
    return response.data.data; // ExhibitI[] (Array of exhibits)
  } catch (error) {
    throw error;
  }
};

// Upload an exhibit (with FormData)
export const uploadExhibit = async (formData: FormData): Promise<ExhibitI> => {
  const token = localStorage.getItem("token");
  if (!token) {
    throw new Error("Unauthorized");
  }

  const response = await axiosInstance.post("api/exhibits", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${token}`,
    },
  });

  // Return the newly uploaded exhibit data
  return response.data; // ExhibitI
};
