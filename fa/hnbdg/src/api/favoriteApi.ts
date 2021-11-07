import axiosClient from "./axiosClient";

const favoriteApi = {
  favoriteArticle: (slug: string): Promise<any> => {
    return axiosClient.post(`articles/${slug}/favorite`);
  },
  unfavoriteArticle: (slug: string): Promise<any> => {
    return axiosClient.delete(`articles/${slug}/favorite`);
  },
};

export default favoriteApi;
