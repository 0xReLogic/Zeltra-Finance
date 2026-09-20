import { ExtendedCalculatorSchema } from './kpr-bank-bca';

export const kprSimulasiUmumSchema: ExtendedCalculatorSchema = {
  id: 'kpr-simulasi-umum',
  slug: 'kpr-simulasi-umum',
  silo: 'properti',
  name: 'Kalkulator Simulasi KPR Umum (Anuitas, Efektif, Flat)',
  category: 'kredit-pembiayaan',
  engineFunction: 'calculate_kpr_general',
  inputs: [
    {
      id: 'propertyPrice',
      label: 'Harga Properti / Rumah (Rupiah)',
      description: 'Estimasi nilai jual beli properti atau nilai agunan rumah.',
      type: 'currency',
      defaultValue: 625000000,
      validation: {
        min: 50000000,
        max: 20000000000,
        step: 25000000,
        required: true,
      },
    },
    {
      id: 'dpPercent',
      label: 'Uang Muka / Down Payment (%)',
      description: 'Persentase DP sesuai kebijakan LTV Bank Indonesia 2026 (DP 0% - 30%).',
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
        { label: 'DP 10%', value: 10 },
        { label: 'DP 15%', value: 15 },
        { label: 'DP 20%', value: 20 },
        { label: 'DP 30%', value: 30 },
      ],
    },
    {
      id: 'annualRate',
      label: 'Suku Bunga Kredit (% / Tahun)',
      description: 'Tingkat suku bunga tahunan yang ditawarkan lembaga perbankan.',
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
    {
      id: 'calculationType',
      label: 'Metode Perhitungan Bunga',
      description: 'Pilih antara bunga Anuitas standar bank, Efektif menurun, atau Flat.',
      type: 'select',
      defaultValue: 'annuity',
      validation: {
        required: true,
      },
      options: [
        { label: 'Anuitas (Angsuran Tetap - Standar Bank)', value: 'annuity' },
        { label: 'Efektif (Angsuran Menurun / Sliding)', value: 'effective' },
        { label: 'Flat (Bunga Tetap dari Pokok Awal)', value: 'flat' },
      ],
    },
  ],
  outputs: [
    {
      id: 'firstMonthInstallment',
      label: 'Estimasi Angsuran per Bulan',
      type: 'currency',
      highlight: true,
    },
    {
      id: 'totalInterestPaid',
      label: 'Total Akumulasi Bunga',
      type: 'currency',
    },
    {
      id: 'totalUpfrontCost',
      label: 'Estimasi Biaya Akad Awal (DP + Biaya)',
      type: 'currency',
    },
    {
      id: 'recommendedMinimumIncome',
      label: 'Rekomendasi Gaji Bersih Minimum (DSR 30%)',
      type: 'currency',
    },
  ],
  seo: {
    title: 'Kalkulator Simulasi KPR 2026: Hitung Cicilan Anuitas, Efektif & Flat',
    description:
      'Simulasi KPR umum terlengkap 2026 sesuai regulasi Bank Indonesia dan OJK. Hitung angsuran bulanan anuitas, flat, efektif, estimasi biaya provisi 1%, dan batas aman DSR gaji.',
    h1: 'Kalkulator Simulasi KPR: Hitung Cicilan Rumah & Biaya Akad 2026',
    directAnswerSnippet:
      'Untuk properti seharga Rp 625.000.000 dengan uang muka 20% (Rp 125.000.000) dan plafon kredit Rp 500.000.000 pada bunga anuitas 7,00% per tahun tenor 15 tahun (180 bulan), angsuran bulanan adalah Rp 4.494.141 per bulan, total pengembalian Rp 808.945.508, estimasi biaya akad awal Rp 141.000.000, dan rekomendasi penghasilan bersih minimal Rp 14.980.470 per bulan.',
    faq: [
      {
        question: 'Apa perbedaan metode bunga anuitas, efektif, dan flat pada KPR?',
        answer:
          'Bunga Anuitas menetapkan cicilan bulanan tetap dengan porsi pokok membesar dan bunga mengecil (standar KPR bank). Bunga Efektif menghasilkan cicilan yang terus menurun setiap bulan karena bunga dihitung dari sisa utang pokok. Sedangkan Bunga Flat menghitung bunga tetap dari pokok pinjaman awal sepanjang tenor sehingga total beban bunga jauh lebih besar.',
      },
      {
        question: 'Berapa ketentuan minimal uang muka (DP) KPR Bank Indonesia 2026?',
        answer:
          'Bank Indonesia menerapkan pelonggaran rasio Loan to Value (LTV) hingga 100%, memungkinkan program DP 0% untuk rumah pertama bagi nasabah yang memenuhi kriteria kelayakan bank. Umumnya bank menetapkan DP 5% - 10% untuk rumah pertama, 10% - 15% untuk rumah kedua, dan minimal 20% untuk rumah ketiga.',
      },
      {
        question: 'Apa saja komponen biaya akad awal KPR di luar uang muka?',
        answer:
          'Biaya akad awal meliputi Biaya Provisi bank (standar 1,00% dari plafon), Biaya Administrasi (rata-rata Rp 500.000 - Rp 1.000.000), Biaya Notaris/APHT/AJB (1,5% - 2,5%), serta premi Asuransi Jiwa & Kebakaran.',
      },
      {
        question: 'Berapa batasan aman rasio cicilan KPR terhadap gaji (DSR)?',
        answer:
          'Berdasarkan anjuran OJK dan perbankan nasional, batas aman Debt Service Ratio (DSR) adalah maksimal 30% hingga 35% dari penghasilan bulanan bersih pemohon kredit.',
      },
    ],
    simulationTableData: {
      caption: 'Matriks Estimasi Angsuran KPR Anuitas Berdasarkan Plafon (Bunga 7,00% per Tahun)',
      columns: ['Plafon KPR Pokok', 'Tenor 10 Tahun (120 Bln)', 'Tenor 15 Tahun (180 Bln)', 'Tenor 20 Tahun (240 Bln)'],
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
        title: 'Kalkulator KPR Bank BCA Promo',
        slug: 'kpr-bank-bca',
        category: 'kredit-pembiayaan',
        description: 'Simulasi khusus promo suku bunga fixed berjenjang dan floating KPR BCA.',
      },
      {
        title: 'Kalkulator Biaya Notaris & BPHTB Beli Rumah',
        slug: 'biaya-notaris-bphtb-rumah',
        category: 'analisis-properti',
        description: 'Rincian akurat perhitungan pajak pembeli BPHTB dan biaya notaris APHT.',
      },
    ],
  },
};
