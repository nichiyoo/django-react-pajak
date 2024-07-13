import * as React from 'react';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/lib/constant';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Link, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import axios from '@/lib/axios';
import { isAxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useToast } from '@/components/ui/use-toast';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

interface RegisterPageProps {
	//
}

const authSchema = z.object({
	username: z.string().min(4).max(20).trim(),
	password: z.string().min(8).max(20).trim(),
});

const RegisterPage: React.FC<RegisterPageProps> = () => {
	const { toast } = useToast();
	const navigate = useNavigate();

	const form = useForm<z.infer<typeof authSchema>>({
		resolver: zodResolver(authSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	});

	const onSubmit = async (values: z.infer<typeof authSchema>) => {
		try {
			const { data } = await axios.post('/users/register/', values);
			localStorage.setItem(ACCESS_TOKEN_KEY, data.access);
			localStorage.setItem(REFRESH_TOKEN_KEY, data.refresh);

			toast({
				title: 'Register Success',
				description: 'Success register to your account',
				status: 'success',
			});

			navigate('/');
		} catch (error) {
			if (isAxiosError(error)) {
				toast({
					title: 'Register Failed',
					description: Object.values(error.response?.data).join(', '),
					variant: 'destructive',
				});
			}
			console.error(error);
		}
	};

	return (
		<>
			<div className='grid gap-2'>
				<h1 className='text-3xl font-bold'>Register</h1>
				<p className='text-muted-foreground'>
					Register your account to access the full features of the
					application.
				</p>
			</div>

			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-4'>
					<div className='grid gap-2'>
						<FormField
							control={form.control}
							name='username'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input
											placeholder='Username'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className='grid gap-2'>
						<FormField
							control={form.control}
							name='password'
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											type='password'
											placeholder='password'
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button type='submit' className='w-full'>
						Register
					</Button>
					<p className='text-sm text-center text-muted-foreground'>
						Already have an account?{' '}
						<Link to='/login' className='text-zinc-900'>
							Login
						</Link>
					</p>
				</form>
			</Form>
		</>
	);
};

export default RegisterPage;
