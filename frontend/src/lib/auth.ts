import { api } from "../lib/apiClient";
import type { ApiResponse, User } from "../types";

type LoginPayload = {
  username: string;
  password: string;
};

type LoginData = {
  token: string;
  user: User;
};

export const loginApi = async (payload: LoginPayload) => {
  const res = await api.post<ApiResponse<LoginData>>("/auth/login", payload);
  return res.data; 
};

type RegisterPayload = {
  username: string;
  password: string;
};

export const registerApi = async (payload: RegisterPayload) => {
  const res = await api.post<ApiResponse<User>>("/auth/register", payload);
  return res.data;
};
