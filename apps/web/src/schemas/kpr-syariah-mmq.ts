import { ExtendedCalculatorSchema } from './kpr-bank-bca';

export const kprSyariahMmqSchema: ExtendedCalculatorSchema = {
  id: 'kpr-syariah-mmq',
  slug: 'kpr-syariah-mmq',
  silo: 'properti',
  name: 'Kalkulator KPR Syariah (Akad Musyarakah Mutanaqisah MMQ 2026)',
  category: 'kredit-pembiayaan',
  engineFunction: 'calculate_kpr_general',
  inputs: [
    {
      id: 'propertyPrice',
      label: 'Harga Properti / Total Nilai Aset Bersama (Rupiah)',
      description: 'Total nilai rumah yang dibeli bersama antara nasabah dan bank syariah melalui kemitraan modal (syirkah).',
      type: 'currency',
      defaultValue: 750000000,
      validation: {
        min: 100000000,
        max: 20000000000,
        step: 10000000,
        required: true,
      },
    },
    {
      id: 'dpPercent',
      label: 'Porsi Modal Awal Nasabah / Uang Muka (%)',
      description: 'Porsi kepemilikan awal aset yang disetorkan nasabah (biasanya 10% - 20% dari total nilai aset).',
      type: 'percentage',
      defaultValue: 20.0,
      validation: {
        min: 0.0,
        max: 80.0,
        step: 5.0,
        required: true,
      },
      options: [
        { label: 'Porsi 10%', value: 10.0 },
        { label: 'Porsi 15%', value: 15.0 },
        { label: 'Porsi 20% (Standar MMQ)', value: 20.0 },
        { label: 'Porsi 30%', value: 30.0 },
      ],
    },
    {
      id: 'annualRate',
      label: 'Tarif Sewa Ekuivalen / Ujrah Bank (% / Tahun)',
      description: 'Tarif sewa (ijarah) atas pemanfaatan porsi aset milik bank yang menurun seiring waktu.',
      type: 'percentage',
      defaultValue: 6.75,
      validation: {
        min: 1.0,
        max: 20.0,
        step: 0.05,
        required: true,
      },
      options: [
        { label: '5.25% (Promo Kongsi Berkah Fixed 3 Thn)', value: 5.25 },
        { label: '6.75% (Standar KPR Hijrah MMQ)', value: 6.75 },
        { label: '7.99% (Nisbah Reguler Tenor Menengah)', value: 7.99 },
        { label: '9.25% (Nisbah Counter Rate)', value: 9.25 },
      ],
    },
    {
      id: 'tenorYears',
      label: 'Jangka Waktu Kemitraan (Tenor)',
      description: 'Masa pelunasan pembelian porsi kepemilikan bank hingga kepemilikan nasabah menjadi 100%.',
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
      label: 'Akad Kemitraan Syariah',
      description: 'Akad Musyarakah Mutanaqisah (MMQ) mengombinasikan kemitraan modal dan sewa bertahap.',
      type: 'select',
      defaultValue: 'annuity',
      validation: {
        required: true,
      },
      options: [
        { label: 'MMQ (Kemitraan Modal Berkurang & Sewa Ijarah)', value: 'annuity' },
      ],
    },
  ],
  outputs: [
    {
      id: 'firstMonthInstallment',
      label: 'Angsuran Bulanan (Sewa Ujrah + Beli Porsi Modal)',
      type: 'currency',
      highlight: true,
    },
    {
      id: 'totalInterestPaid',
      label: 'Total Imbalan Sewa (Ujrah) ke Bank',
      type: 'currency',
    },
    {
      id: 'totalUpfrontCost',
      label: 'Estimasi Biaya Awal (Porsi Modal Awal + Notaris/APHT)',
      type: 'currency',
    },
    {
      id: 'recommendedMinimumIncome',
      label: 'Syarat Penghasilan Bersih Minimal (DSR 30%)',
      type: 'currency',
    },
  ],
  seo: {
    title: 'Kalkulator KPR Syariah MMQ 2026: Simulasi Musyarakah Mutanaqisah',
    description:
      'Simulasi resmi KPR Syariah akad MMQ (Musyarakah Mutanaqisah) 2026. Hitung porsi modal kongsi, sewa ujrah, kepemilikan bertahap hingga 100%, sesuai Fatwa DSN-MUI.',
    h1: 'Kalkulator KPR Syariah: Simulasi Akad Musyarakah Mutanaqisah (MMQ) 2026',
    directAnswerSnippet:
      'Untuk pembiayaan KPR Syariah akad Musyarakah Mutanaqisah (MMQ) dengan nilai aset rumah Rp 750.000.000 dan porsi modal awal nasabah 20% (Porsi Modal Bank Rp 600.000.000), tarif sewa ekuivalen 6,75% per tahun dan tenor kemitraan 15 tahun (180 bulan), estimasi angsuran bulanan adalah Rp 5.309.457 per bulan (mencakup porsi sewa ujrah dan pembelian bertahap porsi modal bank). Di akhir masa pembiayaan, kepemilikan aset rumah beralih 100% menjadi hak milik penuh nasabah.',
    faq: [
      {
        question: 'Apa perbedaan utama akad MMQ (Musyarakah Mutanaqisah) dengan Murabahah?',
        answer:
          'Murabahah adalah akad jual beli dengan harga dan margin tetap sejak awal. Sedangkan MMQ adalah akad kemitraan berkurang (diminishing partnership), di mana nasabah dan bank bersama-sama membeli aset, lalu nasabah menyewa bagian milik bank sambil membeli porsi modal bank secara bertahap hingga rumah menjadi milik nasabah 100%.',
      },
      {
        question: 'Apa saja komponen pembayaran dalam cicilan bulanan KPR MMQ?',
        answer:
          'Setiap cicilan bulanan KPR MMQ terdiri dari dua bagian: (1) Ujrah (sewa) atas pemanfaatan porsi rumah yang masih dimiliki oleh bank, dan (2) Pembelian porsi kepemilikan (hishshah) yang secara otomatis mengurangi sisa modal bank dan meningkatkan porsi kepemilikan nasabah.',
      },
      {
        question: 'Apakah KPR MMQ sesuai dengan fatwa resmi DSN-MUI?',
        answer:
          'Ya, operasional akad Musyarakah Mutanaqisah diatur secara resmi dalam Fatwa DSN-MUI No. 73/DSN-MUI/XI/2008 dan Fatwa No. 161/DSN-MUI/VII/2025 tentang Syirkah Milk Mutanaqishah, yang memastikan transaksi bebas dari unsur riba, maysir, dan gharar.',
      },
      {
        question: 'Apakah nasabah bisa mempercepat pembelian porsi kepemilikan bank (pelunasan dipercepat)?',
        answer:
          'Bisa. Dalam akad MMQ, nasabah berhak membeli porsi modal bank lebih cepat dari jadwal semula tanpa dikenakan biaya denda bunga, karena pada hakikatnya nasabah sedang membeli aset riil milik mitra kongsinya.',
      },
    ],
    simulationTableData: {
      caption: 'Matriks Estimasi Angsuran KPR Syariah MMQ Tarif Sewa 6,75% per Tahun',
      columns: ['Modal Awal Bank', 'Tenor 5 Tahun (60 Bln)', 'Tenor 10 Tahun (120 Bln)', 'Tenor 15 Tahun (180 Bln)'],
      rows: [
        ['Rp 300.000.000', 'Rp 5.905.025', 'Rp 3.444.839', 'Rp 2.654.729'],
        ['Rp 500.000.000', 'Rp 9.841.708', 'Rp 5.741.398', 'Rp 4.424.548'],
        ['Rp 600.000.000', 'Rp 11.810.050', 'Rp 6.889.678', 'Rp 5.309.457'],
        ['Rp 800.000.000', 'Rp 15.746.733', 'Rp 9.186.237', 'Rp 7.079.276'],
        ['Rp 1.000.000.000', 'Rp 19.683.416', 'Rp 11.482.796', 'Rp 8.849.145'],
      ],
    },
    chainedCalculators: [
      {
        title: 'Kalkulator KPR Syariah (Akad Murabahah)',
        slug: 'kpr-syariah-murabahah',
        category: 'kredit-pembiayaan',
        description: 'Bandingkan skema kemitraan MMQ dengan jual beli margin tetap Murabahah.',
      },
      {
        title: 'Kalkulator Simulasi KPR Umum',
        slug: 'kpr-simulasi-umum',
        category: 'kredit-pembiayaan',
        description: 'Simulasi komparasi anuitas, efektif, dan flat konvensional.',
      },
      {
        title: 'Kalkulator KPR Bank Mandiri Promo 2026',
        slug: 'kpr-bank-mandiri',
        category: 'kredit-pembiayaan',
        description: 'Simulasi suku bunga promo bank konvensional terkemuka.',
      },
    ],
  },
};
