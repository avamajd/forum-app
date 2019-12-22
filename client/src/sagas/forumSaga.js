import { takeEvery, call, put } from "redux-saga/effects";
import {
  CREATE_FORUM, CREATE_FORUM_COMPLETE, CREATE_FORUM_ERROR,
  GET_ALL_FORUMS, GET_ALL_FORUMS_COMPLETE, GET_ALL_FORUMS_ERROR,
  DELETE_FORUM, DELETE_FORUM_COMPLETE, DELETE_FORUM_ERROR
} from "../constants";
// import jwt_decode from "jwt-decode";

const baseUrl = "http://localhost:5000/api/forums";

function createForumRequest(title) {
  let uri = `${baseUrl}/create`;

  return fetch(uri, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      title
    })
  })
}

function* addForum(action) {
  let error = {};
  try {
    let { title } = action;
    const response = yield call(createForumRequest, title);
    const result = yield response.json();

    if (result.error && Object.keys(result.error).length !== 0) {
      error = result.error.forum;
      yield put({ type: CREATE_FORUM_ERROR, error });
    } else {
      yield put({ type: CREATE_FORUM_COMPLETE, forum: result.forum });
    }
  } catch (err) {
    yield put({ type: CREATE_FORUM_ERROR, error: err });
  }
}

/**********************************************************************/

function deleteForumRequest(id) {
  let uri = `${baseUrl}/${id}`;

  return fetch(uri, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
  })
}

function* removeForum(action) {
  let error = {};
  try {
    let { id } = action;
    const response = yield call(deleteForumRequest, id);
    const result = yield response.json();

    if (result.error && Object.keys(result.error).length !== 0) {
      error = result.error.forum;
      yield put({ type: DELETE_FORUM_ERROR, error });
    } else {
      yield put({ type: DELETE_FORUM_COMPLETE });
    }
  } catch (err) {
    yield put({ type: DELETE_FORUM_ERROR, error: err });
  }
}

/**********************************************************************/

function fetchFroums() {
  let uri = `${baseUrl}/all`;

  return fetch(uri, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    }
  })
}

function* getAllForumsData(action) {
  let error = {};
  try {
    const response = yield call(fetchFroums);
    const result = yield response.json();

    if (result.error && Object.keys(result.error).length !== 0) {
      error = result.error.forum;
      yield put({ type: GET_ALL_FORUMS_ERROR, error });
    } else {
      yield put({ type: GET_ALL_FORUMS_COMPLETE, forums: result });
    }
  } catch (err) {
    yield put({ type: GET_ALL_FORUMS_ERROR, error: err });
  }
}

/**********************************************************************/

export const forumSaga = [
  takeEvery(CREATE_FORUM, addForum),
  takeEvery(GET_ALL_FORUMS, getAllForumsData),
  takeEvery(DELETE_FORUM, removeForum),
  takeEvery(DELETE_FORUM_COMPLETE, getAllForumsData),
];
