import { AxiosInstance } from "axios";
import { setCookie } from "cookies-next/client";

export const login = async (
  axiosClient: AxiosInstance,
  data: { email: string; password: string }
) => {
  const response = await axiosClient.post("/auth/login", data);

  const token = response.data.token;
  if (token) {
    setCookie("Authentication", token, {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  }

  return response.data;
};

export const getUser = async (axiosClient: AxiosInstance) => {
  const response = await axiosClient.get("/auth/user");
  return response.data;
};

export const verifyAccount = async (
  axiosClient: AxiosInstance,
  data: { email: string; otp: string }
) => {
  const response = await axiosClient.post("/auth/otp/verify", data);
  const token = response.data.token;
  if (token) {
    setCookie("Authentication", token, {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  }

  return response.data;
};
