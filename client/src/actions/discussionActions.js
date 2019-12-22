import { GET_FORUM_DISCUSSONS, CREATE_DISCUSSON } from "../constants";

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


