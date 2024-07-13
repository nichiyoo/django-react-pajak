import * as React from 'react';

import { Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Laporan } from '@/lib/type';
import LaporanTable from '@/components/laporan-table';
import { Link } from 'react-router-dom';
import NumberCard from '@/components/number-card';
import axios from '@/lib/axios';
import { formatCompactNumber } from '@/lib/utils';
import { isAxiosError } from 'axios';
import { useToast } from '@/components/ui/use-toast';

interface ListLaporanPageProps {
	//
}

const ListLaporanPage: React.FC<ListLaporanPageProps> = () => {
	const { toast } = useToast();
	const [listLaporan, setListLaporan] = React.useState<Laporan[]>([]);

	const fetchLaporan = React.useCallback(async () => {
		try {
			const { data } = await axios.get('laporan/');
			setListLaporan(data);
		} catch (error) {
			if (isAxiosError(error)) {
				toast({
					title: 'Laporan Failed',
					description: Object.values(error.response?.data).join(', '),
					variant: 'destructive',
				});
			}
			console.error(error);
		}
	}, [toast]);

	React.useEffect(() => {
		fetchLaporan();
	}, [fetchLaporan]);

	const deleteLaporan =
		(id: number) => async (e: React.FormEvent<HTMLFormElement>) => {
			e.preventDefault();
			try {
				await axios.delete(`/laporan/${id}/delete/`);
				await fetchLaporan();
				toast({
					title: 'Laporan Success',
					description: 'Successfully deleted laporan',
				});
			} catch (error) {
				if (isAxiosError(error)) {
					toast({
						title: 'Laporan Failed',
						description: Object.values(error.response?.data).join(
							', '
						),
						variant: 'destructive',
					});
				}
				console.error(error);
			}
		};

	const callout = React.useMemo(() => {
		const totalPendapatan = listLaporan.reduce(
			(total, laporan) => total + laporan.pendapatan,
			0
		);

		const totalKepatuhan = listLaporan.reduce(
			(total, laporan) => total + Number(laporan.kepatuhan),
			0
		);

		const rataRataKepatuhan =
			listLaporan.length > 0
				? Math.round((totalKepatuhan / listLaporan.length) * 100) / 100
				: 0;

		return [
			{
				title: 'Total SPT ',
				amount: formatCompactNumber(totalPendapatan),
				icon: Briefcase,
			},
			{
				title: 'Rata-rata SPT ',
				amount: formatCompactNumber(
					listLaporan.length > 0
						? totalPendapatan / listLaporan.length
						: 0
				),
				icon: Briefcase,
			},
			{
				title: 'Rata Rata Kepatuhan SPT',
				amount: `${rataRataKepatuhan}%`,
				icon: Briefcase,
			},
			{
				title: 'Jumlah Laporan',
				amount: listLaporan.length,
				icon: Briefcase,
			},
		];
	}, [listLaporan]);

	return (
		<div className='py-20 space-y-10'>
			<header>
				<h1 className='mb-4 text-3xl font-bold'>List Laporan</h1>
				<p className='text-secondary-foreground'>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit.
					Dolore adipisci ullam architecto quidem nulla nemo numquam!
					Illo repellat cupiditate adipisci!
				</p>
			</header>

			<Link to='/create' className='block'>
				<Button>Tambah Data</Button>
			</Link>

			<div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
				{callout.map((item) => (
					<NumberCard
						key={item.title}
						title={item.title}
						amount={item.amount}
						icon={item.icon}
					/>
				))}
			</div>

			<LaporanTable
				listLaporan={listLaporan}
				deleteLaporan={deleteLaporan}
			/>
		</div>
	);
};

export default ListLaporanPage;
