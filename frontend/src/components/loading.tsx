import * as React from 'react';

import { LoaderCircle } from 'lucide-react';

interface LoadingProps {
	//
}

const Loading: React.FC<LoadingProps> = () => {
	return (
		<div className='flex items-center justify-center w-full h-80'>
			<LoaderCircle className='animate-spin text-secondary-foreground size-6' />
		</div>
	);
};

export default Loading;
