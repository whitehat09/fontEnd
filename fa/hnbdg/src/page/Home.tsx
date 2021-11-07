import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import {
  getArticleList,
  getArticlesByTag,
  getCurrentUser,
  getTagList,
  getYourFeedList,
} from "../features/articles/articleSlice";
import SingleArticle from "../features/articles/components/SingleArticle";
import "../App.css";
import Pagination from "../features/articles/components/Pagination";
import { Link } from "react-router-dom";
import Loader from "../layout/Loader/Loader";

export enum tabIds {
  YOUR_FEED_TAB = "1",
  GLOBAL_FEED_TAB = "2",
  TAG_FEED_TAB = "3",
}

const LIMIT = 5;
const OFF_SET = 0;

const Home = () => {
  const [tabId, setTabId] = useState<string>(tabIds.GLOBAL_FEED_TAB);
  const [tag, setTag] = useState<string>("");

  const token = localStorage.getItem("token");

  const selector = useAppSelector((state: RootState) => state.articleReducer);
  const { globalArticleList, isLoading } = selector;
  const { tags, yourFeedList } = selector;
  const { articlesCount, feedsCount } = selector;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: getTagList.type });
    if (!token) {
      dispatch({
        type: getArticleList.type,
        payload: { limit: LIMIT, offset: OFF_SET },
      });
    }
    if (token) {
      setTabId(tabIds.YOUR_FEED_TAB);
      dispatch({
        type: getCurrentUser.type,
      });
      dispatch({
        type: getYourFeedList.type,
        payload: { limit: LIMIT, offset: OFF_SET },
      });
    }
  }, [dispatch, token]);

  const handleActiveTab = (e: any) => {
    const id = e.target.id;

    if (id === "your-feed") {
      setTabId(tabIds.YOUR_FEED_TAB);
      dispatch({
        type: getYourFeedList.type,
        payload: { limit: LIMIT, offset: OFF_SET },
      });
    }

    if (id === "global-feed") {
      setTabId(tabIds.GLOBAL_FEED_TAB);
      dispatch({
        type: getArticleList.type,
        payload: { limit: LIMIT, offset: OFF_SET },
      });
    }

    if (id === "tag-feed") {
      setTabId(tabIds.TAG_FEED_TAB);
      dispatch({
        type: getArticlesByTag.type,
        payload: { limit: LIMIT, offset: OFF_SET, tag },
      });
    }
  };

  const selectTag = (tag: string) => {
    setTag(tag);
    setTabId(tabIds.TAG_FEED_TAB);
    dispatch({
      type: getArticlesByTag.type,
      payload: { limit: LIMIT, offset: OFF_SET, tag },
    });
  };

  return (
    <div>
      <div className="home-page">
        {!token && (
          <div className="banner">
            <div className="container">
              <h1 className="logo-font">HNBDG</h1>
              <p>Equip yourself for the future of work.</p>
              <p>"A new tool to study and practice the technical knowledge"</p>
            </div>
          </div>
        )}
        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  {token && (
                    <li className="nav-item">
                      <span
                        id="your-feed"
                        onClick={handleActiveTab}
                        className={
                          tabId === tabIds.YOUR_FEED_TAB
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        Your Feed
                      </span>
                    </li>
                  )}
                  <li className="nav-item">
                    <span
                      id="global-feed"
                      onClick={handleActiveTab}
                      className={
                        tabId === tabIds.GLOBAL_FEED_TAB
                          ? "nav-link active"
                          : "nav-link"
                      }
                    >
                      Global Feed
                    </span>
                  </li>
                  {tag !== "" && (
                    <li className="nav-item">
                      <span
                        id="tag-feed"
                        onClick={handleActiveTab}
                        className={
                          tabId === tabIds.TAG_FEED_TAB
                            ? "nav-link active"
                            : "nav-link"
                        }
                      >
                        #{tag}
                      </span>
                    </li>
                  )}
                </ul>
              </div>
              {isLoading && tabId === tabIds.GLOBAL_FEED_TAB && (
                <div className="loading-div">
                  <Loader />
                </div>
              )}
              {!isLoading && tabId === tabIds.GLOBAL_FEED_TAB && (
                <>
                  {globalArticleList?.map((item) => (
                    <SingleArticle key={item?.slug} article={item} />
                  ))}
                </>
              )}
              {!isLoading && tabId === tabIds.TAG_FEED_TAB && (
                <>
                  {globalArticleList?.map((item) => (
                    <SingleArticle key={item?.slug} article={item} />
                  ))}
                </>
              )}
              {(tabId === tabIds.GLOBAL_FEED_TAB ||
                tabId === tabIds.TAG_FEED_TAB) && (
                <Pagination total={articlesCount} tabId={tabId} />
              )}

              {tabId === tabIds.YOUR_FEED_TAB && yourFeedList.length > 0 && (
                <>
                  {yourFeedList?.map((item) => (
                    <SingleArticle key={item?.slug} article={item} />
                  ))}
                  <Pagination total={feedsCount} tabId={tabId} />
                </>
              )}
            </div>
            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
                <div className="tag-list">
                  {tags?.map((item, i) => (
                    <Link
                      key={i}
                      to=""
                      onClick={() => selectTag(item)}
                      className="tag-pill tag-default"
                    >
                      {item}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
