import { ExtendedCalculatorSchema } from './kpr-bank-bca';

export const kprBankBriSchema: ExtendedCalculatorSchema = {
  id: 'kpr-bank-bri',
  slug: 'kpr-bank-bri',
  silo: 'properti',
  name: 'Kalkulator KPR Bank BRI (Griya BRI Promo Suku Bunga 2026)',
  category: 'kredit-pembiayaan',
  engineFunction: 'calculate_kpr_general',
  inputs: [
    {
      id: 'propertyPrice',
      label: 'Harga Rumah / Nilai Agunan (Rupiah)',
      description: 'Estimasi nilai properti rumah baru developer rekanan BRI atau rumah second.',
      type: 'currency',
      defaultValue: 500000000,
      validation: {
        min: 100000000,
        max: 20000000000,
        step: 10000000,
        required: true,
      },
    },
    {
      id: 'dpPercent',
      label: 'Uang Muka / Down Payment (%)',
      description: 'Program Griya BRI menyediakan DP ringan mulai dari 0% - 5% (khusus payroll BRI) hingga standar 10% - 20%.',
      type: 'percentage',
      defaultValue: 10.0,
      validation: {
        min: 0.0,
        max: 80.0,
        step: 5.0,
        required: true,
      },
      options: [
        { label: 'DP 0% (Payroll BRI)', value: 0.0 },
        { label: 'DP 5% (Developer Rekanan)', value: 5.0 },
        { label: 'DP 10% (Standar)', value: 10.0 },
        { label: 'DP 20%', value: 20.0 },
      ],
    },
    {
      id: 'annualRate',
      label: 'Suku Bunga KPR Griya BRI (% / Tahun)',
      description: 'Pilihan suku bunga promo KPR Griya BRI (Fixed 1, 3, 5, atau 8 tahun).',
      type: 'percentage',
      defaultValue: 5.45,
      validation: {
        min: 1.0,
        max: 20.0,
        step: 0.05,
        required: true,
      },
      options: [
        { label: '2.50% (Promo Spesial Fixed 1 Thn)', value: 2.5 },
        { label: '3.75% (Promo Spesial Fixed 3 Thn)', value: 3.75 },
        { label: '5.45% (Promo Mantap Fixed 5 Thn)', value: 5.45 },
        { label: '7.50% (Promo Berjenjang Fixed 8 Thn)', value: 7.5 },
        { label: '11.25% (Floating Standar Counter Rate)', value: 11.25 },
      ],
    },
    {
      id: 'tenorYears',
      label: 'Jangka Waktu Pinjaman (Tenor)',
      description: 'KPR BRI Griya melayani jangka waktu kredit fleksibel hingga 20 tahun (240 bulan).',
      type: 'slider',
      defaultValue: 15,
      unit: 'Tahun',
      validation: {
        min: 1,
        max: 20,
        step: 1,
        required: true,
      },
      options: [
        { label: '5 Thn', value: 5 },
        { label: '10 Thn', value: 10 },
        { label: '15 Thn', value: 15 },
        { label: '20 Thn', value: 20 },
      ],
    },
    {
      id: 'calculationMethod',
      label: 'Metode Perhitungan Angsuran',
      description: 'KPR BRI Griya menggunakan perhitungan bunga anuitas perbankan konvensional.',
      type: 'select',
      defaultValue: 'annuity',
      validation: {
        required: true,
      },
      options: [
        { label: 'Anuitas (Standar KPR BRI Griya)', value: 'annuity' },
      ],
    },
  ],
  outputs: [
    {
      id: 'firstMonthInstallment',
      label: 'Estimasi Cicilan per Bulan (Masa Fixed Promo)',
      type: 'currency',
      highlight: true,
    },
    {
      id: 'totalInterestPaid',
      label: 'Total Akumulasi Bunga (Masa Promo)',
      type: 'currency',
    },
    {
      id: 'totalUpfrontCost',
      label: 'Estimasi Total Biaya Akad (DP + Provisi + Admin + Notaris)',
      type: 'currency',
    },
    {
      id: 'recommendedMinimumIncome',
      label: 'Syarat Gaji Bersih Minimum (Batas DSR 30%)',
      type: 'currency',
    },
  ],
  seo: {
    title: 'Kalkulator Simulasi KPR Bank BRI (Griya BRI) 2026: Bunga Promo & Tabel Cicilan',
    description:
      'Simulasi resmi cicilan KPR BRI Griya 2026. Hitung promo suku bunga fixed mulai 2.50% - 5.45%, angsuran bulanan, biaya provisi, dan syarat gaji minimal.',
    h1: 'Kalkulator KPR Bank BRI: Simulasi Cicilan Griya BRI 2026',
    directAnswerSnippet:
      'Untuk pengajuan KPR BRI Griya dengan harga rumah Rp 500.000.000 dan uang muka 10% (DP Rp 50.000.000, Plafon Kredit Rp 450.000.000), suku bunga promo fixed 5 tahun 5,45% per tahun dan tenor 15 tahun (180 bulan), estimasi angsuran bulanan adalah Rp 3.664.947 per bulan dengan estimasi biaya awal akad sekitar Rp 64.500.000 dan syarat penghasilan bersih minimal Rp 12.216.490 per bulan.',
    faq: [
      {
        question: 'Berapa suku bunga promo KPR Bank BRI (Griya BRI) di tahun 2026?',
        answer:
          'Bank BRI menyediakan promo suku bunga fixed berjenjang mulai dari 2,50% fixed 1 tahun, 3,75% fixed 3 tahun, hingga 5,45% fixed 5 tahun untuk pembelian rumah baru di pengembang rekanan resmi BRI.',
      },
      {
        question: 'Apakah KPR BRI Griya melayani program DP 0%?',
        answer:
          'Ya, program DP 0% - 5% tersedia untuk nasabah yang menerima gaji melalui rekening BRI (payroll) serta pembelian aset properti dari developer rekanan tier-1 sesuai dengan kebijakan pelonggaran LTV Bank Indonesia.',
      },
      {
        question: 'Berapa jangka waktu (tenor) maksimal KPR BRI Griya?',
        answer:
          'KPR BRI Griya menyediakan fasilitas tenor pinjaman hingga maksimal 20 tahun (240 bulan) untuk nasabah umum, atau hingga usia pensiun saat kredit lunas.',
      },
      {
        question: 'Apa saja komponen biaya awal saat pengajuan KPR BRI?',
        answer:
          'Biaya awal mencakup Uang Muka (DP), biaya provisi (biasanya 0,5% - 1% dari plafon kredit, sering ada diskon/bebas provisi saat expo promo), biaya administrasi, biaya notaris/akta jual beli/APHT, serta premi asuransi jiwa dan kebakaran.',
      },
    ],
    simulationTableData: {
      caption: 'Matriks Estimasi Angsuran KPR BRI Griya Promo Suku Bunga 5,45% per Tahun',
      columns: ['Plafon KPR BRI', 'Tenor 10 Tahun (120 Bln)', 'Tenor 15 Tahun (180 Bln)', 'Tenor 20 Tahun (240 Bln)'],
      rows: [
        ['Rp 250.000.000', 'Rp 2.708.384', 'Rp 2.036.082', 'Rp 1.712.185'],
        ['Rp 450.000.000', 'Rp 4.875.092', 'Rp 3.664.947', 'Rp 3.081.933'],
        ['Rp 500.000.000', 'Rp 5.416.769', 'Rp 4.072.164', 'Rp 3.424.370'],
        ['Rp 750.000.000', 'Rp 8.125.153', 'Rp 6.108.246', 'Rp 5.136.555'],
        ['Rp 1.000.000.000', 'Rp 10.833.538', 'Rp 8.144.327', 'Rp 6.848.740'],
      ],
    },
    chainedCalculators: [
      {
        title: 'Kalkulator KPR Bank Mandiri Promo 2026',
        slug: 'kpr-bank-mandiri',
        category: 'kredit-pembiayaan',
        description: 'Bandingkan promo Griya BRI dengan Super Promo KPR Bank Mandiri.',
      },
      {
        title: 'Kalkulator KPR Bank BTN (Subsidi FLPP)',
        slug: 'kpr-bank-btn',
        category: 'kredit-pembiayaan',
        description: 'Simulasi rumah subsidi bunga tetap 5% dan program KPR BTN.',
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
