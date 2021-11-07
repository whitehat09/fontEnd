import { PayloadAction } from "@reduxjs/toolkit";
import moment from "moment";
import { SagaIterator } from "redux-saga";
import { call, delay, put } from "redux-saga/effects";
import articleApi from "../../api/articleApi";
import commentApi from "../../api/commentApi";
import favoriteApi from "../../api/favoriteApi";
import followApi from "../../api/followApi";
import {
  addCommentFromSaga,
  addNewArticleFromSaga,
  deleteArticleFromSaga,
  deleteCommentFromSaga,
  favoriteArticleFromSaga,
  followFromSaga,
  getArticleListFromSaga,
  getArticlesByTagFromSaga,
  getComentListFromSaga,
  getCurrentUserFromSaga,
  getFavoritedArticleListFromSaga,
  getMyArticleListFromSaga,
  getSpecificArticleFromSaga,
  getTagListFromSaga,
  getYourFeedListFromSaga,
  unfavoriteArticleFromSaga,
  unFollowFromSaga,
  updateArticleFromSaga,
} from "./articleSlice";

export function* getArticleListSaga(
  action: PayloadAction<any>
): SagaIterator<void> {
  try {
    yield delay(1000);
    const res = yield call(articleApi.getArticleList, action.payload);
    yield put({
      type: getArticleListFromSaga.type,
      payload: res,
    });
  } catch (error) {
    console.log("Some error when get article list: ", error);
  }
}

export function* getYourFeedListSaga(
  action: PayloadAction<any>
): SagaIterator<void> {
  try {
    const res = yield call(articleApi.getYourFeedList, action.payload);
    yield put({
      type: getYourFeedListFromSaga.type,
      payload: res,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* getTagListSaga(): SagaIterator<void> {
  try {
    const res = yield call(articleApi.getTagList);
    yield put({
      type: getTagListFromSaga.type,
      payload: res.tags,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* addNewArticleSaga(
  action: PayloadAction<any>
): SagaIterator<void> {
  try {
    const res = yield call(articleApi.addNewArticle, action.payload);
    yield put({
      type: addNewArticleFromSaga.type,
      payload: res.article,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* getCommentListSaga(
  action: PayloadAction<string>
): SagaIterator<void> {
  try {
    const res = yield call(commentApi.getComments, action.payload);
    const mappedData = res.comments.map((item: Comment) => {
      item.createdAt = moment(item.createdAt).format("MMMM Do YYYY, h:mm:ss");
      return item;
    });
    yield put({
      type: getComentListFromSaga.type,
      payload: mappedData,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* getSpecificArticleSaga(
  action: PayloadAction<string>
): SagaIterator<void> {
  try {
    const res = yield call(articleApi.getSpecificArticle, action.payload);
    res.article.createdAt = moment(res.article.createdAt).format("ll");
    yield put({
      type: getSpecificArticleFromSaga.type,
      payload: res.article,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* getCurrentUserSaga(): SagaIterator<void> {
  try {
    const res = yield call(articleApi.getCurrentUser);
    yield put({
      type: getCurrentUserFromSaga.type,
      payload: res.user,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* updateArticleSaga(
  action: PayloadAction<any>
): SagaIterator<void> {
  try {
    const res = yield call(articleApi.updateArticle, action.payload);
    yield put({
      type: updateArticleFromSaga.type,
      payload: res.article,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* deleteArticleSaga(
  action: PayloadAction<string>
): SagaIterator<void> {
  try {
    const slug = action.payload;
    yield call(articleApi.deleteArticle, slug);
    yield put({
      type: deleteArticleFromSaga.type,
      payload: slug,
    });
    window.location.href = "/";
  } catch (error) {
    console.log(error);
  }
}

export function* addCommentSaga(
  action: PayloadAction<any>
): SagaIterator<void> {
  try {
    const res = yield call(commentApi.addComment, action.payload);
    res.comment.createdAt = moment(res.comment.createdAt).format(
      "MMMM Do YYYY, h:mm:ss"
    );
    yield put({
      type: addCommentFromSaga.type,
      payload: res.comment,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* deleteCommentSaga(
  action: PayloadAction<any>
): SagaIterator<void> {
  try {
    yield call(commentApi.deleteComent, action.payload);
    yield put({
      type: deleteCommentFromSaga.type,
      payload: action.payload.id,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* followSaga(action: PayloadAction<string>): SagaIterator<void> {
  try {
    yield delay(1000);
    yield call(followApi.follow, action.payload);
    yield put({
      type: followFromSaga.type,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* unFollowSaga(
  action: PayloadAction<string>
): SagaIterator<void> {
  try {
    yield delay(1000);
    yield call(followApi.unFollow, action.payload);
    yield put({
      type: unFollowFromSaga.type,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* favoriteArticleSaga(
  action: PayloadAction<string>
): SagaIterator<void> {
  try {
    yield delay(1000);
    yield call(favoriteApi.favoriteArticle, action.payload);
    yield put({
      type: favoriteArticleFromSaga.type,
      payload: action.payload,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* unFavoriteArticleSaga(
  action: PayloadAction<string>
): SagaIterator<void> {
  try {
    yield delay(1000);
    yield call(favoriteApi.unfavoriteArticle, action.payload);
    yield put({
      type: unfavoriteArticleFromSaga.type,
      payload: action.payload,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* getArticlesByTagSaga(
  action: PayloadAction<string>
): SagaIterator<void> {
  try {
    const res = yield call(articleApi.getArticlesByTag, action.payload);
    yield put({
      type: getArticlesByTagFromSaga.type,
      payload: res,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* getMyArticleListSaga(
  action: PayloadAction<string>
): SagaIterator<void> {
  try {
    const res = yield call(articleApi.getMyArticleList, action.payload);
    yield put({
      type: getMyArticleListFromSaga.type,
      payload: res,
    });
  } catch (error) {
    console.log(error);
  }
}

export function* getFavoritedArticleListSaga(
  action: PayloadAction<string>
): SagaIterator<void> {
  try {
    const res = yield call(articleApi.getFavoritedArticleList, action.payload);
    yield put({
      type: getFavoritedArticleListFromSaga.type,
      payload: res,
    });
  } catch (error) {
    console.log(error);
  }
}
