import { ExtendedCalculatorSchema } from './kpr-bank-bca';

export const kemampuanBeliRumahSchema: ExtendedCalculatorSchema = {
  id: 'kemampuan-beli-rumah',
  slug: 'kemampuan-beli-rumah',
  silo: 'properti',
  name: 'Kalkulator Kemampuan Beli Rumah 2026: Analisis Gaji, DSR 30%, & Plafon KPR',
  category: 'analisis-properti',
  engineFunction: 'calculate_home_affordability',
  inputs: [
    {
      id: 'monthlyIncome',
      label: 'Penghasilan Bersih Bulanan / Take-Home Pay (Rupiah)',
      description: 'Penghasilan bersih bulanan setelah pajak dan potongan iuran wajib, atau gabungan suami-istri jika joint income.',
      type: 'currency',
      defaultValue: 15000000,
      validation: {
        min: 3000000,
        max: 200000000,
        step: 500000,
        required: true,
      },
    },
    {
      id: 'otherDebts',
      label: 'Cicilan Utang Berjalan Lainnya (Rupiah)',
      description: 'Total beban angsuran bulanan yang masih aktif di SLIK OJK (KKB kendaraan, kartu kredit, KTA, pinjaman online).',
      type: 'currency',
      defaultValue: 0,
      validation: {
        min: 0,
        max: 50000000,
        step: 250000,
        required: true,
      },
    },
    {
      id: 'dsrPercent',
      label: 'Batas Rasio Beban Utang / DSR (%)',
      description: 'Ambang batas Debt Service Ratio sesuai profil risiko dan ketentuan analisis Pasal 8 UU Perbankan jo. POJK 42/2017.',
      type: 'percentage',
      defaultValue: 30,
      validation: {
        min: 20,
        max: 50,
        step: 5,
        required: true,
      },
    },
    {
      id: 'annualRate',
      label: 'Suku Bunga KPR Perkiraan (% p.a.)',
      description: 'Asumsi suku bunga tahunan KPR bank yang dituju selama masa kredit.',
      type: 'percentage',
      defaultValue: 7.0,
      validation: {
        min: 2.5,
        max: 18.0,
        step: 0.1,
        required: true,
      },
    },
    {
      id: 'tenorYears',
      label: 'Rencana Tenor Pinjaman (Tahun)',
      description: 'Jangka waktu fasilitas KPR dalam hitungan tahun (maksimal usia pensiun debitur).',
      type: 'number',
      defaultValue: 15,
      validation: {
        min: 1,
        max: 30,
        step: 1,
        required: true,
      },
    },
    {
      id: 'dpPercent',
      label: 'Porsi Uang Muka / Down Payment (%)',
      description: 'Persentase uang muka tunai yang telah disiapkan untuk membayar harga rumah.',
      type: 'percentage',
      defaultValue: 20,
      validation: {
        min: 0,
        max: 50,
        step: 5,
        required: true,
      },
    },
  ],
  outputs: [
    {
      id: 'max_property_price',
      label: 'Harga Rumah Maksimal yang Mampu Dibeli',
      type: 'currency',
      highlight: true,
    },
    {
      id: 'max_monthly_installment',
      label: 'Batas Cicilan KPR Maksimal per Bulan',
      type: 'currency',
      highlight: true,
    },
    {
      id: 'max_loan_principal',
      label: 'Plafon Pinjaman KPR Maksimal',
      type: 'currency',
    },
    {
      id: 'required_down_payment',
      label: 'Dana Uang Muka (DP) yang Harus Disiapkan',
      type: 'currency',
    },
    {
      id: 'other_debts',
      label: 'Cicilan Utang Berjalan Lainnya',
      type: 'currency',
    },
  ],
  seo: {
    title: 'Kalkulator Kemampuan Beli Rumah 2026: Cek Harga Maksimal & Plafon KPR dari Gaji',
    description:
      'Hitung akurat harga rumah maksimal yang mampu dicicil berdasarkan gaji bulanan, batasan DSR 30%-40% standar Bank Indonesia & OJK, dan beban utang berjalan 2026.',
    h1: 'Kalkulator Kemampuan Beli Rumah & Batas Cicilan KPR 2026',
    directAnswerSnippet:
      'Dengan penghasilan bersih bulanan Rp 15.000.000 tanpa beban utang berjalan lainnya dan asumsi batas aman Debt Service Ratio (DSR) 30% standar perbankan Indonesia tahun 2026, kuota cicilan KPR maksimal yang diizinkan adalah Rp 4.500.000 per bulan. Pada suku bunga KPR acuan 7,00% per tahun dan tenor 15 tahun (180 bulan) dengan rencana uang muka (DP) 20%, plafon kredit KPR maksimal yang dapat disetujui bank adalah Rp 500.651.809, sehingga harga rumah maksimal yang mampu dibeli adalah Rp 625.814.761 dengan kesiapan uang muka tunai sebesar Rp 125.162.952. Jika Anda memiliki cicilan utang lain (seperti KKB mobil atau kartu kredit), kuota cicilan KPR maksimal akan dikurangi langsung sebesar nominal cicilan berjalan tersebut sesuai mitigasi risiko Pasal 8 UU Perbankan.',
    faq: [
      {
        question: 'Berapa persen batas aman cicilan KPR dari gaji bulanan di bank Indonesia?',
        answer:
          'Standar perbankan umum di Indonesia (BCA, Mandiri, BRI, BNI) menetapkan rasio Debt Service Ratio (DSR) atau Debt Burden Ratio (DBR) ideal sebesar 30% hingga 35% dari gaji bersih (take-home pay). Untuk debitur berpenghasilan tinggi atau yang mengajukan fasilitas joint income suami-istri, bank dapat memberikan toleransi maksimal hingga 40%. Batasan ini ditujukan untuk menjaga sisa penghasilan agar kebutuhan pokok, biaya hidup keluarga, dan dana darurat tidak terganggu.',
      },
      {
        question: 'Bagaimana dampak cicilan berjalan (kartu kredit/motor/mobil) terhadap persetujuan KPR?',
        answer:
          'Sesuai analisis prinsip kehati-hatian perbankan (Pasal 8 UU Perbankan No. 10/1998 jo. POJK 42/2017), bank akan memeriksa seluruh riwayat kredit dan beban angsuran aktif melalui SLIK OJK (iDeb). Beban cicilan utang aktif tersebut akan mengurangi langsung kuota angsuran KPR yang diizinkan. Misalnya, jika kuota DSR Anda adalah Rp 4.500.000 dan Anda masih memiliki cicilan motor Rp 1.000.000, maka kuota cicilan KPR yang tersisa hanya Rp 3.500.000 per bulan, yang otomatis menurunkan plafon pinjaman maksimal.',
      },
      {
        question: 'Apa itu skema Joint Income dan bagaimana pengaruhnya ke batas plafon rumah?',
        answer:
          'Skema Joint Income adalah penggabungan penghasilan resmi suami dan istri yang bekerja untuk dihitung bersama dalam analisis kelayakan KPR. Dengan menggabungkan dua sumber pendapatan, total penghasilan bersih menjadi lebih besar sehingga kuota cicilan bulanan dan plafon pinjaman KPR yang disetujui bank bisa meningkat hingga hampir dua kali lipat, dengan syarat kedua belah pihak memiliki kolektibilitas lancar (Kolek 1) di SLIK OJK.',
      },
      {
        question: 'Apakah penghasilan tidak tetap atau bonus tahunan dihitung dalam batas kemampuan KPR?',
        answer:
          'Mayoritas analis kredit bank hanya memperhitungkan gaji pokok tetap dan tunjangan tetap bulanan yang tercantum pada slip gaji serta mutasi rekening koran 3-6 bulan terakhir. Bonus tahunan, insentif lembur tidak tetap, atau komisi biasanya tidak dimasukkan 100% (hanya diperhitungkan sekitar 50% atau bahkan diabaikan) karena bersifat fluktuatif dan berisiko terhadap kepastian pembayaran angsuran jangka panjang.',
      },
      {
        question: 'Biaya apa saja di luar harga rumah yang harus disiapkan selain uang muka (DP)?',
        answer:
          'Selain uang muka (DP), pembeli wajib menyiapkan dana tunai sekitar 5% hingga 10% dari harga rumah untuk membiayai legalitas dan pajak, antara lain: Pajak Pembeli (BPHTB 5%), biaya notaris & PPAT (pembuatan AJB, APHT, PK notariil), biaya administrasi dan provisi bank (1% dari plafon kredit), premi asuransi jiwa kredit, premi asuransi kebakaran, serta biaya balik nama sertifikat di kantor BPN.',
      },
    ],
    simulationTableData: {
      caption: 'Matriks Estimasi Kemampuan Beli Rumah Berdasarkan Gaji Bulanan (Tenor 15 Tahun, Bunga KPR 7.00% p.a., DP 20%)',
      columns: [
        'Gaji Bersih / Bulan',
        'Batas Rasio DSR',
        'Cicilan Utang Lain',
        'Batas Cicilan KPR',
        'Plafon Pinjaman KPR Maks',
        'Harga Rumah Maksimal',
      ],
      rows: [
        ['Rp 7.000.000', '30% (Aman)', 'Rp 0', 'Rp 2.100.000', 'Rp 233.637.511', 'Rp 292.046.889'],
        ['Rp 10.000.000', '30% (Aman)', 'Rp 0', 'Rp 3.000.000', 'Rp 333.767.873', 'Rp 417.209.841'],
        ['Rp 15.000.000', '30% (Aman)', 'Rp 0', 'Rp 4.500.000', 'Rp 500.651.809', 'Rp 625.814.761'],
        ['Rp 20.000.000', '35% (Moderat)', 'Rp 1.500.000', 'Rp 5.500.000', 'Rp 611.907.767', 'Rp 764.884.708'],
        ['Rp 25.000.000 (Joint)', '35% (Moderat)', 'Rp 2.500.000', 'Rp 6.250.000', 'Rp 695.349.735', 'Rp 869.187.169'],
        ['Rp 35.000.000 (Joint)', '40% (Maksimal)', 'Rp 3.000.000', 'Rp 11.000.000', 'Rp 1.223.815.534', 'Rp 1.529.769.418'],
      ],
    },
    chainedCalculators: [
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
      {
        title: 'Kalkulator KPR Bank Mandiri 2026',
        slug: 'kpr-bank-mandiri',
        category: 'kredit-pembiayaan',
        description: 'Simulasi promo suku bunga berjenjang Mandiri KPR dengan fixed rate menarik.',
      },
    ],
  },
};
