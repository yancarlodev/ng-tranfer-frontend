import axios from "axios";

const api = axios.create({
    baseURL: 'https://ng-transfer.herokuapp.com/',
    timeout: 10000
})

export default api