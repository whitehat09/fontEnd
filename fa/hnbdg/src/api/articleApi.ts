import axiosClient from "./axiosClient";

const articleApi = {
  getArticleList: (data: any): Promise<any> => {
    return axiosClient.get(
      `articles?limit=${data.limit}&offset=${data.offset}`
    );
  },
  getYourFeedList: (data: any): Promise<any> => {
    return axiosClient.get(
      `articles/feed?limit=${data.limit}&offset=${data.offset}`
    );
  },
  getTagList: (): Promise<any> => {
    return axiosClient.get("tags");
  },
  addNewArticle: (article: any): Promise<any> => {
    return axiosClient.post("articles", article);
  },
  getSpecificArticle: (slug: string): Promise<any> => {
    return axiosClient.get(`articles/${slug}`);
  },
  getCurrentUser: (): Promise<any> => {
    return axiosClient.get("user");
  },
  updateArticle: (data: any): Promise<any> => {
    return axiosClient.put(`articles/${data.article.slug}`, data);
  },
  deleteArticle: (slug: string): Promise<any> => {
    return axiosClient.delete(`articles/${slug}`);
  },
  getArticlesByTag: (data: any): Promise<any> => {
    return axiosClient.get(
      `articles?limit=${data.limit}&offset=${data.offset}&tag=${data.tag}`
    );
  },

  getMyArticleList: (data: any): Promise<any> => {
    return axiosClient.get(
      `articles?author=${data.username}&limit=${data.limit}&offset=${data.offset}`
    );
  },
  getFavoritedArticleList: (data: any): Promise<any> => {
    return axiosClient.get(
      `articles?favorited=${data.username}&limit=${data.limit}&offset=${data.offset}`
    );
  },
};

export default articleApi;
