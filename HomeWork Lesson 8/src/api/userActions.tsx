import { axiosInstance } from "./axiosInstance";

export const loginUser = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post("api/auth/login", {
      username,
      password,
    });
    localStorage.setItem("token", response.data.access_token);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const registerUser = async (username: string, password: string) => {
  try {
    const response = await axiosInstance.post("api/users/register", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getUserProfile = async () => {
  try {
    const response = await axiosInstance.get("/users/my-profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user profile", error);
    throw error;
  }
};
