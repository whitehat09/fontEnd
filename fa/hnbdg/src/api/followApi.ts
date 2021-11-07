import axiosClient from "./axiosClient";

const followApi = {
  follow: (username: string): Promise<any> => {
    return axiosClient.post(`profiles/${username}/follow`);
  },
  unFollow: (username: string): Promise<any> => {
    return axiosClient.delete(`profiles/${username}/follow`);
  },
};

export default followApi;
