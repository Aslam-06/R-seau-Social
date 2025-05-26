export const getUsersFromStorage = () => {
  const data = localStorage.getItem("users");
  return data ? JSON.parse(data) : [];
};

export const saveUsersToStorage = (users) => {
  localStorage.setItem("users", JSON.stringify(users));
};

export const getUserFromStorage = () => {
  const data = localStorage.getItem("social_user");
  return data ? JSON.parse(data) : null;
};

export const saveUserToStorage = (user) => {
  localStorage.setItem("social_user", JSON.stringify(user));
};

export const removeUserFromStorage = () => {
  localStorage.removeItem("social_user");
};
