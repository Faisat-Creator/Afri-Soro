import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

// Add token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;

// Auth
export const authAPI = {
  register: (data: { name: string; email: string; password: string; country: string }) =>
    api.post("/api/auth/register", data),
  login: (data: { email: string; password: string }) => api.post("/api/auth/login", data),
};

// Questions
export const questionAPI = {
  getQuestion: (difficulty?: number, country?: string) =>
    api.get("/api/questions", { params: { difficulty, country } }),
};

// Attempts
export const attemptAPI = {
  submitAttempt: (data: {
    questionId: string;
    answer: number;
    correct: boolean;
    responseTime: number;
    xpEarned: number;
  }) => api.post("/api/attempts", data),
};

// Profile
export const profileAPI = {
  getProfile: () => api.get("/api/profile"),
};
