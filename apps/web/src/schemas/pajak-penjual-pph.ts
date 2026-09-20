import { ExtendedCalculatorSchema } from './kpr-bank-bca';

export const pajakPenjualPphSchema: ExtendedCalculatorSchema = {
  id: 'pajak-penjual-pph',
  slug: 'pajak-penjual-pph',
  silo: 'properti',
  name: 'Kalkulator Pajak Penjual Properti (PPh Final) 2026: PP 34/2016',
  category: 'analisis-properti',
  engineFunction: 'calculate_property_seller_tax',
  inputs: [
    {
      id: 'propertyPrice',
      label: 'Nilai Bruto Pengalihan / NJOP (Rupiah)',
      description: 'Nilai perolehan bruto yang sesungguhnya diterima penjual berdasarkan AJB atau NJOP PBB-P2 tertinggi.',
      type: 'currency',
      defaultValue: 800000000,
      validation: {
        min: 50000000,
        max: 20000000000,
        step: 10000000,
        required: true,
      },
    },
    {
      id: 'sellerTaxRate',
      label: 'Tarif PPh Final Pengalihan (%)',
      description: 'Tarif PPh Final berdasarkan PP No. 34 Tahun 2016 (Umum 2,5%, Subsidi 1,0%, Bebas 0%).',
      type: 'percentage',
      defaultValue: 2.5,
      validation: {
        min: 0.0,
        max: 5.0,
        step: 0.1,
        required: true,
      },
    },
  ],
  outputs: [
    {
      id: 'pph_final_amount',
      label: 'Potongan PPh Final Terutang',
      type: 'currency',
      highlight: true,
    },
    {
      id: 'gross_value',
      label: 'Nilai Bruto Pengalihan',
      type: 'currency',
    },
    {
      id: 'tax_rate_percent',
      label: 'Tarif PPh Final Efektif',
      type: 'percentage',
    },
    {
      id: 'net_proceeds',
      label: 'Estimasi Dana Bersih Diterima Penjual',
      type: 'currency',
    },
  ],
  seo: {
    title: 'Kalkulator Pajak Penjual Properti (PPh Final) 2026: PP No. 34/2016',
    description:
      'Hitung akurat pajak penjual properti PPh Final 2,5% pengalihan tanah dan bangunan 2026 resmi. Berdasarkan PP No. 34/2016 jo. UU PPh Pasal 4 ayat (2) dan validasi e-PHTB DJP.',
    h1: 'Kalkulator Pajak Penjual Properti (PPh Final) 2026',
    directAnswerSnippet:
      'Untuk transaksi penjualan properti atau rumah dengan nilai bruto Rp 800.000.000, kewajiban Pajak Penjual (PPh Final Pengalihan Hak atas Tanah dan Bangunan) tahun 2026 adalah sebesar Rp 20.000.000 (tarif 2,5%), sehingga estimasi dana bersih yang diterima penjual adalah Rp 780.000.000. Perhitungan ini mengacu pada Peraturan Pemerintah (PP) No. 34 Tahun 2016, di mana tarif PPh Final pengalihan properti reguler ditetapkan sebesar 2,5% dari jumlah bruto nilai pengalihan. Penyetoran pajak menggunakan Surat Setoran Pajak (SSP) dan wajib divalidasi melalui aplikasi e-PHTB Direktorat Jenderal Pajak (DJP) sebelum Akta Jual Beli (AJB) ditandatangani di hadapan PPAT.',
    faq: [
      {
        question: 'Berapa tarif resmi PPh final penjual tanah dan bangunan sesuai PP No. 34 Tahun 2016?',
        answer:
          'Sesuai Pasal 2 PP No. 34 Tahun 2016, tarif PPh final pengalihan hak atas tanah dan/atau bangunan adalah: (a) 2,5% untuk pengalihan properti umum non-subsidi, (b) 1,0% untuk pengalihan Rumah Sederhana dan Rusun Sederhana oleh wajib pajak pengembang, dan (c) 0% untuk pengalihan kepada pemerintah guna kepentingan umum.',
      },
      {
        question: 'Siapa yang menanggung kewajiban PPh Pengalihan Hak Properti?',
        answer:
          'Sesuai ketentuan perundang-undangan perpajakan Republik Indonesia, PPh Pengalihan Hak atas Tanah dan Bangunan merupakan beban penjual (pihak yang mengalihkan hak dan memperoleh penghasilan). Berbeda dengan BPHTB yang merupakan kewajiban pembeli (pihak yang memperoleh hak).',
      },
      {
        question: 'Apa itu validasi e-PHTB dan mengapa wajib dilakukan?',
        answer:
          'e-PHTB adalah layanan daring resmi Direktorat Jenderal Pajak untuk memvalidasi Surat Setoran Pajak (SSP) PPh pengalihan tanah/bangunan. Berdasarkan regulasi Ditjen Pajak dan Kementerian ATR/BPN, PPAT dilarang menandatangani Akta Jual Beli (AJB) sebelum terbit Surat Keterangan Penelitian Formal Bukti Pemenuhan Kewajiban Penyetoran PPh yang sah dari sistem e-PHTB.',
      },
      {
        question: 'Kapan penjualan tanah atau rumah dibebaskan dari pengenaan PPh final?',
        answer:
          'Pembebasan PPh final diberikan kepada orang pribadi yang berpenghasilan di bawah Penghasilan Tidak Kena Pajak (PTKP) yang mengalihkan tanah/bangunan dengan nilai bruto di bawah Rp 60.000.000, atau perolehan hak melalui warisan maupun hibah kepada keluarga sedarah dalam garis lurus satu derajat dengan kepemilikan Surat Keterangan Bebas (SKB) PPh dari KPP Pratama.',
      },
    ],
    simulationTableData: {
      caption: 'Matriks Simulasi PPh Final Penjual Properti Berdasarkan Nilai Transaksi (Tarif 2,5%) 2026',
      columns: ['Nilai Transaksi Bruto', 'Tarif PPh Final', 'Potongan PPh Terutang', 'Estimasi Dana Bersih Penjual'],
      rows: [
        ['Rp 350.000.000', '2.50%', 'Rp 8.750.000', 'Rp 341.250.000'],
        ['Rp 500.000.000', '2.50%', 'Rp 12.500.000', 'Rp 487.500.000'],
        ['Rp 800.000.000', '2.50%', 'Rp 20.000.000', 'Rp 780.000.000'],
        ['Rp 1.000.000.000', '2.50%', 'Rp 25.000.000', 'Rp 975.000.000'],
        ['Rp 1.500.000.000', '2.50%', 'Rp 37.500.000', 'Rp 1.462.500.000'],
        ['Rp 2.500.000.000', '2.50%', 'Rp 62.500.000', 'Rp 2.437.500.000'],
      ],
    },
    chainedCalculators: [
      {
        title: 'Kalkulator Pajak Pembeli Properti (BPHTB) 2026',
        slug: 'pajak-bphtb',
        category: 'analisis-properti',
        description: 'Hitung kewajiban pajak pembeli 5% dikurangi NPOPTKP sesuai UU HKPD.',
      },
      {
        title: 'Kalkulator Biaya Balik Nama (BBN) Sertifikat Properti 2026',
        slug: 'biaya-balik-nama-sertifikat',
        category: 'analisis-properti',
        description: 'Hitung rincian biaya PNBP BPN dan batas maksimal honorarium PPAT.',
      },
      {
        title: 'Kalkulator Simulasi KPR Umum',
        slug: 'kpr-simulasi-umum',
        category: 'kredit-pembiayaan',
        description: 'Hitung simulasi angsuran KPR bulanan dan estimasi biaya legalitas notaris.',
      },
    ],
  },
};
