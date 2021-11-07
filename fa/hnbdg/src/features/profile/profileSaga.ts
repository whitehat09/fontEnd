import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";
import { call, put } from "redux-saga/effects";
import profileApi from "../../api/profileApi";
import {
  errorMessage,
  getProfileFromSaga,
  updateUserFromSaga,
} from "./profileSlice";

export function* getProfileSaga(
  action: PayloadAction<string>
): SagaIterator<void> {
  try {
    const res = yield call(profileApi.getProfile, action.payload);
    yield put({
      type: getProfileFromSaga.type,
      payload: res.profile,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* updateUserSaga(
  action: PayloadAction<any>
): SagaIterator<void> {
  try {
    const res = yield call(profileApi.updateUser, action.payload);
    yield put({
      type: updateUserFromSaga.type,
      payload: res.user,
    });
  } catch (error: any) {
    yield put({
      type: errorMessage.type,
      payload: error.response.data.errors,
    });
  }
}
