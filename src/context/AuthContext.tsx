import { createContext, useContext, ReactNode } from "react";
import { getUser } from "@/services/auth";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAxiosAuth } from "@/hooks/useAxiosAuth";
import { deleteCookie } from "cookies-next/client";

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

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const axiosAuth = useAxiosAuth();
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ["auth", "user"],
    queryFn: () => getUser(axiosAuth),
    retry: false,
    refetchOnWindowFocus: false,
  });

  console.log("User Data: ", user);

  const logout = () => {
    deleteCookie("Authentication");
    deleteCookie("current_user");
    queryClient.setQueryData(["auth", "user"], null);
  };

  return (
    <AuthContext.Provider value={{ user: user ?? null, isLoading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
