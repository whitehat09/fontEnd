import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";
import loginApi from "../../api/loginApi";
import {
  errorLogin,
  errorSignup,
  signupUserFormSaga,
  userLoginFormSaga,
} from "./loginSlice";
import signupApi from "../../api/signupApi";

export function* userLoginSaga(
  action: PayloadAction<string>
): SagaIterator<void> {
  try {
    const data = action.payload;
    const res = yield call(loginApi.userLogin, data);
    yield put({
      type: userLoginFormSaga.type,
      payload: res,
    });
  } catch (error: any) {
    yield put({
      type: errorLogin.type,
      payload: error.response.data.errors,
    });
  }
}
export function* userSignUpSaga(
  action: PayloadAction<any>
): SagaIterator<void> {
  try {
    const data = action.payload;
    const res = yield call(signupApi.userSignup, data);
    yield put({
      type: signupUserFormSaga.type,
      payload: res,
    });
  } catch (error: any) {
    yield put({
      type: errorSignup.type,
      payload: error.response.data.errors,
    });
  }
}
