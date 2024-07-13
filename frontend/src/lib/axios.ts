import { ACCESS_TOKEN_KEY } from '@/lib/constant';
import base from 'axios';

const axios = base.create({
	baseURL: import.meta.env.VITE_BACKEND_URL,
	withCredentials: true,
});

axios.interceptors.request.use(
	(config) => {
		const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
		if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export default axios;
