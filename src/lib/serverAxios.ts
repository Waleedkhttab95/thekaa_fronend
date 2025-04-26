import { API_BASE_URL } from "@/config/env.constant";
import axios from "axios";
import { cookies } from "next/headers";
export async function getAccessTokenFromServer() {
  const cookieStore = await cookies();
  return cookieStore.get("Authentication")?.value;
}
export const axiosAuthServer = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});
axiosAuthServer.interceptors.request.use(
  async (config) => {
    /// get cookies
    const accessToken = await getAccessTokenFromServer();
    if (!config.headers["Authorization"])
      config.headers["Authorization"] = `${accessToken}`;
    return config;
  },
  (error) => Promise.reject(error)
);
