import axios from "axios";

const api = axios.create({
    baseURL: 'https://ng-transfer.herokuapp.com/',
    timeout: 5000
})

export default api