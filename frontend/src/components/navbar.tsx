import * as React from 'react';

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/lib/constant';
import { Link, useNavigate } from 'react-router-dom';

import { Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import NavigationMenuDemo from '@/components/navbar-menu';
import { useToast } from '@/components/ui/use-toast';

interface NavbarProps {
	//
}

const Navbar: React.FC<NavbarProps> = () => {
	const { toast } = useToast();
	const navigate = useNavigate();

	const handleLogout = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		localStorage.removeItem(ACCESS_TOKEN_KEY);
		localStorage.removeItem(REFRESH_TOKEN_KEY);
		toast({
			title: 'Logout Success',
			description: 'Success logout from your account',
		});
		navigate('/login');
	};

	return (
		<nav className='py-6'>
			<div className='flex items-center justify-between'>
				<Link to='/' className='flex items-center space-x-2'>
					<Briefcase className='size-6' />
					<span className='text-lg font-semibold'>Pajak</span>
				</Link>
				<div className='flex space-x-6'>
					<NavigationMenuDemo />
					<form onSubmit={handleLogout}>
						<Button type='submit' color='red'>
							Logout
						</Button>
					</form>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;
