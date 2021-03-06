import {
  GET_FORUM_DISCUSSONS, GET_FORUM_DISCUSSONS_COMPLETE, GET_FORUM_DISCUSSONS_ERROR,
  CREATE_DISCUSSON, CREATE_DISCUSSON_COMPLETE, CREATE_DISCUSSON_ERROR,
  RESET_ERROR
} from "../constants";

const initialState = {
  isFetching: false,
  discussions: [],
  error: "",
  createSuccess: false,
  deleteSuccess: false
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_FORUM_DISCUSSONS:
      return {
        ...state,
        isFetching: true,
        createSuccess: false,
        error: ""
      };

    case GET_FORUM_DISCUSSONS_COMPLETE:
      return {
        ...state,
        isFetching: false,
        discussions: action.discussions
      };
    case GET_FORUM_DISCUSSONS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error
      }

    //******************************************

    case CREATE_DISCUSSON:
      return {
        ...state,
        isFetching: true,
        createSuccess: false,
        error: ""
      };

    case CREATE_DISCUSSON_COMPLETE:
      return {
        ...state,
        isFetching: false,
        discussions: [...state.discussions, action.discussion],
        createSuccess: true
      };

    case CREATE_DISCUSSON_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.error,
        createSuccess: false
      }

    case RESET_ERROR:
      return {
        ...state,
        error: ""
      };

    //******************************************

    default:
      return state;
  };
}
