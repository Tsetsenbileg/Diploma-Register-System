import axios from "axios"

const axiosClient = axios.create({
    // baseURL: "http://localhost:3000/",
    baseURL: "http://localhost:7000/",

    headers: {
        Accept: "application/json",
        "Accept-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
    }
});

axios.interceptors.response.use(
    function (response) {


        return response.data;
    },
    function (error) {
        return Promise.reject(error);
    }
)

export { axiosClient }