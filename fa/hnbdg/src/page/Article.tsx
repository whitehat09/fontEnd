import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useHistory, useParams } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { RootState } from "../app/store";
import {
  addComment,
  deleteArticle,
  deleteComment,
  favoriteArticle,
  follow,
  getCommentList,
  getSpecificArticle,
  unfavoriteArticle,
  unFollow,
} from "../features/articles/articleSlice";
export interface ParamType {
  article_slug: string;
}

const Article = () => {
  const [comment, setComment] = useState<string>("");
  const { article_slug } = useParams<ParamType>();
  const { specificArticle, commentList } = useAppSelector(
    (state: RootState) => state.articleReducer
  );
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const history = useHistory();
  const username = localStorage.getItem("username");
  const isYourArticle = specificArticle?.author?.username === username;

  useEffect(() => {
    dispatch({
      type: getSpecificArticle.type,
      payload: article_slug,
    });

    dispatch({
      type: getCommentList.type,
      payload: article_slug,
    });
  }, [article_slug, dispatch]);

  const handleFollow = () => {
    if (!token) {
      history.push("/Register");
      return;
    }
    const username = specificArticle?.author.username;
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

  const handleFavorite = () => {
    if (!token) {
      history.push("/Register");
      return;
    }
    if (!specificArticle.favorited) {
      dispatch({
        type: favoriteArticle.type,
        payload: article_slug,
      });
    }
    if (specificArticle.favorited) {
      dispatch({
        type: unfavoriteArticle.type,
        payload: article_slug,
      });
    }
  };

  const handleDelete = () => {
    dispatch({
      type: deleteArticle.type,
      payload: article_slug,
    });
  };

  const handleComment = (e: any) => {
    setComment(e.target.value);
  };

  const postComment = () => {
    const content = { comment: { body: comment } };
    const data = { slug: article_slug, body: content };
    dispatch({
      type: addComment.type,
      payload: data,
    });
    setComment("");
  };

  const handleDeleteComment = (id: number | undefined) => {
    const data = { article_slug, id };
    if (id) {
      dispatch({
        type: deleteComment.type,
        payload: data,
      });
    }
  };

  return (
    <div>
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{specificArticle?.title}</h1>

            <div className="article-meta">
              <Link to="">
                <img src={specificArticle?.author?.image} alt="" />
              </Link>
              <div className="info">
                <Link to="" className="author">
                  {specificArticle?.author?.username}
                </Link>
                <span className="date">{specificArticle?.createdAt}</span>
              </div>
              {!isYourArticle ? (
                <>
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={handleFollow}
                  >
                    <i className="ion-plus-round"></i>
                    &nbsp;{" "}
                    {specificArticle?.author?.following
                      ? "Unfollow"
                      : "Follow"}{" "}
                    {specificArticle?.author?.username}
                  </button>
                  &nbsp;&nbsp;
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={handleFavorite}
                  >
                    <i className="ion-heart"></i>
                    &nbsp;{" "}
                    {specificArticle.favorited ? "Unfavorite" : "Favorite"}{" "}
                    Article{" "}
                    <span className="counter">
                      ({specificArticle?.favoritesCount})
                    </span>
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to={`/editor/${specificArticle?.slug}`}
                    className="btn btn-sm btn-outline-secondary"
                  >
                    <i className="ion-edit"></i>
                    &nbsp; Edit Article
                  </Link>
                  &nbsp;&nbsp;
                  <button
                    className="btn btn-sm btn-outline-secondary"
                    onClick={handleDelete}
                  >
                    <i className="ion-trash-a"></i>
                    &nbsp; Delete Article
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              {/* <p>
                {specificArticle?.body}
              </p> */}
              <div
                dangerouslySetInnerHTML={{ __html: specificArticle?.body }}
              />
            </div>
          </div>
          <ul className="tag-list">
            {specificArticle?.tagList?.map((item, i) => (
              <li
                key={i}
                className="tag-default tag-pill tag-outline ng-binding ng-scope"
              >
                {item}
              </li>
            ))}
          </ul>
          <hr />

          {token && (
            <div className="row">
              <div className="col-xs-12 col-md-8 offset-md-2">
                <form className="card comment-form">
                  <div className="card-block">
                    <textarea
                      className="form-control"
                      placeholder="Write a comment..."
                      rows={8}
                      onChange={handleComment}
                      value={comment}
                    ></textarea>
                  </div>
                  <div className="card-footer">
                    <img
                      src={specificArticle?.author?.image}
                      className="comment-author-img"
                      alt=""
                    />
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={postComment}
                    >
                      Post Comment
                    </button>
                  </div>
                </form>

                {commentList?.map((item) => (
                  <div key={item.id} className="card">
                    <div className="card-block">
                      <p className="card-text">{item.body}</p>
                    </div>
                    <div className="card-footer">
                      <Link to="" className="comment-author">
                        <img
                          src={item?.author?.image}
                          className="comment-author-img"
                          alt=""
                        />
                      </Link>
                      &nbsp;
                      <Link to="" className="comment-author">
                        {item?.author?.username}
                      </Link>
                      {item?.author?.username === username && (
                        <span
                          className="mod-options"
                          onClick={() => handleDeleteComment(item?.id)}
                        >
                          <i className="ion-trash-a"></i>
                        </span>
                      )}
                      <span className="date-posted">{item.createdAt}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {!token && (
            <p style={{ display: "inherit", textAlign: "center" }}>
              <Link to="/login">Sign in</Link> or{" "}
              <Link to="/Register">sign up</Link> to add comments on this
              article.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Article;
