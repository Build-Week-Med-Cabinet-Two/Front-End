import axios from 'axios';

export const AxiosWithAuth = () =>{
    const token = localStorage.getItem('token')
    return axios.create({
        baseURL:'https://medcabinet2.herokuapp.com',
        headers: {
            Authorization: token
        }
    });
};

export default AxiosWithAuth;
