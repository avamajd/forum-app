import { all } from "redux-saga/effects";
import { authSaga } from "./authSaga";
import { forumSaga } from "./forumSaga";
import { discussionSaga } from "./discussionSaga";

function* root() {
  yield all([...authSaga, ...forumSaga, ...discussionSaga]);
}

export default root;
