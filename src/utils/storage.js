const USERS_KEY = "users";
const CURRENT_USER_KEY = "social_user";

export const getUsersFromStorage = () => {
  const data = localStorage.getItem(USERS_KEY);
  return data ? JSON.parse(data) : [];
};

export const saveUsersToStorage = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

export const getUserFromStorage = () => {
  const data = localStorage.getItem(CURRENT_USER_KEY);
  return data ? JSON.parse(data) : null;
};

export const saveUserToStorage = (user) => {
  localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(user));
};

export const removeUserFromStorage = () => {
  localStorage.removeItem(CURRENT_USER_KEY);
};