"use client";
import { useQuery } from "@tanstack/react-query";
import { useAxiosAuth } from "../useAxiosAuth";
import { getUser } from "@/services/auth";

export const PROFILE_QUERY = "profile";
export const useProfile = () => {
  const axiosAuth = useAxiosAuth();
  return useQuery({
    queryKey: [PROFILE_QUERY],
    queryFn: () => getUser(axiosAuth),
    gcTime: 1000 * 60 * 30, // 30 minutes
    staleTime: 1000 * 60 * 15, // 15 minutes
  });
};
