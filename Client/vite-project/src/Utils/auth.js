// src/utils/auth.js

// Save JWT token to localStorage
export const saveToken = (token) => {
  localStorage.setItem("token", token);
};

// Retrieve JWT token from localStorage
export const getToken = () => {
  return localStorage.getItem("token");
};

// Remove JWT token (logout)
export const removeToken = () => {
  localStorage.removeItem("token");
};

// Check if user is logged in
export const isLoggedIn = () => {
  return !!getToken();
};