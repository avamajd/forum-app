import {
  LOGIN, LOGIN_COMPLETE, LOGIN_ERROR, LOGOUT,
  REGISTER, REGISTER_COMPLETE, REGISTER_ERROR,
  RESET_ERRORS
} from "../constants";
// import { REHYDRATE } from "redux-persist/es/constants";

import { persist } from "../store/persist";

const initialState = {
  isFetching: false,
  isAuthenticated: false,
  // // username -> email#
  // username: "",
  name: "",
  token: "",
  errors: {},
  regErrors: {},
  registeredUser: {},
  registerSuccess: false
};

export const authReducer = function (state = initialState, action) {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isFetching: true,
        isAuthenticated: false,
        errors: {}
      };

    case LOGIN_COMPLETE:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: true,
        token: action.token
      };

    case LOGIN_ERROR:
      return {
        ...state,
        isFetching: false,
        isAuthenticated: false,
        errors: action.errors
      };

    case LOGOUT:
      return {
        ...initialState
      };

    //**************************************************

    case REGISTER:
      return {
        ...state,
        isFetching: true,
        registerSuccess: false,
        regErrors: {}
      };

    case REGISTER_COMPLETE:
      return {
        ...state,
        isFetching: false,
        registeredUser: action.user,
        registerSuccess: true
      };

    case REGISTER_ERROR:
      return {
        ...state,
        isFetching: false,
        regErrors: action.errors,
        registerSuccess: false
      };

    case RESET_ERRORS:
      return {
        ...state,
        errors: {},
        regErrors: {},
      };

    // case REHYDRATE:
    //   return state.token  && state.username ? { ...state } : {};

    default:
      return state;
  }
};

export default persist("authReducer", ["token"], authReducer);
