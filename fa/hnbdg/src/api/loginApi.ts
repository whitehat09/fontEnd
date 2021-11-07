import axiosClient from "./axiosClient";

const loginApi = {
  userLogin: (data: any): Promise<any> => {
    return axiosClient.post("users/login", {
      user: data,
    });
  },
};

export default loginApi;
