"use client";

import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQueryClient } from "@tanstack/react-query";
import { axiosClient } from "@/lib/axios";

// todo: User type still needs work

type User = {
  _id: string;
  email: string;
  password: string;
  googleId: string;
  provider: string;
  isActive: boolean;
  students: unknown[];
  isParent: boolean;
  parentId: number;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  loginLoading: boolean;
  login: (credentials: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loginLoading, setLoginLoading] = useState(false);
  const queryClient = useQueryClient();

  // Fetch user session on app load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axiosClient.get("/auth/user");
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };
    fetchUser();
  }, []);

  // Login function
  const login = async (credentials: { email: string; password: string }) => {
    setLoginLoading(true);
    try {
      await axiosClient.post("/auth/login", credentials);
      const { data } = await axiosClient.get("/auth/user");
      setUser(data);
      queryClient.invalidateQueries({ queryKey: ["user"] });
    } finally {
      setLoginLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    await axiosClient.post("/auth/logout");
    setUser(null);
    queryClient.invalidateQueries({ queryKey: ["user"] });
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, loginLoading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
