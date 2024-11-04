import { axiosInstance } from "../api/axiosInstance"; // Импортируем вашу настройку axios

export const fetchExhibits = async () => {
  try {
    const response = await axiosInstance.get("api/exhibits");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const removeExhibits = async (id: string) => {
  return axiosInstance.delete(`api/exhibits/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const uploadExhibit = async (formData: FormData) => {
  return axiosInstance.post("/api/exhibits", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
