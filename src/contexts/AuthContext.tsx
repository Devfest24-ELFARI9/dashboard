"use client";

import { Session, User } from "lucia";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

// Define the user type


// Define the context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  session: Session | null;
  logout: () => void;
}

// Create the context with default value (undefined)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create a provider component to wrap the app
export const AuthProvider: React.FC<{
  user: User;
  session: Session;
  children: ReactNode;
}> = ({ user, session, children }) => {
  const [userState, setUser] = useState<User | null>(user);
  const [sessionState, setSession] = useState<Session | null>(session);

  const logout = () => {
    "use server";
    setUser(null);
    // localStorage.removeItem("token"); // Clear token as needed
  };

  return (
    <AuthContext.Provider value={{ user: userState, session: sessionState, isAuthenticated: user !== undefined,  logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
