import axios from "axios";
const axiosInstance = axios.create({
    baseURL: "http://49.233.82.133:9091",
    timeout: 50000,
});

// 直接改实例自己的默认 header（一定生效！）
axiosInstance.defaults.headers.common['X-HTTP2-Support'] = 'no';
export default axiosInstance;
