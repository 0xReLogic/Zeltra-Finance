import { ExtendedCalculatorSchema } from './kpr-bank-bca';

export const kprCimbNiagaSchema: ExtendedCalculatorSchema = {
  id: 'kpr-cimb-niaga',
  slug: 'kpr-cimb-niaga',
  silo: 'properti',
  name: 'Kalkulator KPR CIMB Niaga (KPR Xtra Promo 2026)',
  category: 'kredit-pembiayaan',
  engineFunction: 'calculate_kpr_general',
  inputs: [
    {
      id: 'propertyPrice',
      label: 'Harga Rumah / Nilai Agunan (Rupiah)',
      description: 'Estimasi nilai properti pembelian rumah baru rekanan CIMB Niaga atau rumah seken.',
      type: 'currency',
      defaultValue: 800000000,
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
      description: 'Fasilitas DP ringan mulai dari 0% - 5% (nasabah payroll/OCTO Card/developer tier-1) hingga 20%.',
      type: 'percentage',
      defaultValue: 15.0,
      validation: {
        min: 0.0,
        max: 80.0,
        step: 5.0,
        required: true,
      },
      options: [
        { label: 'DP 0% (Payroll CIMB)', value: 0.0 },
        { label: 'DP 5% (Developer Rekanan)', value: 5.0 },
        { label: 'DP 10%', value: 10.0 },
        { label: 'DP 15% (Standar)', value: 15.0 },
        { label: 'DP 20%', value: 20.0 },
      ],
    },
    {
      id: 'annualRate',
      label: 'Suku Bunga KPR Xtra CIMB Niaga (% / Tahun)',
      description: 'Pilihan suku bunga promo KPR Xtra CIMB Niaga (Fixed 1, 3, 5, atau 10 tahun).',
      type: 'percentage',
      defaultValue: 4.5,
      validation: {
        min: 1.0,
        max: 20.0,
        step: 0.05,
        required: true,
      },
      options: [
        { label: '2.99% (Promo Spesial Fixed 1 Thn)', value: 2.99 },
        { label: '4.50% (Promo Favorit Fixed 3 Thn)', value: 4.5 },
        { label: '5.00% (Promo Mantap Fixed 5 Thn)', value: 5.0 },
        { label: '8.50% (KPR Xtra Pasti Fixed 10 Thn)', value: 8.5 },
        { label: '11.50% (Floating SBDK Counter Rate)', value: 11.5 },
      ],
    },
    {
      id: 'tenorYears',
      label: 'Jangka Waktu Pinjaman (Tenor)',
      description: 'KPR Xtra CIMB Niaga melayani jangka waktu kredit panjang hingga 25 tahun (300 bulan).',
      type: 'slider',
      defaultValue: 20,
      unit: 'Tahun',
      validation: {
        min: 1,
        max: 25,
        step: 1,
        required: true,
      },
      options: [
        { label: '10 Thn', value: 10 },
        { label: '15 Thn', value: 15 },
        { label: '20 Thn', value: 20 },
        { label: '25 Thn (Maksimal)', value: 25 },
      ],
    },
    {
      id: 'calculationMethod',
      label: 'Metode Perhitungan Angsuran',
      description: 'KPR Xtra CIMB Niaga menggunakan perhitungan bunga anuitas perbankan standar.',
      type: 'select',
      defaultValue: 'annuity',
      validation: {
        required: true,
      },
      options: [
        { label: 'Anuitas (Standar KPR Xtra CIMB Niaga)', value: 'annuity' },
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
      label: 'Estimasi Total Biaya Akad (DP + Provisi 1% + Admin + Notaris)',
      type: 'currency',
    },
    {
      id: 'recommendedMinimumIncome',
      label: 'Syarat Gaji Bersih Minimum (Batas DSR 30%)',
      type: 'currency',
    },
  ],
  seo: {
    title: 'Kalkulator KPR CIMB Niaga 2026: Simulasi Bunga KPR Xtra & Cicilan Bulanan',
    description:
      'Simulasi resmi cicilan KPR CIMB Niaga 2026. Hitung promo suku bunga fixed mulai 2.99% - 4.50%, tenor s.d 25 tahun, DP 0%, dan estimasi biaya akad KPR Xtra.',
    h1: 'Kalkulator KPR CIMB Niaga: Simulasi Bunga Promo KPR Xtra 2026',
    directAnswerSnippet:
      'Untuk pengajuan KPR Xtra CIMB Niaga dengan harga rumah Rp 800.000.000 dan uang muka 15% (Plafon Kredit Rp 680.000.000), suku bunga promo fixed 3 tahun sebesar 4,50% per tahun dan tenor 20 tahun (240 bulan), estimasi angsuran bulanan adalah Rp 4.302.016 per bulan dengan estimasi biaya awal akad sekitar Rp 140.900.000 dan syarat penghasilan bersih minimal Rp 14.340.053 per bulan.',
    faq: [
      {
        question: 'Berapa suku bunga promo KPR CIMB Niaga (KPR Xtra) tahun 2026?',
        answer:
          'CIMB Niaga menawarkan pilihan suku bunga promo KPR Xtra: 2,99% fixed 1 tahun, 4,50% fixed 3 tahun, 5,00% fixed 5 tahun, serta paket KPR Xtra Pasti 8,50% fixed hingga 10 tahun untuk pembelian properti di developer rekanan terpilih.',
      },
      {
        question: 'Apa itu produk KPR Xtra Manfaat dari CIMB Niaga?',
        answer:
          'KPR Xtra Manfaat adalah fasilitas pembiayaan inovatif yang menghubungkan pinjaman KPR dengan hingga 9 rekening tabungan keluarga CIMB Niaga, di mana 80% dari saldo tabungan diperhitungkan untuk memangkas pokok pinjaman sehingga bunga harian berkurang drastis dan tenor kredit bisa lunas lebih cepat.',
      },
      {
        question: 'Berapa lama tenor maksimal pinjaman KPR CIMB Niaga?',
        answer:
          'CIMB Niaga menyediakan fasilitas jangka waktu pinjaman hingga 25 tahun (300 bulan) atau usia debitur maksimal 58 tahun saat jatuh tempo untuk karyawan dan 65 tahun untuk wiraswasta/profesional.',
      },
      {
        question: 'Apakah pengajuan KPR CIMB Niaga bisa menggunakan program DP 0%?',
        answer:
          'Bisa. CIMB Niaga mendukung program relaksasi LTV Bank Indonesia dengan menyediakan fasilitas DP mulai 0% hingga 5% bagi nasabah program payroll CIMB Niaga serta pembelian rumah pertama dari pengembang rekanan tier-1.',
      },
    ],
    simulationTableData: {
      caption: 'Matriks Estimasi Angsuran KPR Xtra CIMB Niaga Promo Bunga 4,50% per Tahun',
      columns: ['Plafon KPR Xtra', 'Tenor 10 Tahun (120 Bln)', 'Tenor 15 Tahun (180 Bln)', 'Tenor 20 Tahun (240 Bln)'],
      rows: [
        ['Rp 500.000.000', 'Rp 5.181.933', 'Rp 3.824.978', 'Rp 3.163.247'],
        ['Rp 680.000.000', 'Rp 7.047.428', 'Rp 5.201.970', 'Rp 4.302.016'],
        ['Rp 750.000.000', 'Rp 7.772.899', 'Rp 5.737.467', 'Rp 4.744.871'],
        ['Rp 1.000.000.000', 'Rp 10.363.865', 'Rp 7.649.956', 'Rp 6.326.494'],
        ['Rp 1.500.000.000', 'Rp 15.545.798', 'Rp 11.474.934', 'Rp 9.489.741'],
      ],
    },
    chainedCalculators: [
      {
        title: 'Kalkulator KPR Bank BCA Promo 2026',
        slug: 'kpr-bank-bca',
        category: 'kredit-pembiayaan',
        description: 'Bandingkan KPR Xtra CIMB Niaga dengan promo suku bunga KPR BCA.',
      },
      {
        title: 'Kalkulator KPR Bank Mandiri Promo 2026',
        slug: 'kpr-bank-mandiri',
        category: 'kredit-pembiayaan',
        description: 'Simulasi Mandiri Super Promo KPR bunga spesial fixed 1-10 tahun.',
      },
      {
        title: 'Kalkulator KPR Bank BNI (BNI Griya)',
        slug: 'kpr-bank-bni',
        category: 'kredit-pembiayaan',
        description: 'Bandingkan skema cicilan dengan promo suku bunga BNI Griya.',
      },
    ],
  },
};
