import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "http://49.233.82.133:9091",
    timeout: 50000,
});
export default axiosInstance;
