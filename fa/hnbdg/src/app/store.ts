import { configureStore } from "@reduxjs/toolkit";
import loginSlice from "../features/Login/loginSlice";
import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./rootSaga";
import articleSlice from "../features/articles/articleSlice";
import profileSlice from "../features/profile/profileSlice";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    login: loginSlice,
    articleReducer: articleSlice,
    profileReducer: profileSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
