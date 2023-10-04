import { createContext, useContext, useState } from 'react';
import { IUser } from '../interfaces/IUser';
import { useNavigate } from 'react-router-dom';

interface UserContextType {
  user: IUser | null;
  token: string;
  setAuthToken: (username: string, password: string) => void;
  login: (user: IUser) => void;
  logout: () => void;
}

interface UserProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<UserContextType>({
  user: null,
  token: '',
  setAuthToken: () => null,
  login: () => null,
  logout: () => null,
});

function UserProvider({ children }: UserProviderProps) {
  const [userContext, setUserContext] = useState<IUser | null>(null);
  const [token, setToken] = useState<string>('');

  const navigate = useNavigate();

  const setAuthToken = (username: string, password: string) => {
    const base64Credentials = btoa(username + ':' + password);
    setToken(base64Credentials);
  };

  const login = (user: IUser) => {
    setUserContext(user);
  };

  const logout = () => {
    setUserContext(null);
    setToken('');
    navigate(`/recipes`);
  };

  return (
    <UserContext.Provider
      value={{ user: userContext, login, logout, token, setAuthToken }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUserContext() {
  const context = useContext(UserContext);
  if (context === undefined)
    throw new Error('useUserContext must be used within a UserProvider');

  return context;
}

export { UserProvider, useUserContext };
