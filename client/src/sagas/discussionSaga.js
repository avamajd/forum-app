import { takeEvery, call, put } from "redux-saga/effects";
import {
  GET_FORUM_DISCUSSONS, GET_FORUM_DISCUSSONS_COMPLETE, GET_FORUM_DISCUSSONS_ERROR,
  CREATE_DISCUSSON, CREATE_DISCUSSON_COMPLETE, CREATE_DISCUSSON_ERROR
} from "../constants";

const baseUrl = "http://localhost:5000/api/discussions";

function createDiscussionRequest(forumId, title, content, token) {
  console.log("createDis", forumId, title, content)
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
    console.log("here", result)

    if (result.error && Object.keys(result.error).length !== 0) {
      error = result.error.discussion;
      yield put({ type: CREATE_DISCUSSON_ERROR, error });
    } else {
      yield put({ type: CREATE_DISCUSSON_COMPLETE, forum: result.forum });
    }
  } catch (err) {
    yield put({ type: CREATE_DISCUSSON_ERROR, error: err });
  }
}

// /**********************************************************************/

// function deleteForumRequest(id) {
//   console.log("createreq", id)
//   let uri = `${baseUrl}/${id}`;

//   return fetch(uri, {
//     method: "DELETE",
//     headers: {
//       Accept: "application/json",
//       "Content-Type": "application/json"
//     },
//   })
// }

// function* removeForum(action) {
//   let error = {};
//   try {
//     let { id } = action;
//     const response = yield call(deleteForumRequest, id);
//     const result = yield response.json();
//     console.log("here", result)

//     if (result.error && Object.keys(result.error).length !== 0) {
//       error = result.error.forum;
//       yield put({ type: DELETE_FORUM_ERROR, error });
//     } else {
//       yield put({ type: DELETE_FORUM_COMPLETE });
//     }
//   } catch (err) {
//     yield put({ type: DELETE_FORUM_ERROR, error: err });
//   }
// }

/**********************************************************************/

function fetchDiscussions(forumId) {
  console.log("createreq")
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
    console.log("discussionsData", result)

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
  // takeEvery(DELETE_FORUM, removeForum),
  // takeEvery(DELETE_FORUM_COMPLETE, getAllForumsData),
];
