import * as React from 'react';

import { Button } from '@/components/ui/button';
import LaporanForm from '@/components/laporan-form';
import { Link } from 'react-router-dom';

interface CreateLaporanPageProps {
	//
}

const CreateLaporanPage: React.FC<CreateLaporanPageProps> = () => {
	return (
		<div className='py-20 space-y-10'>
			<header>
				<h1 className='mb-4 text-3xl font-bold'>Buat Laporan</h1>
				<p className='text-secondary-foreground'>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit.
					Dolore adipisci ullam architecto quidem nulla nemo numquam!
					Illo repellat cupiditate adipisci!
				</p>
			</header>

			<Link to='/' className='block'>
				<Button variant='outline'>Kembali</Button>
			</Link>

			<LaporanForm />
		</div>
	);
};

export default CreateLaporanPage;
