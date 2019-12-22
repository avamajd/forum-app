import { GET_FORUM_DISCUSSONS, CREATE_DISCUSSON, RESET_ERROR } from "../constants";

export const getForumDiscussions = (forumId) => {
  return {
    type: GET_FORUM_DISCUSSONS,
    forumId
  };
};

export const createDiscussion = (forumId, title, content, token) => {
  return {
    type: CREATE_DISCUSSON,
    forumId,
    title,
    content,
    token
  };
};


export const resetError = () => {
  return {
    type: RESET_ERROR,
  };
};


