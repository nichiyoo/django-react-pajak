export type Laporan = {
	id: number;
	kpp: string;
	wp: string;
	spt: string;
	status: string;
	kanal: string;
	kategori: string;
	bulan: string;
	tahun: string;
	nama: string;
	npwp: string;
	pendapatan: number;
	kepatuhan: number;
	created_at: string;
	updated_at: string;
};

export type User = {
	id: number;
	username: string;
	password: string;
};
