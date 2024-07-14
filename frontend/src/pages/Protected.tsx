import * as React from 'react';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/lib/constant';

import { Navigate } from 'react-router-dom';
import axios from '@/lib/axios';
import { jwtDecode } from 'jwt-decode';
import { isAxiosError } from 'axios';

interface ProtectedPageProps {
	children: React.ReactNode;
}

const ProtectedPage: React.FC<ProtectedPageProps> = ({ children }) => {
	const [auth, setAuth] = React.useState<boolean | null>(null);

	React.useEffect(() => {
		authenticate().catch((error) => {
			console.error(error);
			setAuth(false);
		});
	}, []);

	const authenticate = async () => {
		const accessToken = localStorage.getItem(ACCESS_TOKEN_KEY);
		if (!accessToken) {
			setAuth(false);
			return;
		}

		const decodedToken = jwtDecode(accessToken);
		if (decodedToken.exp && decodedToken.exp > Date.now() / 1000) {
			setAuth(true);
		} else {
			const refreshToken = localStorage.getItem(REFRESH_TOKEN_KEY);

			try {
				const { data } = await axios.post('/token/refresh/', {
					refresh: refreshToken,
				});
				localStorage.setItem(ACCESS_TOKEN_KEY, data.access);
				setAuth(true);
			} catch (error) {
				if (isAxiosError(error) && error.response?.status === 401) {
					localStorage.removeItem(ACCESS_TOKEN_KEY);
					localStorage.removeItem(REFRESH_TOKEN_KEY);
					setAuth(false);
					return;
				}
				console.error(error);
			}
		}
	};

	if (auth === null) return <h1>Loading...</h1>;
	return auth ? children : <Navigate to='/login' />;
};

export default ProtectedPage;
