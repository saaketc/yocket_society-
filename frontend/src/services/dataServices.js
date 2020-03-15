import axios from 'axios';

const URL = 'http://localhost:5000/api';
const tokenKey = 'privateUserToken';

const getToken = () => {
    return localStorage.getItem(tokenKey);
}

const config = {
    headers: {
        'Content-Type': 'application/json',
        'x-auth-token': getToken()

    },

}


const getData = (resource, params = null) => {
    return axios.get(`${URL}/${resource}`, {
        headers: {
            'Content-Type': 'application/json',
            'x-auth-token': getToken()
        },
        params: params
    });

}
const postData = (resource, data) => {
    return axios.post(`${URL}/${resource}`, data, config);

}


export default {
    getData,
    postData
}

