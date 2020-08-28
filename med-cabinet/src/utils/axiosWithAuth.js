import axios from "axios";

export const AxiosWithAuth = axios.create({
  baseURL: "https://medcabinet2.herokuapp.com/",
  headers: {
    Authorization: `bearer ${localStorage.getItem("token")}`,
  },
});

export default AxiosWithAuth;
