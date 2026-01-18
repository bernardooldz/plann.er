import axios from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333",
});

// Interceptor para adicionar token de autenticação
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("@planner:token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("@planner:token");
      localStorage.removeItem("@planner:user");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);