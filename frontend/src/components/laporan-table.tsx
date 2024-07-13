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
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Laporan } from '@/lib/type';
import { TrashIcon } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface LaporanTableProps {
	listLaporan: Laporan[];
	deleteLaporan: (
		id: number
	) => (e: React.FormEvent<HTMLFormElement>) => void;
}

const LaporanTable: React.FC<LaporanTableProps> = ({
	listLaporan,
	deleteLaporan,
}) => {
	return (
		<Card>
			<CardHeader className='px-7'>
				<CardTitle>Table Laporan</CardTitle>
				<CardDescription>Data laporan dari database.</CardDescription>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Nama</TableHead>
							<TableHead className='hidden md:table-cell'>
								Kategori
							</TableHead>
							<TableHead className='hidden md:table-cell'>
								Tahun
							</TableHead>
							<TableHead className='hidden md:table-cell'>
								Bulan
							</TableHead>
							<TableHead className='hidden sm:table-cell'>
								Status
							</TableHead>
							<TableHead className='text-right'>
								Kepatuhan
							</TableHead>
							<TableHead className='text-right'>
								Pendapatan
							</TableHead>
							<TableHead className='text-right'>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{listLaporan.map((item) => (
							<TableRow key={item.id}>
								<TableCell>
									<div className='font-medium'>
										{item.nama}
									</div>
									<div className='hidden text-sm text-muted-foreground md:inline'>
										{item.npwp}
									</div>
								</TableCell>
								<TableCell className='hidden md:table-cell'>
									{item.kategori}
								</TableCell>
								<TableCell className='hidden md:table-cell'>
									{item.tahun}
								</TableCell>
								<TableCell className='hidden md:table-cell'>
									{item.bulan}
								</TableCell>
								<TableCell className='hidden sm:table-cell'>
									{item.status}
								</TableCell>
								<TableCell className='text-right'>
									<Badge className='text-xs whitespace-nowrap'>
										{item.kepatuhan}%
									</Badge>
								</TableCell>
								<TableCell className='text-right'>
									{formatCurrency(+item.pendapatan)}
								</TableCell>
								<TableCell className='text-right'>
									<form onSubmit={deleteLaporan(item.id)}>
										<TooltipProvider>
											<Tooltip>
												<TooltipTrigger asChild>
													<Button
														size='icon'
														type='submit'
														variant='outline'>
														<TrashIcon className='size-4' />
													</Button>
												</TooltipTrigger>
												<TooltipContent>
													<p>Delete Laporan</p>
												</TooltipContent>
											</Tooltip>
										</TooltipProvider>
									</form>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
};

export default LaporanTable;
