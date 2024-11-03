import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com:3000/",
});

const BASE_URL =
  "http://ec2-13-49-67-34.eu-north-1.compute.amazonaws.com:3000";
export { BASE_URL };
