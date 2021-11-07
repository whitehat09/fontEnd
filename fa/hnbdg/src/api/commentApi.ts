import axiosClient from "./axiosClient";

const commentApi = {
  getComments: (slug: string): Promise<any> => {
    return axiosClient.get(`articles/${slug}/comments`);
  },
  addComment: (data: any): Promise<any> => {
    return axiosClient.post(`articles/${data.slug}/comments`, data.body);
  },
  deleteComent: (data: any): Promise<any> => {
    return axiosClient.delete(
      `articles/${data.article_slug}/comments/${data.id}`
    );
  },
};

export default commentApi;
