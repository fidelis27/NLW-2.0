import React, { createContext, useState, useEffect, useContext } from 'react';
import * as auth from '../services/auth';

interface User {
  email: string;
  password: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  signIn(email: string, username: string): Promise<void>;
  signOut(): void;
  handleToggleRemember(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [remember, setRemember] = useState(false);

  useEffect(() => {
    async function loadStoragedData() {
      const storagedUser = await localStorage.getItem('@proffy:user');
      const storagedToken = await localStorage.getItem('@proffy:token');

      if (storagedUser && storagedToken) {
        setUser(JSON.parse(storagedUser));
      }
    }

    loadStoragedData();
  }, []);

  function handleToggleRemember() {
    setRemember(!remember);
  }

  async function signIn(email: string, password: string) {
    const response = await auth.signIn(email, password);

    setUser(response.user);
    localStorage.setItem('@proffy:user', JSON.stringify(response.user));
    localStorage.setItem('@proffy:token', response.token);

    if (remember) {
      localStorage.setItem(
        '@proffy:userRemember',
        JSON.stringify(response.user),
      );
    } else {
      localStorage.setItem('@proffy:userRemember', '');
    }
  }

  function signOut() {
    localStorage.setItem('@proffy:user', '');
    localStorage.setItem('@proffy:token', '');
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ signed: !!user, user, signOut, signIn, handleToggleRemember }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextData => {
  const context = useContext(AuthContext);
  return context;
};
