import { ExtendedCalculatorSchema } from './kpr-bank-bca';

export const kprBankBtnSchema: ExtendedCalculatorSchema = {
  id: 'kpr-bank-btn',
  slug: 'kpr-bank-btn',
  silo: 'properti',
  name: 'Kalkulator KPR Bank BTN (Subsidi FLPP & Platinum 2026)',
  category: 'kredit-pembiayaan',
  engineFunction: 'calculate_kpr_general',
  inputs: [
    {
      id: 'propertyPrice',
      label: 'Harga Rumah / Plafon Properti (Rupiah)',
      description: 'Harga rumah subsidi MBR (mulai Rp 185 juta zona Jabodetabek) atau rumah komersial non-subsidi.',
      type: 'currency',
      defaultValue: 185000000,
      validation: {
        min: 50000000,
        max: 10000000000,
        step: 5000000,
        required: true,
      },
    },
    {
      id: 'dpPercent',
      label: 'Uang Muka / Down Payment (%)',
      description: 'Program Subsidi FLPP mengizinkan DP mulai 1%, sedangkan KPR Platinum komersial mulai 5%.',
      type: 'percentage',
      defaultValue: 1.0,
      validation: {
        min: 1.0,
        max: 80.0,
        step: 1.0,
        required: true,
      },
      options: [
        { label: 'DP 1% (Subsidi FLPP)', value: 1.0 },
        { label: 'DP 5% (Platinum Komersial)', value: 5.0 },
        { label: 'DP 10%', value: 10.0 },
        { label: 'DP 20%', value: 20.0 },
      ],
    },
    {
      id: 'annualRate',
      label: 'Suku Bunga KPR BTN (% / Tahun)',
      description: 'Pilih 5.00% tetap sepanjang masa tenor untuk Subsidi FLPP atau skema bunga promo Platinum komersial.',
      type: 'percentage',
      defaultValue: 5.0,
      validation: {
        min: 1.0,
        max: 20.0,
        step: 0.05,
        required: true,
      },
      options: [
        { label: '5.00% (Subsidi FLPP Fixed Sepanjang Tenor)', value: 5.0 },
        { label: '3.75% (Promo Platinum Fix 1 Thn)', value: 3.75 },
        { label: '4.99% (Promo Platinum Fix 2 Thn)', value: 4.99 },
        { label: '6.59% (Promo Platinum Fix 3 Thn)', value: 6.59 },
        { label: '11.50% (Floating Standar)', value: 11.5 },
      ],
    },
    {
      id: 'tenorYears',
      label: 'Jangka Waktu Pinjaman (Tenor)',
      description: 'Subsidi FLPP maksimal 20 tahun, sedangkan KPR BTN Platinum komersial hingga 30 tahun.',
      type: 'slider',
      defaultValue: 20,
      unit: 'Tahun',
      validation: {
        min: 1,
        max: 30,
        step: 1,
        required: true,
      },
      options: [
        { label: '10 Thn', value: 10 },
        { label: '15 Thn', value: 15 },
        { label: '20 Thn (Maks FLPP)', value: 20 },
        { label: '25 Thn', value: 25 },
        { label: '30 Thn (Platinum)', value: 30 },
      ],
    },
    {
      id: 'calculationMethod',
      label: 'Metode Perhitungan Angsuran',
      description: 'KPR BTN Subsidi FLPP dan Platinum menggunakan skema bunga anuitas perbankan.',
      type: 'select',
      defaultValue: 'annuity',
      validation: {
        required: true,
      },
      options: [
        { label: 'Anuitas (Standar BTN KPR)', value: 'annuity' },
      ],
    },
  ],
  outputs: [
    {
      id: 'firstMonthInstallment',
      label: 'Angsuran Bulanan (Fix FLPP / Periode Promo)',
      type: 'currency',
      highlight: true,
    },
    {
      id: 'totalInterestPaid',
      label: 'Total Beban Bunga Selama Tenor',
      type: 'currency',
    },
    {
      id: 'totalUpfrontCost',
      label: 'Estimasi Total Biaya Awal (DP + Biaya Akad)',
      type: 'currency',
    },
    {
      id: 'recommendedMinimumIncome',
      label: 'Syarat Gaji Bersih Minimum (Batas DSR 30%)',
      type: 'currency',
    },
  ],
  seo: {
    title: 'Kalkulator KPR Bank BTN 2026: Simulasi Subsidi FLPP 5% & Platinum',
    description:
      'Hitung simulasi cicilan KPR Bank BTN 2026 resmi. Lengkap dengan bunga tetap 5% Subsidi FLPP MBR, DP mulai 1%, bebas PPN, dan estimasi biaya akad.',
    h1: 'Kalkulator KPR Bank BTN: Simulasi Subsidi FLPP 5% & Platinum 2026',
    directAnswerSnippet:
      'Untuk rumah subsidi MBR seharga Rp 185.000.000 dengan uang muka 1% (Rp 1.850.000) dan plafon kredit Rp 183.150.000, suku bunga KPR BTN Subsidi FLPP 2026 adalah 5,00% tetap (fixed) hingga 20 tahun (240 bulan). Estimasi cicilan per bulan adalah Rp 1.208.709 dengan syarat penghasilan bersih minimal pemohon sekitar Rp 4.029.030 per bulan.',
    faq: [
      {
        question: 'Berapa suku bunga KPR BTN Subsidi FLPP tahun 2026?',
        answer:
          'Suku bunga KPR BTN Subsidi Sejahtera FLPP untuk tahun 2026 adalah 5,00% tetap (fixed) sepanjang masa pinjaman hingga tenor 20 tahun, dengan DP mulai dari 1% dan bebas PPN.',
      },
      {
        question: 'Berapa batas maksimal penghasilan untuk mengajukan KPR BTN Subsidi FLPP?',
        answer:
          'Sesuai regulasi Kementerian PUPR dan BP Tapera, batasan penghasilan MBR (Masyarakat Berpenghasilan Rendah) berkisar antara Rp 8.500.000 (pemohon belum menikah) hingga Rp 10.000.000 - Rp 14.000.000 per bulan tergantung status pernikahan dan zonasi wilayah.',
      },
      {
        question: 'Apakah KPR BTN Subsidi mendapatkan Subsidi Bantuan Uang Muka (SBUM)?',
        answer:
          'Ya, debitur yang memenuhi syarat Masyarakat Berpenghasilan Rendah (MBR) berhak mendapatkan SBUM sebesar Rp 4.000.000 dari pemerintah untuk meringankan pembayaran uang muka rumah tapak.',
      },
      {
        question: 'Berapa cicilan KPR BTN Subsidi untuk rumah seharga Rp 185 juta dengan tenor 20 tahun?',
        answer:
          'Dengan harga rumah Rp 185.000.000 dan uang muka 1% (Rp 1.850.000), plafon kredit pokok adalah Rp 183.150.000. Pada suku bunga subsidi 5,00% per tahun selama 20 tahun (240 bulan), cicilan tetap per bulannya adalah Rp 1.208.709.',
      },
    ],
    simulationTableData: {
      caption: 'Matriks Estimasi Angsuran KPR BTN Subsidi FLPP Bunga 5,00% Tetap & Platinum 2026',
      columns: ['Plafon Pinjaman BTN', 'Tenor 10 Tahun (120 Bln)', 'Tenor 15 Tahun (180 Bln)', 'Tenor 20 Tahun (240 Bln)'],
      rows: [
        ['Rp 150.000.000 (FLPP 5%)', 'Rp 1.590.985', 'Rp 1.186.183', 'Rp 989.934'],
        ['Rp 183.150.000 (FLPP 5%)', 'Rp 1.942.607', 'Rp 1.448.330', 'Rp 1.208.709'],
        ['Rp 300.000.000 (Platinum 4.99%)', 'Rp 3.180.345', 'Rp 2.370.216', 'Rp 1.978.026'],
        ['Rp 500.000.000 (Platinum 4.99%)', 'Rp 5.300.575', 'Rp 3.950.360', 'Rp 3.296.710'],
        ['Rp 750.000.000 (Platinum 4.99%)', 'Rp 7.950.863', 'Rp 5.925.540', 'Rp 4.945.065'],
      ],
    },
    chainedCalculators: [
      {
        title: 'Kalkulator Simulasi KPR Umum',
        slug: 'kpr-simulasi-umum',
        category: 'kredit-pembiayaan',
        description: 'Bandingkan skema anuitas, efektif, dan flat murni dengan rincian biaya notaris.',
      },
      {
        title: 'Kalkulator KPR Bank Mandiri Promo 2026',
        slug: 'kpr-bank-mandiri',
        category: 'kredit-pembiayaan',
        description: 'Simulasi Mandiri Super Promo KPR bunga spesial fixed 1-10 tahun.',
      },
      {
        title: 'Kalkulator KPR Bank BCA Promo 2026',
        slug: 'kpr-bank-bca',
        category: 'kredit-pembiayaan',
        description: 'Simulasi suku bunga KPR BCA fix & cap promo 2026.',
      },
    ],
  },
};
