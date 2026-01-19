import { api } from "../../../shared/utils/api";
import type { LoginData, RegisterData, UpdateProfileData } from "../types";

export const authService = {
  async login(data: LoginData) {
    const response = await api.post("/auth/login", data);
    return response.data;
  },

  async register(data: RegisterData) {
    const response = await api.post("/auth/register", data);
    return response.data;
  },

  async getMe() {
    const response = await api.get("/auth/me");
    return response.data;
  },

  async updateProfile(data: UpdateProfileData) {
    const response = await api.put("/auth/profile", data);
    return response.data;
  },
};
