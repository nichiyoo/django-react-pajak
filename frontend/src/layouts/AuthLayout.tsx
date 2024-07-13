import * as React from 'react';

import { Outlet, useLocation } from 'react-router-dom';

import { cn } from '@/lib/utils';

interface AuthPageProps {
	//
}
const AuthLayout: React.FC<AuthPageProps> = () => {
	const location = useLocation();
	const isLogin = location.pathname === '/login';

	return (
		<div className='w-full lg:grid h-screen lg:grid-cols-2 items-center'>
			<div className='flex items-center justify-center py-12 h-full'>
				<div className='mx-auto grid max-w-sm w-full gap-6'>
					<Outlet />
				</div>
			</div>

			<div
				className={cn(
					'hidden bg-muted lg:block',
					!isLogin && 'order-first'
				)}>
				<img
					src='https://images.unsplash.com/photo-1513569771920-c9e1d31714af?q=80&w=2574&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
					alt='Image'
					className='h-screen w-full object-cover dark:brightness-[0.2] dark:grayscale'
				/>
			</div>
		</div>
	);
};

export default AuthLayout;
