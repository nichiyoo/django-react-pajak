import './index.css';

import React from 'react';
import ReactDOM from 'react-dom/client';
import Router from '@/routes/Route.tsx';
import { Toaster } from '@/components/ui/toaster.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<>
			<Router />
			<Toaster />
		</>
	</React.StrictMode>
);
