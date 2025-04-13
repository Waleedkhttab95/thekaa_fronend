import { createContext, useContext, ReactNode } from "react";
import { getUser, logout as logoutService } from "@/services/auth";
import { axiosAuthClient } from "@/lib/axios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

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
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = useQueryClient();

  const { data: user, isLoading } = useQuery<User | null>({
    queryKey: ["auth", "user"],
    queryFn: () => getUser(axiosAuthClient),
    retry: false,
    refetchOnWindowFocus: false,
  });

  console.log("User Data: ", user);

  const logout = async () => {
    await logoutService(axiosAuthClient);
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
