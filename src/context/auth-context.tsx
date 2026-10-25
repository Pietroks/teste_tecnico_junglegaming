import { createContext, useContext, useState, type ReactNode } from "react";

export interface UserProfile {
  name: string;
  email: string;
  username?: string;
}

interface AuthContextType {
  isAuthenticated: boolean;
  user: UserProfile | null;
  login: (userData?: Partial<UserProfile>) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    try {
      return localStorage.getItem("handson_auth") === "true";
    } catch {
      return false;
    }
  });

  const [user, setUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem("handson_user");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (
          parsed.name?.toLowerCase().includes("satoshi") ||
          parsed.username?.toLowerCase().includes("satoshi") ||
          parsed.email?.toLowerCase().includes("satoshi")
        ) {
          localStorage.removeItem("handson_user");
          return null;
        }
        return parsed;
      }
      return null;
    } catch {
      return null;
    }
  });

  const login = (userData?: Partial<UserProfile>) => {
    const defaultUser: UserProfile = {
      name: userData?.name || "",
      email: userData?.email || "",
      username: userData?.username || "",
    };
    setIsAuthenticated(true);
    setUser(defaultUser);
    try {
      localStorage.setItem("handson_auth", "true");
      localStorage.setItem("handson_user", JSON.stringify(defaultUser));
    } catch {
      // storage unavailable
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null);
    try {
      localStorage.removeItem("handson_auth");
      localStorage.removeItem("handson_user");
    } catch {
      // storage unavailable
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
