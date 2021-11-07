import { createSlice } from "@reduxjs/toolkit";
import { updateFavorite, updateUnfavorite } from "../../utils/favoriteUpdate";

export interface State {
  globalArticleList: Article[];
  isLoading: boolean;
  tags: string[];
  yourFeedList: Article[];
  commentList: Comment[];
  specificArticle: Article;
  currentUser: any;
  articlesCount: number;
  feedsCount: number;
  myArticleList: Article[];
  myArticleCount: number;
  favoritedArticleList: Article[];
  favoritedArticleCount: number;
}

const initialState: State = {
  globalArticleList: [],
  isLoading: false,
  tags: [],
  yourFeedList: [],
  commentList: [],
  specificArticle: {} as Article,
  currentUser: {},
  articlesCount: 0,
  feedsCount: 0,
  myArticleList: [],
  myArticleCount: 0,
  favoritedArticleList: [],
  favoritedArticleCount: 0,
};

const articleSlice = createSlice({
  name: "articles",
  initialState,
  reducers: {
    getArticleList: (state) => {
      state.isLoading = true;
    },
    getArticleListFromSaga: (state, action) => {
      state.isLoading = false;
      state.globalArticleList = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
    },

    getYourFeedList: (state) => {
      return state;
    },
    getYourFeedListFromSaga: (state, action) => {
      state.yourFeedList = action.payload.articles;
      state.feedsCount = action.payload.articlesCount;
    },

    getTagList: (state) => {
      return state;
    },
    getTagListFromSaga: (state, action) => {
      state.tags = action.payload;
    },

    addNewArticle: (state) => state,
    addNewArticleFromSaga: (state, action) => {
      state.globalArticleList.unshift(action.payload);
    },

    getCommentList: (state) => state,
    getComentListFromSaga: (state, action) => {
      state.commentList = action.payload;
    },

    getSpecificArticle: (state) => state,
    getSpecificArticleFromSaga: (state, action) => {
      state.specificArticle = action.payload;
    },

    getCurrentUser: (state) => state,
    getCurrentUserFromSaga: (state, action) => {
      state.currentUser = action.payload;
    },

    updateArticle: (state) => state,
    updateArticleFromSaga: (state, action) => {
      const slug = action.payload.slug;
      const index = state.globalArticleList.findIndex(
        (item) => item.slug === slug
      );
      state.globalArticleList[index] = action.payload;
    },

    deleteArticle: (state) => state,
    deleteArticleFromSaga: (state, action) => {
      state.globalArticleList.filter((item) => item.slug !== action.payload);
    },

    addComment: (state) => state,
    addCommentFromSaga: (state, action) => {
      state.commentList.push(action.payload);
    },

    deleteComment: (state) => state,
    deleteCommentFromSaga: (state, action) => {
      state.commentList = state.commentList.filter(
        (item) => item.id !== action.payload
      );
    },

    follow: (state) => state,
    followFromSaga: (state) => {
      state.specificArticle.author.following = true;
    },

    unFollow: (state) => state,
    unFollowFromSaga: (state) => {
      state.specificArticle.author.following = false;
    },

    favoriteArticle: (state) => state,
    favoriteArticleFromSaga: (state, action) => {
      updateFavorite(state, action.payload);
    },

    unfavoriteArticle: (state) => state,
    unfavoriteArticleFromSaga: (state, action) => {
      updateUnfavorite(state, action.payload);
      state.favoritedArticleList = state.favoritedArticleList.filter(
        (item) => item.slug !== action.payload
      );
    },

    getArticlesByTag: (state) => state,
    getArticlesByTagFromSaga: (state, action) => {
      state.globalArticleList = action.payload.articles;
      state.articlesCount = action.payload.articlesCount;
    },

    getMyArticleList: (state) => state,
    getMyArticleListFromSaga: (state, action) => {
      state.myArticleList = action.payload.articles;
      state.myArticleCount = action.payload.articlesCount;
    },

    getFavoritedArticleList: (state) => {
      state.isLoading = true;
    },
    getFavoritedArticleListFromSaga: (state, action) => {
      state.isLoading = false;
      state.favoritedArticleList = action.payload.articles;
      state.favoritedArticleCount = action.payload.articlesCount;
    },
  },
});

export const { getArticleList, getArticleListFromSaga } = articleSlice.actions;

export const { getYourFeedList, getYourFeedListFromSaga } =
  articleSlice.actions;

export const { getTagList, getTagListFromSaga } = articleSlice.actions;

export const { addNewArticle, addNewArticleFromSaga } = articleSlice.actions;

export const { getCommentList, getComentListFromSaga } = articleSlice.actions;

export const { getSpecificArticle, getSpecificArticleFromSaga } =
  articleSlice.actions;

export const { getCurrentUser, getCurrentUserFromSaga } = articleSlice.actions;

export const { updateArticle, updateArticleFromSaga } = articleSlice.actions;

export const { deleteArticle, deleteArticleFromSaga } = articleSlice.actions;

export const { addComment, addCommentFromSaga } = articleSlice.actions;

export const { deleteComment, deleteCommentFromSaga } = articleSlice.actions;

export const { follow, followFromSaga } = articleSlice.actions;

export const { unFollow, unFollowFromSaga } = articleSlice.actions;

export const { favoriteArticle, favoriteArticleFromSaga } =
  articleSlice.actions;

export const { unfavoriteArticle, unfavoriteArticleFromSaga } =
  articleSlice.actions;

export const { getArticlesByTag, getArticlesByTagFromSaga } =
  articleSlice.actions;

export const { getMyArticleList, getMyArticleListFromSaga } =
  articleSlice.actions;

export const { getFavoritedArticleList, getFavoritedArticleListFromSaga } =
  articleSlice.actions;

export default articleSlice.reducer;
