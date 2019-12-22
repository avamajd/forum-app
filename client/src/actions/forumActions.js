import { CREATE_FORUM, GET_ALL_FORUMS, DELETE_FORUM } from "../constants";

export const createForum = (title) => {
  return {
    type: CREATE_FORUM,
    title
  };
};

export const deleteForum = (id) => {
  return {
    type: DELETE_FORUM,
    id
  };
};

export const getAllForums = () => {
  return {
    type: GET_ALL_FORUMS
  };
};
