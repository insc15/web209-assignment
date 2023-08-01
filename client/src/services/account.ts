import ApiResponse from "@/interfaces/ApiResponse";
import IUser from "@/interfaces/IUser";
import instance from "./instance";

export const login = (email: string, password: string) => {
  return instance.post("/signin", { email, password });
};

export const register = (accountData: IUser) => {
  return instance.post("/signup", accountData);
};

export const getUser = (id: string) => {
  return instance.get(`/users/${id}`);
};

export const updateUser = (id: string, accountData: ApiResponse) => {
  return instance.put(`/users/${id}`, accountData);
};

export const deleteUser = (id: string) => {
  return instance.delete(`/users/${id}`);
};

