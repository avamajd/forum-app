import { LOGIN, LOGOUT, REGISTER, RESET_ERRORS } from "../constants";

export const login = (email, password) => {
  return {
    type: LOGIN,
    email,
    password
  };
};

export const logout = () => {
  return {
    type: LOGOUT
  };
};


export const register = (name, email, password) => {
  return {
    type: REGISTER,
    name,
    email,
    password
  };
};

export const resetErrors = () => {
  return {
    type: RESET_ERRORS,
  };
};