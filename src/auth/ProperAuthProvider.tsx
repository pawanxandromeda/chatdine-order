import React, { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { accessTokenAtom, userAtom, User } from '@/atoms/userAtom';
import { useAtom } from 'jotai';

interface AuthContextType {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  setUser: (user: User | null) => void;
  setAccessToken: (token: string | null) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const ProperAuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useAtom(userAtom);
  const [accessToken, setAccessToken] = useAtom(accessTokenAtom);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    setIsAuthenticated(!!accessToken);
  }, [accessToken]);

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        isAuthenticated,
        setUser,
        setAccessToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useProperAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useProperAuth must be used within ProperAuthProvider');
  return context;
};
