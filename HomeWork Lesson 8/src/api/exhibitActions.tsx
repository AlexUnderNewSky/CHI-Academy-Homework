import { axiosInstance } from "./axiosInstance"; // Import your axios instance

export const fetchExhibits = async () => {
  try {
    const response = await axiosInstance.get("api/exhibits");
    return response.data; 
  } catch (error) {
    throw error; 
  }
};

export const removeExhibit = async (id: string) => {
  return axiosInstance.delete(`api/exhibits/${id}`);
};

export const uploadExhibit = async (formData: FormData) => {
  return axiosInstance.post("api/exhibits", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};
