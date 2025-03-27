/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosAuthClient } from "@/lib/axios";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { deleteCookie, getCookie } from "cookies-next/client";
import { logout } from "@/services/auth";
export const useAxiosAuth = () => {
  const router = useRouter();
  const accessToken = getCookie("token");
  useEffect(() => {
    const reqIntercept = axiosAuthClient.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"])
          config.headers["Authorization"] = `Bearer ${accessToken}`;

        return config;
      },
      (error) => Promise.reject(error)
    );
    const resIntercept = axiosAuthClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevReq = error.config;
        if (error.response && error.response.status === 401 && !prevReq.sent) {
          prevReq.sent = true;
          try {
            await logout(axiosAuthClient);
            deleteCookie("token");
            deleteCookie("role");
            // redirect to login page
            router.replace("/login");
          } catch (error: any) {
            return Promise.reject(error);
          }
          return axiosAuthClient(prevReq);
        }
        return Promise.reject(error);
      }
    );
    return () => {
      axiosAuthClient.interceptors.request.eject(reqIntercept);
      axiosAuthClient.interceptors.response.eject(resIntercept);
    };
  }, [accessToken]);
  return axiosAuthClient;
};
