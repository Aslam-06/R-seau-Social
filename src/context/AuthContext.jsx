import { createContext, useState, useEffect } from "react";

// Fonctions pour gérer le localStorage
const getUserFromStorage = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

const saveUserToStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const removeUserFromStorage = () => {
  localStorage.removeItem('user');
};

const getUsersFromStorage = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};

const saveUsersToStorage = (users) => {
  localStorage.setItem('users', JSON.stringify(users));
};

// Création du contexte d'authentification
export const AuthContext = createContext(null);

// Provider qui englobe l'application
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const connectedUser = getUserFromStorage();
    if (connectedUser) setUser(connectedUser);
  }, []);

  const registerUser = (userData) => {
    const users = getUsersFromStorage();

    const userExists = users.some(u => u.email === userData.email);
    if (userExists) {
      setError("Cet email est déjà utilisé");
      return false;
    }

    const newUser = { ...userData, username: userData.email, id: Date.now() }; // ajout d'un id unique
    users.push(newUser);
    saveUsersToStorage(users);

    setUser(newUser);
    saveUserToStorage(newUser);
    setError(null);
    return true;
  };

  const loginUser = (userData) => {
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
    <AuthContext.Provider value={{ user, error, loginUser, registerUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};