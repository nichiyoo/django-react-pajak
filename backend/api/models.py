from django.db import models
from django.contrib.auth.models import User
from django.core.validators import MaxValueValidator, MinValueValidator
from datetime import datetime


class KPPChoice(models.TextChoices):
    PRAKATAMA_JAKARTA_TANAH_ABANG_TIGA = "KPP Pratama Jakarta Tanah Abang Tiga"


class WPChoice(models.TextChoices):
    BADAN = "WP Badan"
    OP_KARYAWAN = "WP Op Karyawan"
    OP_NON_KARYAWAN = "WP Op Non Karyawan"


class SPTChoice(models.TextChoices):
    SPT_PPH_BADAN = "SPT PPh Badan"
    SPT_PPH_OP_1770 = "SPT PPh OP 1770"
    SPT_PPH_OP_1770S = "SPT PPh OP 1770S"
    SPT_PPH_OP_1770SS = "SPT PPh OP 1770SS"


class StatusChoice(models.TextChoices):
    KURANG_BAYAR = "Kurang Bayar"
    LEBIH_BAYAR = "Lebih Bayar"
    NIHIL = "Nihil"


class KanalChoice(models.TextChoices):
    DPC_WEB_SERVICE = "DPC Web Service"
    SPTXML = "SPTXML"
    E_FILING = "e-Filing (ASP)"
    E_FILING_PAJAK_DOT_GO_ID = "e-Filing pajak.go.id"
    E_FORM = "e-Form"
    E_SPT_TAHUNAN_YANG_BARU = "e-SPT Tahunan yang Baru"


class CategoryKLUChoice(models.TextChoices):
    A = "Pertanian, Kehutanan, dan Peri"
    B = "Pertambangan dan Penggalian"
    C = "Industri Pengolahan"
    D = "Pengadaan Listrik, Gas, UAP/A"
    E = "Treatment Air"
    F = "Konstruksi"
    G = "Perdagangan Besar dan Eceran"
    H = "Pengangkutan dan Pergudangan"
    I = "Penyediaan Akomodasi dan Peny"
    J = "Informasi dan Komunikasi"
    K = "Aktivitas Keuangan dan Asuran"
    L = "Real Estat"
    M = "Aktivitas Profesional, Ilmiah"
    N = "Aktivitas Penyewaan dan Sewa"
    O = "Administrasi Perintahan Pe"
    P = "Pendidikan"
    Q = "Aktivitas Kesehatan Manusia Da"
    R = "Kesenian, Hiburan, dan Rekreasi"
    S = "Aktivitas Jasa Lainnya"
    T = "Aktivitas Rumah Tangga Sebagai"
    U = "Aktivitas Badan Internasional"
    Z = "Pejabat Negara, Karyawan, Pen"


class Laporan(models.Model):
    kpp = models.CharField(max_length=100, choices=KPPChoice.choices)
    wp = models.CharField(max_length=100, choices=WPChoice.choices)
    spt = models.CharField(max_length=100, choices=SPTChoice.choices)
    status = models.CharField(max_length=100, choices=StatusChoice.choices)
    kanal = models.CharField(max_length=100, choices=KanalChoice.choices)
    kategori = models.CharField(max_length=100, choices=CategoryKLUChoice.choices)
    bulan = models.IntegerField(
        default=1,
        validators=[
            MinValueValidator(1),
            MaxValueValidator(12),
        ],
    )
    tahun = models.IntegerField(
        default=datetime.now().year,
        validators=[
            MaxValueValidator(datetime.now().year),
        ],
    )
    nama = models.CharField(max_length=100)
    npwp = models.CharField(max_length=15)
    pendapatan = models.BigIntegerField(
        default=0,
        validators=[MinValueValidator(0)],
    )
    kepatuhan = models.DecimalField(
        max_digits=5,
        decimal_places=2,
        null=True,
        blank=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.npwp
