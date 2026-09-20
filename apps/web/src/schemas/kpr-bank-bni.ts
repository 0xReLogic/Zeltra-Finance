import { ExtendedCalculatorSchema } from './kpr-bank-bca';

export const kprBankBniSchema: ExtendedCalculatorSchema = {
  id: 'kpr-bank-bni',
  slug: 'kpr-bank-bni',
  silo: 'properti',
  name: 'Kalkulator KPR Bank BNI (BNI Griya Promo Suku Bunga 2026)',
  category: 'kredit-pembiayaan',
  engineFunction: 'calculate_kpr_general',
  inputs: [
    {
      id: 'propertyPrice',
      label: 'Harga Rumah / Nilai Agunan (Rupiah)',
      description: 'Estimasi nilai properti pembelian rumah baru rekanan BNI atau rumah seken.',
      type: 'currency',
      defaultValue: 600000000,
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
      description: 'BNI Griya menyediakan fasilitas DP ringan mulai dari 0% - 1% (program BNI Griya Gue / Payroll) hingga 20%.',
      type: 'percentage',
      defaultValue: 10.0,
      validation: {
        min: 0.0,
        max: 80.0,
        step: 5.0,
        required: true,
      },
      options: [
        { label: 'DP 0% (BNI Griya Gue / Payroll)', value: 0.0 },
        { label: 'DP 5% (Developer Rekanan)', value: 5.0 },
        { label: 'DP 10% (Standar)', value: 10.0 },
        { label: 'DP 20%', value: 20.0 },
      ],
    },
    {
      id: 'annualRate',
      label: 'Suku Bunga KPR BNI Griya (% / Tahun)',
      description: 'Pilihan suku bunga promo BNI Griya (Fixed 1, 3, 5, atau 10 tahun).',
      type: 'percentage',
      defaultValue: 4.75,
      validation: {
        min: 1.0,
        max: 20.0,
        step: 0.05,
        required: true,
      },
      options: [
        { label: '2.75% (Promo Spesial Fixed 1 Thn)', value: 2.75 },
        { label: '3.75% (Promo Spesial Fixed 3 Thn)', value: 3.75 },
        { label: '4.75% (Promo Mantap Fixed 5 Thn)', value: 4.75 },
        { label: '7.75% (Promo Mantap Fixed 10 Thn)', value: 7.75 },
        { label: '11.00% (Floating SBDK Counter Rate)', value: 11.0 },
      ],
    },
    {
      id: 'tenorYears',
      label: 'Jangka Waktu Pinjaman (Tenor)',
      description: 'BNI Griya melayani jangka waktu kredit panjang dan fleksibel hingga 30 tahun (360 bulan).',
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
        { label: '30 Thn (Maksimal)', value: 30 },
      ],
    },
    {
      id: 'calculationMethod',
      label: 'Metode Perhitungan Angsuran',
      description: 'BNI Griya menggunakan perhitungan bunga anuitas perbankan standar.',
      type: 'select',
      defaultValue: 'annuity',
      validation: {
        required: true,
      },
      options: [
        { label: 'Anuitas (Standar BNI Griya)', value: 'annuity' },
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
    title: 'Kalkulator Simulasi KPR Bank BNI (BNI Griya) 2026: Promo Bunga & Angsuran',
    description:
      'Hitung simulasi resmi cicilan KPR BNI Griya 2026. Promo suku bunga fixed mulai 2.75% - 4.75%, tenor hingga 30 tahun, fasilitas DP 0%, dan estimasi biaya akad.',
    h1: 'Kalkulator KPR Bank BNI: Simulasi Bunga Promo BNI Griya 2026',
    directAnswerSnippet:
      'Untuk pengajuan BNI Griya dengan harga rumah Rp 600.000.000 dan uang muka 10% (Plafon Pinjaman Rp 540.000.000), suku bunga promo fixed 5 tahun sebesar 4,75% per tahun dan tenor 20 tahun (240 bulan), estimasi angsuran bulanan adalah Rp 3.489.608 per bulan dengan estimasi total biaya awal akad sekitar Rp 77.200.000 dan syarat penghasilan bersih minimal Rp 11.632.027 per bulan.',
    faq: [
      {
        question: 'Berapa suku bunga promo KPR Bank BNI (BNI Griya) di tahun 2026?',
        answer:
          'Bank BNI menawarkan skema suku bunga promo menarik: 2,75% fixed 1 tahun, 3,75% fixed 3 tahun, 4,75% fixed 5 tahun, hingga 7,75% fixed 10 tahun untuk pembelian properti di developer rekanan terpilih.',
      },
      {
        question: 'Apa itu program BNI Griya Gue untuk milenial?',
        answer:
          'BNI Griya Gue adalah program kredit kepemilikan rumah khusus untuk generasi muda dan milenial dengan rentang usia 21 hingga 35 tahun, yang menawarkan fitur uang muka mulai dari 0%, fitur cicilan suka-suka sesuai jenjang karier, dan tenor panjang hingga 30 tahun.',
      },
      {
        question: 'Berapa batas maksimal jangka waktu (tenor) BNI Griya?',
        answer:
          'BNI Griya menyediakan fasilitas tenor pinjaman hingga 30 tahun (atau usia debitur maksimal 55 tahun saat kredit lunas untuk karyawan dan 65 tahun untuk profesional/wiraswasta).',
      },
      {
        question: 'Apa yang dimaksud dengan fitur KPR Cermat di BNI Griya?',
        answer:
          'Fitur KPR Cermat memungkinkan nasabah mendapatkan diskon atau pengurangan beban suku bunga KPR dengan cara mengendapkan saldo rata-rata harian (SRH) tertentu di rekening tabungan BNI yang terhubung.',
      },
    ],
    simulationTableData: {
      caption: 'Matriks Estimasi Angsuran KPR BNI Griya Promo Suku Bunga 4,75% per Tahun',
      columns: ['Plafon BNI Griya', 'Tenor 10 Tahun (120 Bln)', 'Tenor 15 Tahun (180 Bln)', 'Tenor 20 Tahun (240 Bln)'],
      rows: [
        ['Rp 300.000.000', 'Rp 3.146.425', 'Rp 2.334.808', 'Rp 1.938.671'],
        ['Rp 500.000.000', 'Rp 5.244.041', 'Rp 3.891.347', 'Rp 3.231.118'],
        ['Rp 540.000.000', 'Rp 5.663.565', 'Rp 4.202.654', 'Rp 3.489.608'],
        ['Rp 750.000.000', 'Rp 7.866.062', 'Rp 5.837.020', 'Rp 4.846.678'],
        ['Rp 1.000.000.000', 'Rp 10.488.082', 'Rp 7.782.693', 'Rp 6.462.237'],
      ],
    },
    chainedCalculators: [
      {
        title: 'Kalkulator KPR Bank BRI (Griya BRI)',
        slug: 'kpr-bank-bri',
        category: 'kredit-pembiayaan',
        description: 'Bandingkan promo BNI Griya dengan suku bunga KPR Bank BRI.',
      },
      {
        title: 'Kalkulator KPR Bank Mandiri Promo 2026',
        slug: 'kpr-bank-mandiri',
        category: 'kredit-pembiayaan',
        description: 'Simulasi Mandiri Super Promo KPR bunga spesial fixed 1-10 tahun.',
      },
      {
        title: 'Kalkulator KPR Bank BTN (Subsidi FLPP)',
        slug: 'kpr-bank-btn',
        category: 'kredit-pembiayaan',
        description: 'Simulasi rumah subsidi bunga tetap 5% dan program KPR BTN.',
      },
    ],
  },
};
