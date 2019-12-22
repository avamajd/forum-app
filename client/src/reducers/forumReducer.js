import {
  GET_ALL_FORUMS, GET_ALL_FORUMS_COMPLETE, GET_ALL_FORUMS_ERROR,
  CREATE_FORUM, CREATE_FORUM_COMPLETE, CREATE_FORUM_ERROR,
  DELETE_FORUM, DELETE_FORUM_COMPLETE, DELETE_FORUM_ERROR
} from "../constants";

const initialState = {
  isFetching: false,
  forums: [],
  error: "",
  createSuccess: false,
  deleteSuccess: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ALL_FORUMS:
      return {
        ...state,
        isFetching: true,
        error: ""

      };
    case GET_ALL_FORUMS_COMPLETE:
      return {
        ...state,
        isFetching: false,
        forums: action.forums
      };
    case GET_ALL_FORUMS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }

    //******************************************

    case CREATE_FORUM:
      return {
        ...state,
        isFetching: true,
        error: "",
        createSuccess: false
      };
    case CREATE_FORUM_COMPLETE:
      return {
        ...state,
        isFetching: false,
        forums: [...state.forums, action.forum],
        createSuccess: true
      };
    case CREATE_FORUM_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
        createSuccess: false
      }

    //******************************************

    case DELETE_FORUM:
      return {
        ...state,
        isFetching: true,
        error: "",
        deleteSuccess: false
      };
    case DELETE_FORUM_COMPLETE:
      return {
        ...state,
        isFetching: false,
        // forums: action.forums,
        deleteSuccess: true
      };
    case DELETE_FORUM_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
        deleteSuccess: false
      }

    default:
      return state;
  };
}
