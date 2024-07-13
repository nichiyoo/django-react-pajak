import * as React from 'react';

import Navbar from '@/components/navbar';
import { Outlet } from 'react-router-dom';

interface AppProps {
	//
}

const AppLayout: React.FC<AppProps> = () => {
	return (
		<main className='w-full max-w-6xl mx-auto px-8'>
			<Navbar />
			<Outlet />
		</main>
	);
};

export default AppLayout;
