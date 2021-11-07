import axiosClient from "./axiosClient";

const profileApi = {
  getProfile: (username: string): Promise<any> => {
    return axiosClient.get(`profiles/${username}`);
  },

  updateUser: (payload: {
    username: string;
    email: string;
    password?: string;
    image?: string;
    bio?: string;
  }): Promise<any> => {
    return axiosClient.put("user", { user: payload });
  },
};

export default profileApi;
