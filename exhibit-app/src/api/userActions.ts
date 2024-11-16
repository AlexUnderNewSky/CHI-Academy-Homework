"use client";

import { axiosInstance } from "./axiosInstance";
import { AuthResponse, UserI } from "../../interfaces";

export const loginUser = async (
  username: string,
  password: string
): Promise<AuthResponse> => {
  try {
    const response = await axiosInstance.post("api/auth/login", {
      username,
      password,
    });
    localStorage.setItem("token", response.data.access_token);
    return response.data; // Response is typed as AuthResponse
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

export const getUserProfile = async (): Promise<UserI> => {
  try {
    const response = await axiosInstance.get("/users/my-profile", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
      },
    });
    // Теперь возвращаем только пользователя (тип UserI), без обертки UserProfileResponse
    return response.data;
  } catch (error) {
    console.error("Failed to fetch user profile", error);
    throw error;
  }
};
