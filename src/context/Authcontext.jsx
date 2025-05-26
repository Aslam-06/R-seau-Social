import { createContext, useEffect, useState } from "react";
import { 
  getUserFromStorage, saveUserToStorage, removeUserFromStorage,
  getUsersFromStorage, saveUsersToStorage
} from "../utils/storage";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null); 

  useEffect(() => {
    const connectedUser = getUserFromStorage();
    if (connectedUser) setUser(connectedUser);
  }, []);

  const registeruser = (userData) => {
    const users = getUsersFromStorage();

    const userExists = users.some(u => u.email === userData.email);
    if (userExists) {
      setError("Cet email est déjà utilisé");
      return false;
    }

    const newUser = { ...userData, username: userData.email };
    users.push(newUser);
    saveUsersToStorage(users);

    setUser(newUser);
    saveUserToStorage(newUser);
    setError(null);
    return true;
  };

  const loginuser = (userData) => {
    const users = getUsersFromStorage();
    const foundUser = users.find(
      u => u.email === userData.email && u.password === userData.password
    );

    if (!foundUser) {
      setError("Email ou mot de passe incorrect");
      return false;
    }

    setUser(foundUser);
    saveUserToStorage(foundUser);
    setError(null);
    return true;
  };

  const logout = () => {
    setUser(null);
    removeUserFromStorage();
    setError(null);
  };

  return (
    <AuthContext.Provider value={{ user, error, loginuser, registeruser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};