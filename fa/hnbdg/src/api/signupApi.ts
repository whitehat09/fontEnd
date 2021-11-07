import axiosClient from "./axiosClient";

const signupApi = {
  userSignup: (data: {
    user: { username: string; email: string; password: string };
  }): Promise<any> => {
    return axiosClient.post("users", {
      user: data,
    });
  },
};

export default signupApi;
