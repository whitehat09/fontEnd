import { call, put } from "redux-saga/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { SagaIterator } from "redux-saga";
import quizApi from "../../api/quizApi";


export function* getDataQuizSaga(
  action: PayloadAction<string>
): SagaIterator<void> {
  try {
    const data = action.payload;
    console.log('quizsaga',data)
    const res = yield call(quizApi.getData, data);
    // yield put({
    //   type: getDataQuizFormSaga.type,
    //   payload: res,
    // });
  } catch (error: any) {
    
    // yield put({
    //   type: errorQuiz.type,
    //   payload: error.response.data,
    // });
  }
}

