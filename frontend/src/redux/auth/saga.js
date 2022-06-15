import { all, call, fork, put, takeEvery } from 'redux-saga/effects';
import { auth } from 'helpers/Firebase';
import { adminRoot, currentUser } from 'constants/defaultValues';
import { setCurrentUser } from 'helpers/Utils';
import axios from 'api/axios';
import jwt from 'jwt-decode'
import {
  LOGIN_USER,
  REGISTER_USER,
  LOGOUT_USER,
  FORGOT_PASSWORD,
  RESET_PASSWORD,
} from '../contants';

import {
  loginUserSuccess,
  loginUserError,
  registerUserSuccess,
  registerUserError,
  forgotPasswordSuccess,
  forgotPasswordError,
  resetPasswordSuccess,
  resetPasswordError,
} from './actions';

export function* watchLoginUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGIN_USER, loginWithEmailPassword);
}

const loginWithEmailPasswordAsync = async (email, password) =>
  // eslint-disable-next-line no-return-await
  await axios.post('/login',
  {
      email,
      password,
  },
  {
      headers: { "Content-Type" : "application/json" }
  })
    .then((user) => user)
    .catch((error) => error.response.data);

function* loginWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const loginUser = yield call(loginWithEmailPasswordAsync, email, password);
    if (loginUser.status) {
      const token = loginUser.data.access_token;
      const user = jwt(token);
      const toParse = user.sub;
      const userDetails = JSON.parse(toParse);
      const item1 = { id: userDetails.id,role: userDetails.role,name: userDetails.fullname, 
      email: userDetails.email,company: userDetails.company_id, supervisor: userDetails.working_uder,
      contact: userDetails.contact_no ,access_token: token };
      const item = item1;
      console.log(item);
      setCurrentUser(item);
      yield put(loginUserSuccess(item));
      history.push(adminRoot);  
    } else {
      yield put(loginUserError(loginUser.detail));
    }
  } catch (error) {
    yield put(loginUserError(error));
  }
}

export function* watchRegisterUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(REGISTER_USER, registerWithEmailPassword);
}

const registerWithEmailPasswordAsync = async (email, password) =>
  // eslint-disable-next-line no-return-await
  await auth
    .createUserWithEmailAndPassword(email, password)
    .then((user) => user)
    .catch((error) => error);

function* registerWithEmailPassword({ payload }) {
  const { email, password } = payload.user;
  const { history } = payload;
  try {
    const registerUser = yield call(
      registerWithEmailPasswordAsync,
      email,
      password
    );
    if (!registerUser.message) {
      const item = { uid: registerUser.user.uid, ...currentUser };
      setCurrentUser(item);
      yield put(registerUserSuccess(item));
      history.push(adminRoot);
    } else {
      yield put(registerUserError(registerUser.message));
    }
  } catch (error) {
    yield put(registerUserError(error));
  }
}

export function* watchLogoutUser() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(LOGOUT_USER, logout);
}

const logoutAsync = async (history) => {
  await auth
    .signOut()
    .then((user) => user)
    .catch((error) => error);
  history.push(adminRoot);
};

function* logout({ payload }) {
  const { history } = payload;
  setCurrentUser();
  yield call(logoutAsync, history);
}

export function* watchForgotPassword() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(FORGOT_PASSWORD, forgotPassword);
}

const forgotPasswordAsync = async (email) => 
  // eslint-disable-next-line no-return-await
 await axios
    .post('/resetpassword',{'email' : [email]})
    .then((user) => user)
    .catch((error) => error.response.data);
    


function* forgotPassword({ payload }) {
  const { email } = payload.forgotUserMail;
  try {
    const forgotPasswordStatus = yield call(forgotPasswordAsync, email);
    if (forgotPasswordStatus.status === 200) {
      yield put(forgotPasswordSuccess('success'));
    } else {
  
      yield put(forgotPasswordError(forgotPasswordStatus.detail));
    }
  } catch (error) {
    yield put(forgotPasswordError(error));
  }
}

export function* watchResetPassword() {
  // eslint-disable-next-line no-use-before-define
  yield takeEvery(RESET_PASSWORD, resetPassword);
}

const resetPasswordAsync = async (resetPasswordCode, newPassword) => {
  // eslint-disable-next-line no-return-await
  return await auth
    .confirmPasswordReset(resetPasswordCode, newPassword)
    .then((user) => user)
    .catch((error) => error);
};

function* resetPassword({ payload }) {
  const { newPassword, resetPasswordCode } = payload;
  try {
    const resetPasswordStatus = yield call(
      resetPasswordAsync,
      resetPasswordCode,
      newPassword
    );
    console.log(resetPasswordCode)
    if (!resetPasswordStatus) {
      yield put(resetPasswordSuccess('success'));
    } else {
      yield put(resetPasswordError(resetPasswordStatus.message));
    }
  } catch (error) {
    yield put(resetPasswordError(error));
  }
}

export default function* rootSaga() {
  yield all([
    fork(watchLoginUser),
    fork(watchLogoutUser),
    fork(watchRegisterUser),
    fork(watchForgotPassword),
    fork(watchResetPassword),
  ]);
}
