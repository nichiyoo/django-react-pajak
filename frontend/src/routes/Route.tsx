import * as React from 'react';

import { BrowserRouter, Route, Routes } from 'react-router-dom';

import AnalyticPage from '@/pages/Laporan/AnalyticLaporan';
import AppLayout from '@/layouts/AppLayout';
import AuthLayout from '@/layouts/AuthLayout';
import Loading from '@/components/loading';
import LoginPage from '@/pages/Auth/Login';
import ProtectedPage from '@/pages/Protected';
import RegisterPage from '@/pages/Auth/Register';

const CreateLaporanPage = React.lazy(
	() => import('@/pages/Laporan/CreateLaporan')
);

const ListLaporanPage = React.lazy(() => import('@/pages/Laporan/ListLaporan'));

interface RouteProps {
	//
}

const Router: React.FC<RouteProps> = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route
						element={
							<ProtectedPage>
								<AppLayout />
							</ProtectedPage>
						}>
						<Route
							path='/'
							element={
								<React.Suspense fallback={<Loading />}>
									<ListLaporanPage />
								</React.Suspense>
							}
						/>
						<Route
							path='/create'
							element={
								<React.Suspense fallback={<Loading />}>
									<CreateLaporanPage />
								</React.Suspense>
							}
						/>
						<Route
							path='/analytic'
							element={
								<React.Suspense fallback={<Loading />}>
									<AnalyticPage />
								</React.Suspense>
							}
						/>
					</Route>

					<Route element={<AuthLayout />}>
						<Route path='/login' element={<LoginPage />} />
						<Route path='/register' element={<RegisterPage />} />
					</Route>

					<Route path='*' element={<h1>404</h1>} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default Router;
