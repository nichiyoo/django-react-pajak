import * as React from 'react';

import { useNavigate, useSearchParams } from 'react-router-dom';

import CategoryTable from '@/components/category-table';
import { Laporan } from '@/lib/type';
import axios from '@/lib/axios';
import { isAxiosError } from 'axios';
import { useToast } from '@/components/ui/use-toast';

interface AnalyticPageProps {
	//
}

const types = ['kpp', 'wp', 'spt', 'status', 'kanal', 'kategori'];

const AnalyticPage: React.FC<AnalyticPageProps> = () => {
	const { toast } = useToast();
	const navigate = useNavigate();

	const [searchParam] = useSearchParams();
	const [listLaporan, setListLaporan] = React.useState<Laporan[]>([]);

	const type = searchParam.get('type') as keyof Pick<
		Laporan,
		'kpp' | 'wp' | 'spt' | 'status' | 'kanal' | 'kategori'
	>;
	React.useEffect(() => {
		if (!type || !types.includes(type)) {
			toast({
				title: 'Laporan Failed',
				description: 'Type Laporan tidak valid',
				variant: 'destructive',
			});
			navigate('/');
		}
	}, [type, navigate, toast]);

	React.useEffect(() => {
		const fetchLaporan = async () => {
			try {
				const { data } = await axios.get('laporan/');
				setListLaporan(data);
			} catch (error) {
				if (isAxiosError(error)) {
					toast({
						title: 'Laporan Failed',
						description: Object.values(error.response?.data).join(
							','
						),
						variant: 'destructive',
					});
				}
				console.error(error);
			}
		};

		fetchLaporan();
	}, [toast]);

	const groupedData = React.useMemo(() => {
		const grouped = listLaporan.reduce((acc, laporan) => {
			if (!acc[laporan[type]]) {
				acc[laporan[type]] = [];
			}
			acc[laporan[type]].push(laporan);
			return acc;
		}, {} as Record<string, Laporan[]>);

		return Object.keys(grouped).map((key, index) => {
			const totalPendapatan = grouped[key].reduce((acc, laporan) => {
				return acc + laporan.pendapatan;
			}, 0);
			const totalKepatuhan = grouped[key].reduce((acc, laporan) => {
				return acc + Number(laporan.kepatuhan);
			}, 0);
			const jumlahLaporan = grouped[key].length;
			return {
				id: index,
				label: key,
				totalPendapatan: totalPendapatan,
				jumlahLaporan: grouped[key].length,
				rataRataKepatuhan:
					jumlahLaporan > 0
						? Math.round(totalKepatuhan / jumlahLaporan)
						: 0,
			};
		});
	}, [listLaporan, type]);

	return (
		<div className='py-20 space-y-10'>
			<header>
				<h1 className='mb-4 text-3xl font-bold'>
					List Laporan Menurut Jenis {type}
				</h1>
				<p className='text-secondary-foreground'>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit.
					Dolore adipisci ullam architecto quidem nulla nemo numquam!
					Illo repellat cupiditate adipisci!
				</p>
			</header>

			<CategoryTable type={type} group={groupedData} />
		</div>
	);
};

export default AnalyticPage;
