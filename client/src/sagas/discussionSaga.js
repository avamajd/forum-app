import { takeEvery, call, put } from "redux-saga/effects";
import {
  GET_FORUM_DISCUSSONS, GET_FORUM_DISCUSSONS_COMPLETE, GET_FORUM_DISCUSSONS_ERROR,
  CREATE_DISCUSSON, CREATE_DISCUSSON_COMPLETE, CREATE_DISCUSSON_ERROR
} from "../constants";

const baseUrl = "http://localhost:5000/api/discussions";

function createDiscussionRequest(forumId, title, content, token) {
  let uri = `${baseUrl}/${forumId}`;

  return fetch(uri, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `${token}`
    },
    body: JSON.stringify({
      title,
      content
    })
  })
}

function* addDiscussion(action) {
  let error = {};
  try {
    let { forumId, title, content, token } = action;
    const response = yield call(createDiscussionRequest, forumId, title, content, token);
    const result = yield response.json();

    if (result.error && Object.keys(result.error).length !== 0) {
      error = result.error.discussion;
      yield put({ type: CREATE_DISCUSSON_ERROR, error });
    } else {
      yield put({ type: CREATE_DISCUSSON_COMPLETE, discussion: result.discussion });
    }
  } catch (err) {
    yield put({ type: CREATE_DISCUSSON_ERROR, error: err });
  }
}

/**********************************************************************/

function fetchDiscussions(forumId) {
  let uri = `${baseUrl}/${forumId}`;

  return fetch(uri, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
}

function* getDiscussions(action) {
  let error = {};
  try {
    const { forumId } = action;
    const response = yield call(fetchDiscussions, forumId);
    const result = yield response.json();

    if (result.error && Object.keys(result.error).length !== 0) {
      error = result.error.discussion;
      yield put({ type: GET_FORUM_DISCUSSONS_ERROR, error });
    } else {
      yield put({ type: GET_FORUM_DISCUSSONS_COMPLETE, discussions: result });
    }
  } catch (err) {
    yield put({ type: GET_FORUM_DISCUSSONS_ERROR, error: err });
  }
}

/**********************************************************************/

export const discussionSaga = [
  takeEvery(GET_FORUM_DISCUSSONS, getDiscussions),
  takeEvery(CREATE_DISCUSSON, addDiscussion),
];
