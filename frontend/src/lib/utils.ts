import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export function formatCurrency(value: number) {
	return value.toLocaleString('id-ID', {
		style: 'currency',
		currency: 'IDR',
	});
}

export function formatCompactNumber(value: number): string {
	if (value < 0) {
		return '-' + formatCompactNumber(-1 * value);
	}

	if (value >= 1000 && value < 1_000_000) {
		return (value / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
	} else if (value >= 1_000_000 && value < 1_000_000_000) {
		return (value / 1_000_000).toFixed(1).replace(/\.0$/, '') + 'M';
	} else if (value >= 1_000_000_000 && value < 1_000_000_000_000) {
		return (value / 1_000_000_000).toFixed(1).replace(/\.0$/, '') + 'B';
	} else if (value >= 1_000_000_000_000 && value < 1_000_000_000_000_000) {
		return (value / 1_000_000_000_000).toFixed(1).replace(/\.0$/, '') + 'T';
	}

	return String(value) as never;
}
