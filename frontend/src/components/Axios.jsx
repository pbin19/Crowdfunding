import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL || 'http://127.0.0.1:8000/api';

const AxiosInstance = axios.create({
    baseURL: baseUrl,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
        accept: 'application/json',
    },
});

export default AxiosInstance;
