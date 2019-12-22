import { takeEvery, call, put } from "redux-saga/effects";
import { LOGIN, LOGIN_COMPLETE, LOGIN_ERROR, REGISTER, REGISTER_COMPLETE, REGISTER_ERROR } from "../constants";
import jwt_decode from "jwt-decode";

const baseUrl = "http://localhost:5000/api/users";

function loginRequest(email, password) {
  let uri = `${baseUrl}/login`;

  return fetch(uri, {
    // mode: "no-cors",
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email,
      password
    })
  })
}

function* loginUser(action) {
  let errors = {};
  try {
    let { email, password } = action;
    const response = yield call(loginRequest, email, password);
    const result = yield response.json();

    if (result.errors && Object.keys(result.errors).length !== 0) {
      errors = result.errors;
      yield put({ type: LOGIN_ERROR, errors });
    } else {
      const decoded = yield jwt_decode(result.token);
      yield put({ type: LOGIN_COMPLETE, token: result.token, name: decoded.name });
    }
  } catch (err) {
    yield put({ type: LOGIN_ERROR, errors: err });
  }
}

/**********************************************************************/

function registerRequest(name, email, password) {
  let uri = `${baseUrl}/register`;

  return fetch(uri, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      name,
      email,
      password
    })
  })
}

function* registerUser(action) {
  let errors = {};
  try {
    let { name, email, password } = action;
    const response = yield call(registerRequest, name, email, password);
    const result = yield response.json();

    if (result.errors && Object.keys(result.errors).length !== 0) {
      errors = result.errors;
      yield put({ type: REGISTER_ERROR, errors });
    } else {
      yield put({ type: REGISTER_COMPLETE, user: result });
    }
  } catch (err) {
    yield put({ type: REGISTER_ERROR, errors: err });
  }
}

/**********************************************************************/

export const authSaga = [
  takeEvery(LOGIN, loginUser),
  takeEvery(REGISTER, registerUser)
];
