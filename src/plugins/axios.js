import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "http://49.233.82.133:9091",
    timeout: 10000,
});
export default axiosInstance;

