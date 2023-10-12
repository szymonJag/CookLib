import { createContext, useContext, useState } from 'react';
import { IUser } from '../interfaces/IUser';
import { useNavigate } from 'react-router-dom';
// import { DefaultUser } from '../utils/data';

interface UserContextType {
  user: IUser | null;
  token: string;
  setAuthToken: (username: string, password: string) => void;
  // login: () => void;
  login: (user: IUser) => void;
  logout: () => void;
  setAvatarUrl: (url: string) => void;
  toggleFavouriteRecipe: (id: number) => void;
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
  setAvatarUrl: () => null,
  toggleFavouriteRecipe: () => null,
});

function UserProvider({ children }: UserProviderProps) {
  const [userData, setUserData] = useState<IUser | null>(null);
  const [token, setToken] = useState<string>('');

  const navigate = useNavigate();

  const setAuthToken = (username: string, password: string) => {
    const base64Credentials = btoa(username + ':' + password);
    console.log(`base64Credentials`, base64Credentials);
    setToken(base64Credentials);
    console.log(`token chuj`, token);
  };

  // const login = () => {
  //   setUserData(DefaultUser);
  //   setToken('dGVzdDE6Z3Qzb3Ay');
  //   console.log(`token`, token);
  // };

  const login = (user: IUser) => {
    setUserData(user);
    console.log(`token`, token);
  };

  const logout = () => {
    setUserData(null);
    setToken('');
    navigate(`/recipes`);
  };

  const setAvatarUrl = (url: string) => {
    if (userData) {
      const updatedUserData: IUser = { ...userData, avatarURL: url };
      setUserData(updatedUserData);
    }
  };

  const toggleFavouriteRecipe = (id: number) => {
    if (userData) {
      const isFavourite = userData.favouritesRecipesId.includes(id);
      const fav = [...userData.favouritesRecipesId];
      const newFavouritesList = isFavourite
        ? fav.filter((favId) => favId !== id)
        : [...fav, id];
      const updatedData: IUser = {
        ...userData,
        favouritesRecipesId: newFavouritesList,
      };
      setUserData(updatedData);
    }
  };

  return (
    <UserContext.Provider
      value={{
        user: userData,
        login,
        logout,
        token,
        setAuthToken,
        setAvatarUrl,
        toggleFavouriteRecipe,
      }}
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
