import { CalculatorSchema } from '@zeltra/shared-contracts';

export interface ExtendedCalculatorSchema extends CalculatorSchema {
  silo: string;
}

export const kprBankBcaSchema: ExtendedCalculatorSchema = {
  id: 'kpr-bank-bca',
  slug: 'kpr-bank-bca',
  silo: 'properti',
  name: 'Kalkulator KPR Bank BCA & Bank Mandiri (Bunga Anuitas)',
  category: 'kredit-pembiayaan',
  engineFunction: 'calculate_kpr_annuity',
  inputs: [
    {
      id: 'principal',
      label: 'Plafon Pinjaman Pokok (Rupiah)',
      description: 'Total pembiayaan kredit rumah yang disetujui pihak perbankan.',
      type: 'currency',
      defaultValue: 500000000,
      validation: {
        min: 25000000,
        max: 20000000000,
        step: 5000000,
        required: true,
      },
    },
    {
      id: 'annualRate',
      label: 'Suku Bunga Efektif Tahunan (%)',
      description: 'Suku bunga fixed promo atau floating KPR BCA / Mandiri.',
      type: 'percentage',
      defaultValue: 7.0,
      validation: {
        min: 1.0,
        max: 25.0,
        step: 0.1,
        required: true,
      },
    },
    {
      id: 'tenorYears',
      label: 'Jangka Waktu Pinjaman (Tenor)',
      description: 'Masa pelunasan kredit dalam satuan tahun.',
      type: 'slider',
      defaultValue: 15,
      unit: 'Tahun',
      validation: {
        min: 1,
        max: 30,
        step: 1,
        required: true,
      },
      options: [
        { label: '5 Thn', value: 5 },
        { label: '10 Thn', value: 10 },
        { label: '15 Thn', value: 15 },
        { label: '20 Thn', value: 20 },
        { label: '25 Thn', value: 25 },
      ],
    },
  ],
  outputs: [
    {
      id: 'monthlyInstallment',
      label: 'Estimasi Cicilan per Bulan',
      type: 'currency',
      highlight: true,
    },
    {
      id: 'totalInterestPaid',
      label: 'Total Akumulasi Bunga',
      type: 'currency',
    },
    {
      id: 'totalPayment',
      label: 'Total Pembayaran Pokok + Bunga',
      type: 'currency',
    },
  ],
  seo: {
    title: 'Kalkulator Simulasi KPR BCA & Mandiri 2026 - Hitung Cicilan Anuitas Presisi',
    description:
      'Simulasi resmi cicilan KPR Bank BCA dan Mandiri menggunakan formula anuitas presisi perbankan. Ketahui rincian angsuran bulanan dan jadwal amortisasi 100% akurat.',
    h1: 'Kalkulator KPR Bank BCA & Mandiri: Simulasi Angsuran Bulanan Presisi',
    directAnswerSnippet:
      'Untuk pinjaman KPR BCA sebesar Rp 500.000.000 dengan suku bunga anuitas 7,00% per tahun dan tenor 15 tahun (180 bulan), estimasi angsuran bulanan tetap adalah Rp 4.494.141 per bulan dengan total bunga terbayar sebesar Rp 308.945.380.',
    faq: [
      {
        question: 'Bagaimana rumus dasar perhitungan bunga anuitas KPR BCA?',
        answer:
          'Perhitungan angsuran bulanan KPR anuitas menggunakan rumus perbankan standar: A = P x [i x (1 + i)^n] / [(1 + i)^n - 1], di mana P adalah pokok pinjaman, i adalah suku bunga bulanan (bunga tahunan dibagi 12), dan n adalah total tenor dalam bulan.',
      },
      {
        question: 'Apakah hasil cicilan pada kalkulator ini sama persis dengan tabel cicilan bank?',
        answer:
          'Ya. Zeltra Finance memvalidasi seluruh hasil kalkulasi terhadap tabel cicilan resmi bank menggunakan metode pembulatan sesuai standar perbankan nasional. Hasilnya dijamin sama persis dengan angsuran yang tertera di surat penawaran KPR bank.',
      },
      {
        question: 'Berapa batasan ideal rasio cicilan KPR terhadap gaji (DSR)?',
        answer:
          'Bank Indonesia dan analis perbankan menyarankan rasio Debt Service Ratio (DSR) maksimal berada pada kisaran 30% hingga 35% dari total penghasilan bersih bulanan pemohon kredit.',
      },
    ],
    simulationTableData: {
      caption: 'Matriks Estimasi Angsuran Bulanan KPR (Bunga 7,00% Efektif Anuitas)',
      columns: ['Plafon KPR', 'Tenor 10 Tahun (120 Bln)', 'Tenor 15 Tahun (180 Bln)', 'Tenor 20 Tahun (240 Bln)'],
      rows: [
        ['Rp 250.000.000', 'Rp 2.902.712', 'Rp 2.247.071', 'Rp 1.938.247'],
        ['Rp 500.000.000', 'Rp 5.805.424', 'Rp 4.494.141', 'Rp 3.876.494'],
        ['Rp 750.000.000', 'Rp 8.708.136', 'Rp 6.741.212', 'Rp 5.814.741'],
        ['Rp 1.000.000.000', 'Rp 11.610.848', 'Rp 8.988.283', 'Rp 7.752.987'],
        ['Rp 1.500.000.000', 'Rp 17.416.271', 'Rp 13.482.424', 'Rp 11.629.481'],
      ],
    },
    chainedCalculators: [
      {
        title: 'Kalkulator Rasio Gaji Maksimal KPR (30% DSR)',
        slug: 'kemampuan-maksimal-kpr',
        category: 'kredit-pembiayaan',
        description: 'Hitung plafon rumah maksimal yang dapat disetujui bank berdasarkan penghasilan bulanan Anda.',
      },
      {
        title: 'Kalkulator Biaya Notaris & Pajak BPHTB Beli Rumah',
        slug: 'biaya-notaris-bphtb-rumah',
        category: 'analisis-properti',
        description: 'Estimasi total biaya legalitas, BPHTB, appraisal, dan provisi bank saat akad kredit.',
      },
    ],
  },
};
