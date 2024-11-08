// axiosInstance.tsx
import axios from "axios";
import { createBrowserHistory } from "history";

const axiosInstance = axios.create({
  baseURL: "http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com/",
});

const history = createBrowserHistory();

// Intercept response to handle authorization
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      history.push("/login");
    }
    return Promise.reject(error);
  }
);

// Add token to headers if present
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { axiosInstance };
