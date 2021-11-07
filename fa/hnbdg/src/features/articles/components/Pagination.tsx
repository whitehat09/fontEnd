import React, { useEffect, useState } from "react";
import { useAppDispatch } from "../../../app/hooks";
import { tabIds } from "../../../page/Home";
import { getArticleList, getYourFeedList } from "../articleSlice";

interface Props {
  total: number;
  tabId: string;
}

const Pagination = ({ total, tabId }: Props) => {
  const [pageNumbers, setPageNumbers] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const articlesPerPage = 5;
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (total > 0) {
      const pages = [];
      for (let i = 1; i <= Math.ceil(total / articlesPerPage); i++) {
        pages.push(i);
      }
      setPageNumbers(pages);
    }
  }, [total]);

  const getPageData = (current: number) => {
    if (tabId === tabIds.GLOBAL_FEED_TAB || tabId === tabIds.TAG_FEED_TAB) {
      dispatch({
        type: getArticleList.type,
        payload: {
          limit: articlesPerPage,
          offset: (current - 1) * articlesPerPage,
        },
      });
    }
    if (tabId === tabIds.YOUR_FEED_TAB) {
      dispatch({
        type: getYourFeedList.type,
        payload: {
          limit: articlesPerPage,
          offset: (current - 1) * articlesPerPage,
        },
      });
    }
  };

  const handleActivePage = (link: number) => {
    setCurrentPage(link);
    getPageData(link);
  };

  const prev = async () => {
    let latestCurrentPage = 0;
    setCurrentPage((prev) => prev - 1);
    await setCurrentPage((current) => {
      latestCurrentPage = current;
      return current;
    });
    getPageData(latestCurrentPage);
  };

  const next = async () => {
    let latestCurrentPage = 0;
    setCurrentPage((prev) => prev + 1);
    await setCurrentPage((current) => {
      latestCurrentPage = current;
      return current;
    });
    getPageData(latestCurrentPage);
  };

  return (
    <div className="row">
      {currentPage > 1 && (
        <div className="page-item" onClick={prev}>
          &laquo;
        </div>
      )}

      {pageNumbers.map((item, index) => (
        <div
          key={index}
          className={
            item === currentPage ? "page-item page-active" : "page-item"
          }
          onClick={() => handleActivePage(item)}
        >
          {item}
        </div>
      ))}
      {currentPage < Math.ceil(total / articlesPerPage) && (
        <div className="page-item" onClick={next}>
          &raquo;
        </div>
      )}
    </div>
  );
};

export default Pagination;
