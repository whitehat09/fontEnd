import axiosClient from "./axiosClient";

const quizApi = {
  getData: (data: any): Promise<any> => {
    console.log('api',data)
    return axiosClient.post("/quiz/start", data);
  },
  
};

export default quizApi;
