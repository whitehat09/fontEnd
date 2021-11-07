import moment from "moment";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useAppDispatch } from "../../../app/hooks";
import { favoriteArticle, unfavoriteArticle } from "../articleSlice";

interface SingleArticleProps {
  article: Article;
}

const SingleArticle = ({ article }: SingleArticleProps) => {
  const history = useHistory();
  const dispatch = useAppDispatch();
  const token = localStorage.getItem("token");
  const postDate = moment(article.createdAt).format("ll");

  const handleFavorite = () => {
    if (!token) {
      history.push("/login");
      return;
    }
    if (!article.favorited) {
      dispatch({
        type: favoriteArticle.type,
        payload: article.slug,
      });
    }
    if (article.favorited) {
      dispatch({
        type: unfavoriteArticle.type,
        payload: article.slug,
      });
    }
  };
  return (
    <div className="article-preview">
      <div className="article-meta">
        <Link to={`/profile/${article.author.username}`}>
          <img
            src={
              article.author.image
                ? article.author.image
                : "http://i.imgur.com/Qr71crq.jpg"
            }
            alt=""
          />
        </Link>
        <div className="info">
          <Link to={`/profile/${article.author.username}`}>
            <b>{article.author.username}</b>
          </Link>
          <span className="date">{postDate}</span>
        </div>
        <button
          className={
            article.favorited
              ? "btn btn-outline-primary btn-sm pull-xs-right"
              : "btn btn-primary btn-sm pull-xs-right"
          }
          onClick={handleFavorite}
        >
          <i className="ion-heart"></i> {article.favoritesCount}
        </button>
      </div>
      <Link to={`/article/${article?.slug}`} className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article?.tagList.map((item, i) => (
            <li
              key={i}
              className="tag-default tag-pill tag-outline ng-binding ng-scope"
            >
              {item}
            </li>
          ))}
        </ul>
      </Link>
    </div>
  );
};

export default SingleArticle;
