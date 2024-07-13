import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';

import { Badge } from '@/components/ui/badge';
import { formatCompactNumber } from '@/lib/utils';

interface CategoryTableProps {
	type: string;
	group: {
		id: number;
		label: string;
		totalPendapatan: number;
		jumlahLaporan: number;
		rataRataKepatuhan: number;
	}[];
}

const CategoryTable: React.FC<CategoryTableProps> = ({ type, group }) => {
	return (
		<Card>
			<CardHeader className='px-7'>
				<CardTitle>Table Grup</CardTitle>
				<CardDescription>
					Tabel Laporan berdasarkan jenis {type}.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Jenis {type}</TableHead>
							<TableHead>Jumlah Pendapatan</TableHead>
							<TableHead>Total Pendapatan</TableHead>
							<TableHead className='text-right'>
								Rata Rata Kepatuhan
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{group.map((item, index) => (
							<TableRow key={index}>
								<TableCell>
									<div className='font-medium'>
										{item.label}
									</div>
								</TableCell>
								<TableCell>{item.jumlahLaporan}</TableCell>
								<TableCell>
									{formatCompactNumber(+item.totalPendapatan)}
								</TableCell>
								<TableCell className='text-right'>
									<Badge className='text-xs whitespace-nowrap'>
										{item.rataRataKepatuhan}%
									</Badge>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

export default CategoryTable;
