import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import {
	LIST_JENIS_KPP,
	LIST_JENIS_SPT,
	LIST_JENIS_WP,
	LIST_KANAL_LAPOR,
	LIST_KATEGORI_KLU,
	LIST_STATUS_KPP,
} from '@/lib/constant';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ToastAction } from '@/components/ui/toast';
import axios from '@/lib/axios';
import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface LaporanFormProps {
	//
}

const laporanSchema = z.object({
	nama: z.string().min(4).max(100).trim(),
	npwp: z.string().min(15).max(15).trim(),
	tahun: z.coerce.number().max(new Date().getFullYear()),
	bulan: z.coerce.number().min(1).max(12),
	pendapatan: z.coerce.number().min(0),
	kpp: z.enum(LIST_JENIS_KPP),
	wp: z.enum(LIST_JENIS_WP),
	spt: z.enum(LIST_JENIS_SPT),
	status: z.enum(LIST_STATUS_KPP),
	kanal: z.enum(LIST_KANAL_LAPOR),
	kategori: z.enum(LIST_KATEGORI_KLU),
});

const LaporanForm: React.FC<LaporanFormProps> = () => {
	const { toast } = useToast();
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof laporanSchema>>({
		resolver: zodResolver(laporanSchema),
		defaultValues: {
			nama: '',
			npwp: '',
			tahun: new Date().getFullYear(),
			bulan: new Date().getMonth() + 1,
			kpp: LIST_JENIS_KPP.at(0),
			wp: LIST_JENIS_WP.at(0),
			spt: LIST_JENIS_SPT.at(0),
			status: LIST_STATUS_KPP.at(0),
			kanal: LIST_KANAL_LAPOR.at(0),
			kategori: LIST_KATEGORI_KLU.at(0),
			pendapatan: 0,
		},
	});

	const onSubmit = async (values: z.infer<typeof laporanSchema>) => {
		try {
			await axios.post('/laporan/create/', values);
			form.reset();
			toast({
				title: 'Laporan Success',
				description: 'Successfully created laporan',
				action: (
					<ToastAction
						altText='navigate'
						onClick={() => navigate('/')}>
						Check Laporan
					</ToastAction>
				),
			});
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
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle>Form Laporan</CardTitle>
			</CardHeader>

			<CardContent>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className='grid gap-6 lg:grid-cols-2'>
						<div className='col-span-full'>
							<FormField
								control={form.control}
								name='nama'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nama Pelapor</FormLabel>
										<FormControl>
											<Input
												placeholder='Nama Pelapor'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className='col-span-full'>
							<FormField
								control={form.control}
								name='npwp'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nomor NPWP</FormLabel>
										<FormControl>
											<Input
												placeholder='Nomor NPWP'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className='grid gap-3'>
							<FormField
								control={form.control}
								name='kpp'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Jenis KPP</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger
													id='kpp'
													aria-label='Pilih Jenis KPP'>
													<SelectValue placeholder='Pilih Jenis KPP' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{LIST_JENIS_KPP.map(
													(kpp, index) => (
														<SelectItem
															key={index}
															value={kpp}>
															{kpp}
														</SelectItem>
													)
												)}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className='grid gap-3'>
							<FormField
								control={form.control}
								name='wp'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Jenis WP</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger
													id='wp'
													aria-label='Pilih Jenis WP'>
													<SelectValue placeholder='Pilih Jenis WP' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{LIST_JENIS_WP.map(
													(wp, index) => (
														<SelectItem
															key={index}
															value={wp}>
															{wp}
														</SelectItem>
													)
												)}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className='grid gap-3'>
							<FormField
								control={form.control}
								name='spt'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Jenis SPT</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger
													id='spt'
													aria-label='Pilih Jenis SPT'>
													<SelectValue placeholder='Pilih Jenis SPT' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{LIST_JENIS_SPT.map(
													(spt, index) => (
														<SelectItem
															key={index}
															value={spt}>
															{spt}
														</SelectItem>
													)
												)}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className='grid gap-3'>
							<FormField
								control={form.control}
								name='kanal'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Kanal</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger
													id='kanal'
													aria-label='Pilih Kanal'>
													<SelectValue placeholder='Pilih Kanal' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{LIST_KANAL_LAPOR.map(
													(kanal, index) => (
														<SelectItem
															key={index}
															value={kanal}>
															{kanal}
														</SelectItem>
													)
												)}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className='grid gap-3'>
							<FormField
								control={form.control}
								name='status'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Status</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger
													id='status'
													aria-label='Pilih Status'>
													<SelectValue placeholder='Pilih Status' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{LIST_STATUS_KPP.map(
													(status, index) => (
														<SelectItem
															key={index}
															value={status}>
															{status}
														</SelectItem>
													)
												)}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className='col-span-full'>
							<FormField
								control={form.control}
								name='kategori'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Kategori</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}>
											<FormControl>
												<SelectTrigger
													id='kategori'
													aria-label='Pilih Kategori'>
													<SelectValue placeholder='Pilih Kategori' />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{LIST_KATEGORI_KLU.map(
													(kategori, index) => (
														<SelectItem
															key={index}
															value={kategori}>
															{kategori}
														</SelectItem>
													)
												)}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className='grid gap-3'>
							<FormField
								control={form.control}
								name='tahun'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tahun</FormLabel>
										<FormControl>
											<Input
												type='number'
												placeholder='Tahun'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className='grid gap-3'>
							<FormField
								control={form.control}
								name='bulan'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Bulan</FormLabel>
										<FormControl>
											<Input
												type='number'
												placeholder='Bulan'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className='col-span-full'>
							<FormField
								control={form.control}
								name='pendapatan'
								render={({ field }) => (
									<FormItem>
										<FormLabel>Pendapatan</FormLabel>
										<FormControl>
											<Input
												type='number'
												placeholder='Pendapatan'
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<div className='flex items-center justify-end gap-3 col-span-full'>
							<Button type='submit'>Submit</Button>
							<Button
								variant='outline'
								type='reset'
								onClick={() => form.reset()}>
								Reset
							</Button>
						</div>
					</form>
				</Form>
			</CardContent>
		</Card>
	);
};

export default LaporanForm;
