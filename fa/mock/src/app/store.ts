import { configureStore } from "@reduxjs/toolkit";

import createSagaMiddleware from "redux-saga";
import { rootSaga } from "./rootSaga";

import authSlice from "../features/auth/authSlice";

import shopingCartSlice from "../features/shopingCart/shopingCartSlice";
import productsSlice from "../features/products/productsSlice";
import adminSlice from "../features/admin/adminSlice";

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer: {
    authReducer:authSlice,
    shopingCartReducer:shopingCartSlice,
    productsReducer: productsSlice,
    adminReducer: adminSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
 