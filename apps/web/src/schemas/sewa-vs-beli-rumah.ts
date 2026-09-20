import { ExtendedCalculatorSchema } from './kpr-bank-bca';

export const sewaVsBeliRumahSchema: ExtendedCalculatorSchema = {
  id: 'sewa-vs-beli-rumah',
  slug: 'sewa-vs-beli-rumah',
  silo: 'properti',
  name: 'Kalkulator Sewa vs Beli Rumah 2026: Analisis Komparatif Biaya Peluang & Ekuitas',
  category: 'analisis-properti',
  engineFunction: 'calculate_rent_vs_buy',
  inputs: [
    {
      id: 'propertyPrice',
      label: 'Harga Pembelian Rumah / Properti (Rupiah)',
      description: 'Harga beli rumah incaran pada pasar properti saat ini.',
      type: 'currency',
      defaultValue: 800000000,
      validation: {
        min: 100000000,
        max: 10000000000,
        step: 25000000,
        required: true,
      },
    },
    {
      id: 'dpPercent',
      label: 'Porsi Uang Muka / Down Payment Beli (%)',
      description: 'Persentase uang muka tunai yang dialokasikan jika membeli rumah.',
      type: 'percentage',
      defaultValue: 20,
      validation: {
        min: 0,
        max: 50,
        step: 5,
        required: true,
      },
    },
    {
      id: 'initialRent',
      label: 'Biaya Sewa Rumah Setara per Bulan (Rupiah)',
      description: 'Harga sewa rumah atau apartemen dengan spesifikasi serupa di lokasi yang sama.',
      type: 'currency',
      defaultValue: 2500000,
      validation: {
        min: 500000,
        max: 50000000,
        step: 250000,
        required: true,
      },
    },
    {
      id: 'analysisPeriodYears',
      label: 'Horizon Waktu Analisis (Tahun)',
      description: 'Lama rencana tinggal atau jangka waktu simulasi komparasi finansial.',
      type: 'number',
      defaultValue: 10,
      validation: {
        min: 1,
        max: 30,
        step: 1,
        required: true,
      },
    },
    {
      id: 'annualRate',
      label: 'Suku Bunga KPR (% p.a.)',
      description: 'Estimasi rata-rata suku bunga tahunan pinjaman KPR.',
      type: 'percentage',
      defaultValue: 7.0,
      validation: {
        min: 3.0,
        max: 15.0,
        step: 0.1,
        required: true,
      },
    },
    {
      id: 'investmentReturn',
      label: 'Asumsi Return Investasi Selisih (% p.a.)',
      description: 'Imbal hasil tahunan jika uang DP dan selisih arus kas diinvestasikan (SBN, Reksa Dana, Saham).',
      type: 'percentage',
      defaultValue: 7.0,
      validation: {
        min: 2.0,
        max: 18.0,
        step: 0.5,
        required: true,
      },
    },
  ],
  outputs: [
    {
      id: 'recommendation',
      label: 'Rekomendasi Keputusan Finansial',
      type: 'badge',
      highlight: true,
    },
    {
      id: 'net_difference',
      label: 'Selisih Keuntungan Kekayaan Bersih',
      type: 'currency',
      highlight: true,
    },
    {
      id: 'buy_net_wealth',
      label: 'Kekayaan Bersih Opsi Beli Rumah',
      type: 'currency',
    },
    {
      id: 'rent_total_net_wealth',
      label: 'Kekayaan Bersih Opsi Sewa + Investasi',
      type: 'currency',
    },
    {
      id: 'buy_property_future_value',
      label: 'Proyeksi Nilai Rumah di Masa Depan',
      type: 'currency',
    },
    {
      id: 'monthly_kpr_installment',
      label: 'Cicilan Bulanan KPR',
      type: 'currency',
    },
  ],
  seo: {
    title: 'Kalkulator Sewa vs Beli Rumah 2026: Cek Mana Lebih Untung Finansial & Titik Impas',
    description:
      'Simulasi komprehensif apakah lebih menguntungkan sewa rumah sambil investasi modal atau langsung beli rumah KPR. Hitung titik impas (break-even) dan proyeksi kekayaan bersih 2026.',
    h1: 'Kalkulator Sewa vs Beli Rumah & Titik Impas Finansial 2026',
    directAnswerSnippet:
      'Untuk rumah seharga Rp 800.000.000 dengan uang muka 20% (plafon KPR Rp 640.000.000, bunga 7,00% p.a., tenor 15 tahun) dibandingkan opsi menyewa rumah setara Rp 2.500.000 per bulan pada tahun 2026: Dalam jangka pendek (1 sampai 4 tahun), menyewa rumah secara finansial lebih menguntungkan karena debitur terhindar dari beban biaya legalitas awal (BPHTB dan notaris ~Rp 40 juta) serta porsi bunga bank yang sangat besar di awal masa kredit. Namun, titik impas (break-even point) tercapai pada tahun ke-6 atau ke-7. Pada horizon 10 tahun, membeli rumah menjadi lebih menguntungkan dengan keunggulan kekayaan bersih sekitar Rp 100 juta hingga Rp 150 juta karena adanya apresiasi nilai properti (asumsi 5% per tahun) dan pelunasan pokok utang yang menjadi ekuitas kepemilikan aset riil, asalkan penyewa tidak disiplin menginvestasikan uang DP ke instrumen dengan imbal hasil di atas 7% per tahun.',
    faq: [
      {
        question: 'Kapan menyewa rumah lebih menguntungkan dibandingkan membeli KPR?',
        answer:
          'Menyewa rumah lebih menguntungkan jika Anda berencana tinggal kurang dari 5 tahun di suatu wilayah (mobilitas kerja tinggi), belum memiliki tabungan dana darurat yang memadai di luar uang muka, atau jika Anda memiliki keahlian berinvestasi yang mampu menghasilkan imbal hasil konsisten di atas 8-10% per tahun dari modal DP dan selisih arus kas bulanan.',
      },
      {
        question: 'Apa saja biaya tersembunyi yang sering dilupakan saat membeli rumah?',
        answer:
          'Banyak pembeli hanya menyiapkan uang muka (DP), padahal terdapat biaya awal legalitas dan bank sekitar 5% hingga 8% (Pajak BPHTB 5%, notaris AJB & APHT, provisi dan administrasi bank, asuransi jiwa & kebakaran). Selain itu, terdapat biaya kepemilikan rutin seperti PBB tahunan, iuran IPL keamanan/sampah, dan biaya perawatan renovasi bangunan (rata-rata 0,5% s.d. 1% dari nilai properti per tahun).',
      },
      {
        question: 'Bagaimana konsep opportunity cost bekerja pada opsi sewa rumah?',
        answer:
          'Jika Anda memilih menyewa, Anda tidak membayar uang muka ratusan juta rupiah kepada developer. Uang muka tersebut menjadi modal produktif yang dapat diinvestasikan ke instrumen finansial seperti SBN (Surat Berharga Negara), Reksa Dana, atau Indeks Saham. Ditambah lagi, jika biaya sewa lebih rendah dari cicilan KPR, selisih uang bulanan tersebut terus diinvestasikan dengan prinsip bunga berbunga (compound interest).',
      },
      {
        question: 'Apakah harga sewa rumah akan selalu naik setiap tahun?',
        answer:
          'Ya, di kota-kota besar Indonesia, harga sewa properti residensial umumnya mengalami penyesuaian naik sekitar 3% hingga 5% per tahun mengikuti laju inflasi dan perkembangan fasilitas infrastruktur kawasan sekitar, sedangkan cicilan pokok KPR konvensional biasanya relatif tetap selama masa suku bunga fixed.',
      },
      {
        question: 'Berapa rata-rata titik impas (break-even point) sewa vs beli di Indonesia?',
        answer:
          'Di pasar properti Indonesia, titik impas rata-rata berada pada rentang 5 hingga 7 tahun. Sebelum tahun ke-5, biaya akuisisi awal membuat opsi sewa tampak lebih murah. Setelah melewati tahun ke-7, akumulasi ekuitas rumah dan kenaikan harga tanah membuat kepemilikan properti mengungguli akumulasi portofolio sewa.',
      },
    ],
    simulationTableData: {
      caption: 'Matriks Perbandingan Kekayaan Bersih Sewa vs Beli Rumah (Harga Rp 800 Jt, DP 20%, Sewa Rp 2.5 Jt/bln, Inflasi Sewa 4%, Apresiasi Rumah 5%, Return Investasi 7%)',
      columns: [
        'Horizon Waktu',
        'Nilai Aset Rumah',
        'Kekayaan Opsi Beli (Aset - Sisa KPR)',
        'Kekayaan Opsi Sewa + Investasi',
        'Pilihan Lebih Unggul',
      ],
      rows: [
        ['3 Tahun', 'Rp 926.100.000', 'Rp 347.810.210', 'Rp 412.350.180', 'Sewa Lebih Untung'],
        ['5 Tahun', 'Rp 1.021.025.000', 'Rp 528.410.600', 'Rp 562.190.450', 'Sewa Lebih Untung'],
        ['7 Tahun (Titik Impas)', 'Rp 1.125.680.000', 'Rp 735.920.100', 'Rp 728.450.200', 'Beli Mulai Unggul'],
        ['10 Tahun', 'Rp 1.303.115.701', 'Rp 1.012.701.780', 'Rp 885.340.500', 'Beli Lebih Untung'],
        ['15 Tahun (Lunas KPR)', 'Rp 1.663.140.000', 'Rp 1.663.140.000', 'Rp 1.210.850.000', 'Beli Lebih Untung (Signifikan)'],
        ['20 Tahun', 'Rp 2.122.640.000', 'Rp 2.122.640.000', 'Rp 1.490.200.000', 'Beli Lebih Untung (Aset Bebas Utang)'],
      ],
    },
    chainedCalculators: [
      {
        title: 'Kalkulator Kemampuan Beli Rumah 2026',
        slug: 'kemampuan-beli-rumah',
        category: 'analisis-properti',
        description: 'Hitung batas maksimal harga rumah yang mampu dicicil berdasarkan penghasilan dan rasio DSR 30%.',
      },
      {
        title: 'Kalkulator KPR Simulasi Umum 2026',
        slug: 'kpr-simulasi-umum',
        category: 'kredit-pembiayaan',
        description: 'Simulasi lengkap amortisasi cicilan anuitas, efektif, flat, dan rincian biaya awal KPR.',
      },
      {
        title: 'Kalkulator Pajak Pembeli (BPHTB) 2026',
        slug: 'pajak-bphtb',
        category: 'analisis-properti',
        description: 'Hitung kewajiban pajak perolehan hak tanah dan bangunan setelah dikurangi NPOPTKP.',
      },
      {
        title: 'Kalkulator Biaya Notaris & PPAT KPR 2026',
        slug: 'biaya-notaris-kpr',
        category: 'analisis-properti',
        description: 'Estimasi rincian honorarium AJB, APHT, perjanjian kredit, dan PNBP pendaftaran hak tanggungan BPN.',
      },
    ],
  },
};
