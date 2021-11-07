import React, { useState, useEffect } from "react";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import {
  follow,
  getCurrentUser,
  getFavoritedArticleList,
  getMyArticleList,
  unFollow,
} from "../features/articles/articleSlice";
import Pagination from "../features/articles/components/Pagination";
import SingleArticle from "../features/articles/components/SingleArticle";
import { getProfile } from "../features/profile/profileSlice";
import Loader from "../layout/Loader/Loader";

export enum tabIds {
  MY_ARTICLE_TAB = "1",
  FAVORITED_ARTICLE_TAB = "2",
}
const LIMIT = 5;
const OFF_SET = 0;

const Profile = () => {
  const {
    specificArticle,
    myArticleList,
    myArticleCount,
    favoritedArticleList,
    favoritedArticleCount,
    isLoading,
    currentUser,
  } = useAppSelector((state: RootState) => state.articleReducer);
  const { profile } = useAppSelector(
    (state: RootState) => state.profileReducer
  );
  const dispatch = useAppDispatch();

  const [tabId, setTabId] = useState<string>(tabIds.MY_ARTICLE_TAB);
  const history = useHistory();
  const { username }: any = useParams();

  const handleFollow = () => {
    if (!specificArticle?.author.following) {
      dispatch({
        type: follow.type,
        payload: username,
      });
    }
    if (specificArticle?.author.following) {
      dispatch({
        type: unFollow.type,
        payload: username,
      });
    }
  };

  useEffect(() => {
    dispatch({
      type: getCurrentUser.type,
    });
    dispatch({
      type: getProfile.type,
      payload: username,
    });
    dispatch({
      type: getMyArticleList.type,
      payload: { username: username, limit: LIMIT, offset: OFF_SET },
    });
  }, [username, history, dispatch]);

  const handleActiveTab = (e: any) => {
    const id = e.target.id;

    if (id === "my-article") {
      setTabId(tabIds.MY_ARTICLE_TAB);
      dispatch({
        type: getMyArticleList.type,
        payload: { username: username, limit: LIMIT, offset: OFF_SET },
      });
    }

    if (id === "favorited-article") {
      setTabId(tabIds.FAVORITED_ARTICLE_TAB);
      dispatch({
        type: getFavoritedArticleList.type,
        payload: { username: username, limit: LIMIT, offset: OFF_SET },
      });
    }
  };
  return (
    <div>
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <div className="col-xs-12 col-md-10 offset-md-1">
                <img src={profile.image} className="user-img" alt="" />
                <h4>{profile.username}</h4>
                <p>{profile.bio}</p>
                {currentUser.username === username ? (
                  <NavLink
                    to="/settings"
                    className="btn btn-sm btn-outline-secondary"
                  >
                    <i className="ion-gear-a"></i>
                    &nbsp; Setting
                  </NavLink>
                ) : (
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={handleFollow}
                  >
                    <i className="ion-plus-round"></i>
                    &nbsp;{" "}
                    {specificArticle?.author?.following
                      ? "Unfollow"
                      : "Follow"}{" "}
                    {username}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container page">
        <div className="row">
          <div className="col-md-9">
            <div className="feed-toggle">
              <ul className="nav nav-pills outline-active">
                <li className="nav-item">
                  <span
                    id="my-article"
                    onClick={handleActiveTab}
                    className={
                      tabId === tabIds.MY_ARTICLE_TAB
                        ? "nav-link active"
                        : "nav-link"
                    }
                  >
                    My Article
                  </span>
                </li>

                <li className="nav-item">
                  <span
                    id="favorited-article"
                    onClick={handleActiveTab}
                    className={
                      tabId === tabIds.FAVORITED_ARTICLE_TAB
                        ? "nav-link active"
                        : "nav-link"
                    }
                  >
                    Favorited Article
                  </span>
                </li>
              </ul>
            </div>
            {isLoading && tabId === tabIds.FAVORITED_ARTICLE_TAB && (
              <div className="loading-div">
                <Loader />
              </div>
            )}
            {!isLoading && tabId === tabIds.FAVORITED_ARTICLE_TAB && (
              <>
                {favoritedArticleList.length > 0
                  ? favoritedArticleList?.map((item) => (
                      <SingleArticle key={item?.slug} article={item} />
                    ))
                  : "No articles are here... yet."}
              </>
            )}

            {favoritedArticleList.length > 0
              ? tabId === tabIds.FAVORITED_ARTICLE_TAB && (
                  <Pagination total={favoritedArticleCount} tabId={tabId} />
                )
              : ""}

            {tabId === tabIds.MY_ARTICLE_TAB && (
              <>
                {myArticleList.length > 0
                  ? myArticleList?.map((item) => (
                      <SingleArticle key={item?.slug} article={item} />
                    ))
                  : "No articles are here... yet."}
                <Pagination total={myArticleCount} tabId={tabId} />
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
