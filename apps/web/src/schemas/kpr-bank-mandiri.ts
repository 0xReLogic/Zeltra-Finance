import { ExtendedCalculatorSchema } from './kpr-bank-bca';

export const kprBankMandiriSchema: ExtendedCalculatorSchema = {
  id: 'kpr-bank-mandiri',
  slug: 'kpr-bank-mandiri',
  silo: 'properti',
  name: 'Kalkulator KPR Bank Mandiri (Promo Bunga Spesial 2026)',
  category: 'kredit-pembiayaan',
  engineFunction: 'calculate_kpr_general',
  inputs: [
    {
      id: 'propertyPrice',
      label: 'Harga Rumah / Nilai Agunan (Rupiah)',
      description: 'Estimasi harga properti pembelian rumah baru developer rekanan atau rumah second.',
      type: 'currency',
      defaultValue: 750000000,
      validation: {
        min: 100000000,
        max: 20000000000,
        step: 25000000,
        required: true,
      },
    },
    {
      id: 'dpPercent',
      label: 'Uang Muka / Down Payment (%)',
      description: 'Pilihan DP Mandiri KPR mulai dari DP 0% - 5% (Milenial/Payroll) hingga 20%.',
      type: 'percentage',
      defaultValue: 20.0,
      validation: {
        min: 0.0,
        max: 80.0,
        step: 5.0,
        required: true,
      },
      options: [
        { label: 'DP 0%', value: 0 },
        { label: 'DP 5%', value: 5 },
        { label: 'DP 10%', value: 10 },
        { label: 'DP 15%', value: 15 },
        { label: 'DP 20%', value: 20 },
      ],
    },
    {
      id: 'annualRate',
      label: 'Suku Bunga Promo Mandiri (% / Tahun)',
      description: 'Pilihan suku bunga Super Promo Mandiri KPR (Fixed 1, 3, 5, atau 10 tahun).',
      type: 'percentage',
      defaultValue: 5.5,
      validation: {
        min: 1.0,
        max: 20.0,
        step: 0.05,
        required: true,
      },
      options: [
        { label: '3.25% (Fixed 1 Thn)', value: 3.25 },
        { label: '4.50% (Fixed 3 Thn)', value: 4.5 },
        { label: '5.50% (Fixed 5 Thn)', value: 5.5 },
        { label: '7.25% (Fixed 10 Thn)', value: 7.25 },
        { label: '11.00% (Floating Est)', value: 11.0 },
      ],
    },
    {
      id: 'tenorYears',
      label: 'Jangka Waktu Pinjaman (Tenor)',
      description: 'Mandiri KPR melayani tenor panjang hingga 30 tahun (360 bulan).',
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
        { label: '20 Thn', value: 20 },
        { label: '25 Thn', value: 25 },
        { label: '30 Thn', value: 30 },
      ],
    },
    {
      id: 'calculationType',
      label: 'Skema Perhitungan',
      description: 'Standar Mandiri KPR menggunakan sistem bunga anuitas bulanan tetap.',
      type: 'select',
      defaultValue: 'annuity',
      validation: {
        required: true,
      },
      options: [
        { label: 'Anuitas (Standar Mandiri KPR)', value: 'annuity' },
      ],
    },
  ],
  outputs: [
    {
      id: 'firstMonthInstallment',
      label: 'Estimasi Cicilan per Bulan (Masa Fixed)',
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
    title: 'Kalkulator Simulasi KPR Bank Mandiri 2026: Promo Bunga Spesial & Syarat Gaji',
    description:
      'Simulasi resmi cicilan KPR Bank Mandiri 2026. Hitung promo suku bunga fixed 3.25% - 5.50%, estimasi angsuran bulanan, biaya provisi 1%, dan syarat gaji minimal.',
    h1: 'Kalkulator KPR Bank Mandiri: Simulasi Bunga Promo & Angsuran 2026',
    directAnswerSnippet:
      'Untuk pengajuan Mandiri KPR dengan harga properti Rp 750.000.000 dan DP 20% (Plafon Rp 600.000.000), suku bunga promo fixed 5 tahun 5,50% per tahun dan tenor 20 tahun (240 bulan), estimasi angsuran bulanan adalah Rp 4.127.324 per bulan dengan estimasi biaya akad awal sebesar Rp 169.000.000 dan syarat gaji bersih minimal Rp 13.757.747 per bulan.',
    faq: [
      {
        question: 'Berapa suku bunga promo KPR Bank Mandiri di tahun 2026?',
        answer:
          'Bank Mandiri menawarkan program Super Promo dengan pilihan bunga fixed: 3,25% fixed 1 tahun, 4,50% fixed 3 tahun, 5,50% fixed 5 tahun, dan 7,25% fixed 10 tahun untuk pembelian rumah baru di developer rekanan pilihan.',
      },
      {
        question: 'Apakah pengajuan KPR Mandiri bisa dengan DP 0%?',
        answer:
          'Bisa. Sesuai pelonggaran LTV Bank Indonesia, Bank Mandiri menyediakan program DP mulai 0% hingga 5% khusus bagi nasabah payroll Mandiri dan pembelian properti dari developer tier-1 rekanan bank.',
      },
      {
        question: 'Berapa lama tenor maksimal Mandiri KPR untuk rumah tinggal?',
        answer:
          'Mandiri KPR menawarkan fasilitas jangka waktu pinjaman hingga maksimal 30 tahun (atau usia debitur maksimal 55 tahun untuk karyawan dan 65 tahun untuk profesional saat kredit lunas).',
      },
      {
        question: 'Apa yang terjadi setelah masa fixed promo bunga Mandiri KPR berakhir?',
        answer:
          'Setelah masa fixed bunga berakhir, suku bunga akan berubah mengikuti Suku Bunga Dasar Kredit (SBDK) Floating Mandiri KPR yang berkisar antara 11,00% hingga 13,00% per tahun sesuai kebijakan perbankan yang berlaku.',
      },
    ],
    simulationTableData: {
      caption: 'Matriks Estimasi Angsuran Mandiri KPR Promo Bunga 5,50% per Tahun',
      columns: ['Plafon Mandiri KPR', 'Tenor 10 Tahun (120 Bln)', 'Tenor 15 Tahun (180 Bln)', 'Tenor 20 Tahun (240 Bln)'],
      rows: [
        ['Rp 300.000.000', 'Rp 3.255.454', 'Rp 2.451.782', 'Rp 2.063.662'],
        ['Rp 500.000.000', 'Rp 5.425.757', 'Rp 4.086.303', 'Rp 3.439.437'],
        ['Rp 600.000.000', 'Rp 6.510.908', 'Rp 4.903.564', 'Rp 4.127.324'],
        ['Rp 750.000.000', 'Rp 8.138.635', 'Rp 6.129.455', 'Rp 5.159.155'],
        ['Rp 1.000.000.000', 'Rp 10.851.514', 'Rp 8.172.607', 'Rp 6.878.873'],
      ],
    },
    chainedCalculators: [
      {
        title: 'Kalkulator KPR Bank BCA Promo 2026',
        slug: 'kpr-bank-bca',
        category: 'kredit-pembiayaan',
        description: 'Bandingkan cicilan Mandiri KPR dengan promo suku bunga KPR BCA.',
      },
      {
        title: 'Kalkulator Pajak Pembeli BPHTB & Biaya Notaris',
        slug: 'biaya-notaris-bphtb-rumah',
        category: 'analisis-properti',
        description: 'Hitung rincian akurat biaya legalitas, BPHTB, dan akta jual beli rumah.',
      },
    ],
  },
};
