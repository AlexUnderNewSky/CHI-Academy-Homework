import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com/",
});

// const history = createBrowserHistory();

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      // history.push("/login");
    }
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export { axiosInstance };
