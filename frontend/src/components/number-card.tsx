import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

import { LucideIcon } from 'lucide-react';

interface NumberCardProps {
	title: string;
	amount: string | number;
	icon: LucideIcon;
	note?: string;
}

const NumberCard: React.FC<NumberCardProps> = ({
	title,
	amount,
	icon,
	note,
}) => {
	const CardIcon = icon;

	return (
		<Card>
			<CardHeader className='flex flex-row items-center justify-between pb-2 space-y-0'>
				<CardTitle className='text-sm font-medium'>{title}</CardTitle>
				<CardIcon className='w-4 h-4 text-muted-foreground' />
			</CardHeader>
			<CardContent>
				<div className='text-2xl font-bold'>{amount}</div>
				{note && (
					<p className='text-xs text-muted-foreground'>{note}</p>
				)}
			</CardContent>
		</Card>
	);
};

export default NumberCard;
