import { takeEvery, takeLatest } from "redux-saga/effects";
import {
  addCommentSaga,
  addNewArticleSaga,
  deleteArticleSaga,
  deleteCommentSaga,
  favoriteArticleSaga,
  followSaga,
  getArticleListSaga,
  getArticlesByTagSaga,
  getCommentListSaga,
  getCurrentUserSaga,
  getFavoritedArticleListSaga,
  getMyArticleListSaga,
  getSpecificArticleSaga,
  getTagListSaga,
  getYourFeedListSaga,
  unFavoriteArticleSaga,
  unFollowSaga,
  updateArticleSaga,
} from "../features/articles/articleSaga";
import {
  addComment,
  addNewArticle,
  deleteArticle,
  deleteComment,
  favoriteArticle,
  follow,
  getArticleList,
  getArticlesByTag,
  getCommentList,
  getCurrentUser,
  getFavoritedArticleList,
  getMyArticleList,
  getSpecificArticle,
  getTagList,
  getYourFeedList,
  unfavoriteArticle,
  unFollow,
  updateArticle,
} from "../features/articles/articleSlice";
import { userLoginSaga, userSignUpSaga } from "../features/Login/loginSaga";
import { getUser, signupUser } from "../features/Login/loginSlice";
import {
  getProfileSaga,
  updateUserSaga,
} from "../features/profile/profileSaga";
import { getProfile, updateUser } from "../features/profile/profileSlice";

// tổng các trường tính năng
export function* rootSaga() {
  yield takeEvery(getUser().type, userLoginSaga);
  yield takeEvery(signupUser().type, userSignUpSaga);
  yield takeLatest(getArticleList().type, getArticleListSaga);
  yield takeLatest(getYourFeedList().type, getYourFeedListSaga);
  yield takeLatest(getTagList().type, getTagListSaga);
  yield takeLatest(addNewArticle().type, addNewArticleSaga);
  yield takeLatest(getCommentList().type, getCommentListSaga);
  yield takeLatest(getSpecificArticle().type, getSpecificArticleSaga);
  yield takeLatest(getCurrentUser().type, getCurrentUserSaga);
  yield takeLatest(updateArticle().type, updateArticleSaga);
  yield takeLatest(deleteArticle().type, deleteArticleSaga);
  yield takeEvery(addComment().type, addCommentSaga);
  yield takeEvery(deleteComment().type, deleteCommentSaga);
  yield takeLatest(follow().type, followSaga);
  yield takeLatest(unFollow().type, unFollowSaga);
  yield takeLatest(favoriteArticle().type, favoriteArticleSaga);
  yield takeLatest(unfavoriteArticle().type, unFavoriteArticleSaga);
  yield takeLatest(getArticlesByTag().type, getArticlesByTagSaga);
  yield takeLatest(getProfile().type, getProfileSaga);
  yield takeLatest(updateUser().type, updateUserSaga);
  yield takeLatest(getMyArticleList().type, getMyArticleListSaga);
  yield takeLatest(getFavoritedArticleList().type, getFavoritedArticleListSaga);
}
