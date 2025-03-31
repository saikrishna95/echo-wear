
import React, { createContext, useState, useContext, useEffect, ReactNode } from "react";
import { User } from "@/types";

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string, rememberMe: boolean) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => false,
  logout: () => {},
  isAuthenticated: false,
});

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Load user from storage on initial load
  useEffect(() => {
    const loadUserFromStorage = () => {
      const storedUser = localStorage.getItem("user") || sessionStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
      setIsLoading(false);
    };
    
    loadUserFromStorage();
  }, []);

  // Mock login function
  const login = async (email: string, password: string, rememberMe: boolean): Promise<boolean> => {
    // Simple mock validation
    if (email === "test@example.com" && password === "password") {
      const newUser: User = {
        id: "1",
        name: "Test User",
        email: email,
      };
      
      setUser(newUser);
      
      // Store in appropriate storage based on remember me
      if (rememberMe) {
        localStorage.setItem("user", JSON.stringify(newUser));
      } else {
        sessionStorage.setItem("user", JSON.stringify(newUser));
        localStorage.removeItem("user");
      }
      
      return true;
    }
    
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    sessionStorage.removeItem("user");
  };

  // Avoid rendering until the initial authentication check is complete
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout,
      isAuthenticated: !!user
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
