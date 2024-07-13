'use client';

import * as React from 'react';

import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';

import ListItem from '@/components/ui/list-item';

const components = [
	{
		title: 'Jenis KPP',
		href: '/analytic?type=kpp',
		description: 'Data kepatuhan pajak menurut jenis KPP',
	},
	{
		title: 'Jenis WP',
		href: '/analytic?type=wp',
		description: 'Data kepatuhan pajak menurut jenis WP',
	},
	{
		title: 'Jenis SPT',
		href: '/analytic?type=spt',
		description: 'Data kepatuhan pajak menurut jenis SPT',
	},
	{
		title: 'Jenis Status Laporan',
		href: '/analytic?type=status',
		description: 'Data kepatuhan pajak menurut status laporan',
	},
	{
		title: 'Jenis Kanal Laporan',
		href: '/analytic?type=kanal',
		description: 'Data kepatuhan pajak menurut kanal laporan',
	},
	{
		title: 'Jenis Kategori Laporan',
		href: '/analytic?type=kategori',
		description: 'Data kepatuhan pajak menurut kategori laporan',
	},
];

interface NavigationMenuDemoProps {
	//
}

const NavigationMenuDemo: React.FC<NavigationMenuDemoProps> = () => {
	return (
		<NavigationMenu>
			<NavigationMenuList>
				<NavigationMenuItem>
					<NavigationMenuTrigger>Menu</NavigationMenuTrigger>
					<NavigationMenuContent>
						<ul className='grid gap-3 p-4 w-96'>
							{components.map((component) => (
								<ListItem
									key={component.title}
									title={component.title}
									href={component.href}>
									{component.description}
								</ListItem>
							))}
						</ul>
					</NavigationMenuContent>
				</NavigationMenuItem>
			</NavigationMenuList>
		</NavigationMenu>
	);
};

export default NavigationMenuDemo;
