import { AxiosInstance } from "axios";

export const logout = async (axiosClient: AxiosInstance) => {
  await axiosClient.post("/auth/auth/logout");
};
