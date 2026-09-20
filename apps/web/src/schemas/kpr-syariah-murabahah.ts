import { ExtendedCalculatorSchema } from './kpr-bank-bca';

export const kprSyariahMurabahahSchema: ExtendedCalculatorSchema = {
  id: 'kpr-syariah-murabahah',
  slug: 'kpr-syariah-murabahah',
  silo: 'properti',
  name: 'Kalkulator KPR Syariah (Akad Murabahah Margin Tetap 2026)',
  category: 'kredit-pembiayaan',
  engineFunction: 'calculate_kpr_general',
  inputs: [
    {
      id: 'propertyPrice',
      label: 'Harga Properti / Rumah (Rupiah)',
      description: 'Harga beli rumah dari pengembang atau pemilik properti yang dibeli oleh bank syariah.',
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
      label: 'Uang Muka / Urbun (%)',
      description: 'Uang muka yang diserahkan nasabah sebagai bukti komitmen pembelian rumah.',
      type: 'percentage',
      defaultValue: 20.0,
      validation: {
        min: 0.0,
        max: 80.0,
        step: 5.0,
        required: true,
      },
      options: [
        { label: 'DP 10%', value: 10.0 },
        { label: 'DP 15%', value: 15.0 },
        { label: 'DP 20% (Standar Syariah)', value: 20.0 },
        { label: 'DP 30%', value: 30.0 },
      ],
    },
    {
      id: 'annualRate',
      label: 'Margin Keuntungan Bank (% / Tahun Flat)',
      description: 'Nisbah/margin keuntungan jual beli yang disepakati bank syariah (tetap dari bulan pertama hingga lunas).',
      type: 'percentage',
      defaultValue: 7.5,
      validation: {
        min: 1.0,
        max: 20.0,
        step: 0.1,
        required: true,
      },
      options: [
        { label: '6.50% (Promo BSI Griya Hasanah)', value: 6.5 },
        { label: '7.50% (Standar Margin Murabahah)', value: 7.5 },
        { label: '8.75% (Margin Reguler)', value: 8.75 },
        { label: '9.50% (Non-Payroll Syariah)', value: 9.5 },
      ],
    },
    {
      id: 'tenorYears',
      label: 'Jangka Waktu Pembiayaan (Tenor)',
      description: 'Masa angsuran pembiayaan jual beli rumah syariah (hingga 20 tahun / 240 bulan).',
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
        { label: '20 Thn (Maksimal)', value: 20 },
      ],
    },
    {
      id: 'calculationMethod',
      label: 'Akad Pembiayaan Syariah',
      description: 'Akad Murabahah menggunakan perhitungan margin keuntungan flat tetap (bebas bunga mengambang/riba).',
      type: 'select',
      defaultValue: 'flat',
      validation: {
        required: true,
      },
      options: [
        { label: 'Murabahah (Jual Beli Margin Flat Tetap)', value: 'flat' },
      ],
    },
  ],
  outputs: [
    {
      id: 'firstMonthInstallment',
      label: 'Angsuran Bulanan Tetap (Pasti Sampai Lunas)',
      type: 'currency',
      highlight: true,
    },
    {
      id: 'totalInterestPaid',
      label: 'Total Margin Keuntungan Bank Syariah',
      type: 'currency',
    },
    {
      id: 'totalUpfrontCost',
      label: 'Estimasi Biaya Akad Awal (DP + Notaris/AJB/APHT + Admin)',
      type: 'currency',
    },
    {
      id: 'recommendedMinimumIncome',
      label: 'Syarat Penghasilan Bersih Minimal (DSR 30%)',
      type: 'currency',
    },
  ],
  seo: {
    title: 'Kalkulator KPR Syariah 2026: Simulasi Akad Murabahah Cicilan Tetap',
    description:
      'Hitung simulasi KPR Syariah akad Murabahah resmi 2026. Hitung margin keuntungan jual beli, angsuran bulanan tetap tanpa bunga floating, bebas riba, dan sesuai fatwa DSN-MUI.',
    h1: 'Kalkulator KPR Syariah: Simulasi Pembiayaan Akad Murabahah 2026',
    directAnswerSnippet:
      'Untuk pembiayaan KPR Syariah akad Murabahah dengan harga properti Rp 500.000.000 dan uang muka (urbun) 20% (Plafon Pembiayaan Rp 400.000.000), margin keuntungan bank sebesar 7,50% per tahun flat dan jangka waktu 15 tahun (180 bulan), angsuran bulanan adalah tetap sebesar Rp 4.722.222 per bulan dari awal hingga lunas tanpa risiko kenaikan bunga mengambang (floating). Total harga jual bank adalah Rp 850.000.000 dengan syarat penghasilan bersih minimal sekitar Rp 15.740.740 per bulan.',
    faq: [
      {
        question: 'Bagaimana prinsip kerja KPR Syariah dengan akad Murabahah?',
        answer:
          'Sesuai Fatwa DSN-MUI No. 04/DSN-MUI/IV/2000, akad Murabahah adalah transaksi jual beli di mana bank syariah membeli rumah yang diinginkan nasabah dari developer/penjual, kemudian menjualnya kembali kepada nasabah dengan harga pokok ditambah margin keuntungan yang disepakati bersama di awal akad.',
      },
      {
        question: 'Apakah cicilan KPR Syariah Murabahah bisa naik di tengah jalan?',
        answer:
          'Tidak bisa. Dalam akad Murabahah, harga jual beli yang telah disepakati saat penandatanganan akad bersifat mengikat dan tetap sampai akhir masa pembiayaan. Tidak ada penyesuaian suku bunga mengambang (floating rate), sehingga nasabah terlindungi dari lonjakan cicilan.',
      },
      {
        question: 'Apakah ada denda keterlambatan dalam KPR Syariah?',
        answer:
          'Bank syariah tidak mengenakan bunga denda sebagai keuntungan bank. Apabila debitur terlambat membayar karena kelalaian, bank dapat mengenakan ta\'zir (denda administratif) yang dananya wajib disalurkan 100% untuk kegiatan kebajikan/sosial (dana qardhul hasan) sesuai ketentuan syariah.',
      },
      {
        question: 'Apakah nasabah mendapatkan diskon jika melunasi KPR Murabahah lebih cepat?',
        answer:
          'Sesuai Fatwa DSN-MUI No. 153/DSN-MUI/VI/2022, bank syariah diperbolehkan memberikan muqashah (potongan/diskon margin yang belum jatuh tempo) atas kebijakan sepihak bank kepada debitur yang melunasi pembiayaannya sebelum jatuh tempo.',
      },
    ],
    simulationTableData: {
      caption: 'Matriks Estimasi Angsuran KPR Syariah Murabahah Margin 7,50% Flat per Tahun',
      columns: ['Plafon Pembiayaan', 'Tenor 5 Tahun (60 Bln)', 'Tenor 10 Tahun (120 Bln)', 'Tenor 15 Tahun (180 Bln)'],
      rows: [
        ['Rp 200.000.000', 'Rp 4.583.333', 'Rp 2.916.667', 'Rp 2.361.111'],
        ['Rp 300.000.000', 'Rp 6.875.000', 'Rp 4.375.000', 'Rp 3.541.667'],
        ['Rp 400.000.000', 'Rp 9.166.667', 'Rp 5.833.333', 'Rp 4.722.222'],
        ['Rp 500.000.000', 'Rp 11.458.333', 'Rp 7.291.667', 'Rp 5.902.778'],
        ['Rp 750.000.000', 'Rp 17.187.500', 'Rp 10.937.500', 'Rp 8.854.167'],
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
        title: 'Kalkulator KPR CIMB Niaga (KPR Xtra)',
        slug: 'kpr-cimb-niaga',
        category: 'kredit-pembiayaan',
        description: 'Simulasi pembiayaan KPR konvensional & KPR Xtra Manfaat.',
      },
      {
        title: 'Kalkulator KPR Bank Mandiri Promo 2026',
        slug: 'kpr-bank-mandiri',
        category: 'kredit-pembiayaan',
        description: 'Simulasi Mandiri Super Promo KPR bunga spesial fixed 1-10 tahun.',
      },
    ],
  },
};
