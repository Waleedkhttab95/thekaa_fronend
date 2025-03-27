"use client";

import { API_BASE_URL } from "@/config/env.constant";
import axios from "axios";

export const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});
export const axiosAuthClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});
