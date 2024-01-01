import axios from "axios";

export default axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "content-Type": "application/json",
  },
  withCredentials: true,
});
