import { axiosInstance } from "./axiosInstance";

// Функция для получения всех постов
export const fetchExhibits = async () => {
  try {
    const response = await axiosInstance.get("api/exhibits");
    return response.data;
  } catch (error) {
    throw error; 
  }
};
