import axios from "axios";

export const AxiosWithAuth = (token) => {
  const awa = axios.create({
    baseURL: "https://medcabinet2.herokuapp.com/",
    headers: {
      Authorization: `bearer ${token}`,
    },
  });
  return awa;
};

export default AxiosWithAuth;
