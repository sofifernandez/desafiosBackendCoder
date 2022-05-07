import axios from 'axios';

// Add a request interceptor
 axios.interceptors.request.use(function (config) {
    config.headers = {
        'Content-Type': 'application/json'
    }
    config.withCredentials = true  
    return config;
   }, function (error) {
        return Promise.reject(error);
   });

// Add a response interceptor
axios.interceptors.response.use(function (response) {
    // Do something with response data
    return response;
}, function (error) {
    if (error.response.status === 401) {
        return {data: 401};
    } else {
        return Promise.reject(error);
    }
});


export default axios;