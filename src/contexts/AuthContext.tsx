import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { authService, SignInData, SignUpData } from "../services/auth.service";

interface AuthContextType {
  isAuthenticated: boolean;
  token: string | null;
  login: (data: SignInData) => Promise<void>;
  signup: (data: SignUpData) => Promise<void>;
  logout: () => void;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  const login = async (data: SignInData) => {
    const response = await authService.signIn(data);
    const newToken = response.token;
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const signup = async (data: SignUpData) => {
    await authService.signUp(data);
    // Auto login after signup
    await login({ email: data.email, password: data.password });
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated: !!token,
        token,
        login,
        signup,
        logout,
        loading,
      }}
    >
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

