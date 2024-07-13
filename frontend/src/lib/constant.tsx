export const ACCESS_TOKEN_KEY = import.meta.env.VITE_ACCESS_TOKEN_KEY;
export const REFRESH_TOKEN_KEY = import.meta.env.VITE_REFRESH_TOKEN_KEY;

export const LIST_JENIS_KPP = ['KPP Pratama Jakarta Tanah Abang Tiga'] as const;

export const LIST_JENIS_WP = [
	'WP Badan',
	'WP Op Karyawan',
	'WP Op Non Karyawan',
] as const;

export const LIST_JENIS_SPT = [
	'SPT PPh Badan',
	'SPT PPh OP 1770',
	'SPT PPh OP 1770S',
	'SPT PPh OP 1770SS',
] as const;

export const LIST_STATUS_KPP = [
	'Kurang Bayar',
	'Lebih Bayar',
	'Nihil',
] as const;

export const LIST_KANAL_LAPOR = [
	'DPC Web Service',
	'SPTXML',
	'e-Filing (ASP)',
	'e-Filing pajak.go.id',
	'e-Form',
	'e-SPT Tahunan yang Baru',
] as const;

export const LIST_KATEGORI_KLU = [
	'Pertanian, Kehutanan, dan Peri',
	'Pertambangan dan Penggalian',
	'Industri Pengolahan',
	'Pengadaan Listrik, Gas, UAP/A',
	'Treatment Air',
	'Konstruksi',
	'Perdagangan Besar dan Eceran',
	'Pengangkutan dan Pergudangan',
	'Penyediaan Akomodasi dan Peny',
	'Informasi dan Komunikasi',
	'Aktivitas Keuangan dan Asuran',
	'Real Estat',
	'Aktivitas Profesional, Ilmiah',
	'Aktivitas Penyewaan dan Sewa',
	'Administrasi Perintahan Pe',
	'Pendidikan',
	'Aktivitas Kesehatan Manusia Da',
	'Kesenian, Hiburan, dan Rekreasi',
	'Aktivitas Jasa Lainnya',
	'Aktivitas Rumah Tangga Sebagai',
	'Aktivitas Badan Internasional',
	'Pejabat Negara, Karyawan, Pen',
] as const;
