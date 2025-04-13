import { AxiosInstance } from "axios";

export const logout = async (axiosClient: AxiosInstance) => {
  const res = await axiosClient.post("/auth/logout");
  console.log("logout res: ", res);
};

export const login = async (
  axiosClient: AxiosInstance,
  data: { email: string; password: string }
) => {
  const response = await axiosClient.post("/auth/login", data);
  return response.data;
};

export const getUser = async (axiosClient: AxiosInstance) => {
  const response = await axiosClient.get("/auth/user");
  return response.data;
};
