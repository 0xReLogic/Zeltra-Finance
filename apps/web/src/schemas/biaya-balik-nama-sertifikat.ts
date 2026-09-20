import { ExtendedCalculatorSchema } from './kpr-bank-bca';

export const biayaBalikNamaSertifikatSchema: ExtendedCalculatorSchema = {
  id: 'biaya-balik-nama-sertifikat',
  slug: 'biaya-balik-nama-sertifikat',
  silo: 'properti',
  name: 'Kalkulator Biaya Balik Nama (BBN) Sertifikat Rumah & Tanah 2026',
  category: 'analisis-properti',
  engineFunction: 'calculate_property_title_transfer',
  inputs: [
    {
      id: 'propertyPrice',
      label: 'Nilai Transaksi / NJOP Properti (Rupiah)',
      description: 'Nilai perolehan properti berdasarkan Akta Jual Beli (AJB) atau Nilai Jual Objek Pajak (NJOP) tertinggi.',
      type: 'currency',
      defaultValue: 750000000,
      validation: {
        min: 50000000,
        max: 20000000000,
        step: 10000000,
        required: true,
      },
    },
  ],
  outputs: [
    {
      id: 'total_title_transfer_cost',
      label: 'Estimasi Total Biaya Balik Nama (BBN)',
      type: 'currency',
      highlight: true,
    },
    {
      id: 'bpn_pnbp_fee',
      label: 'Tarif PNBP Balik Nama BPN (PP 128/2015)',
      type: 'currency',
    },
    {
      id: 'bpn_check_fee',
      label: 'Pengecekan Keaslian Sertifikat BPN',
      type: 'currency',
    },
    {
      id: 'ppat_fee',
      label: 'Honorarium Jasa PPAT (Permen ATR/BPN 33/2021)',
      type: 'currency',
    },
    {
      id: 'admin_validation_fee',
      label: 'Biaya Administrasi & Validasi Pajak',
      type: 'currency',
    },
  ],
  seo: {
    title: 'Kalkulator Biaya Balik Nama (BBN) Sertifikat Rumah 2026: PNBP BPN & PPAT',
    description:
      'Hitung akurat biaya balik nama (BBN) sertifikat tanah dan rumah 2026 resmi. Berdasarkan PP No. 128/2015 (tarif PNBP BPN) dan Permen ATR/BPN No. 33/2021.',
    h1: 'Kalkulator Biaya Balik Nama (BBN) Sertifikat Properti 2026',
    directAnswerSnippet:
      'Untuk transaksi properti atau rumah seharga Rp 750.000.000, estimasi total biaya balik nama (BBN) sertifikat di kantor BPN dan jasa PPAT tahun 2026 adalah sebesar Rp 6.925.000. Rincian biaya ini mencakup tarif resmi PNBP BPN sebesar Rp 750.000 (rumus nilai tanah dibagi 1.000 sesuai PP No. 128/2015), biaya pengecekan sertifikat BPN sebesar Rp 50.000, batas maksimal jasa honorarium PPAT sebesar Rp 5.625.000 (tarif maksimal 0,75% sesuai Permen ATR/BPN No. 33/2021), serta biaya validasi berkas administratif sekitar Rp 500.000.',
    faq: [
      {
        question: 'Bagaimana rumus resmi perhitungan biaya PNBP balik nama di BPN?',
        answer:
          'Berdasarkan Lampiran PP No. 128 Tahun 2015 tentang Jenis dan Tarif PNBP Kementerian ATR/BPN, rumus resmi biaya pendaftaran peralihan hak (balik nama) adalah: (Nilai Tanah / Objek Pajak / 1.000) + Rp 50.000 (biaya pengecekan keaslian sertifikat).',
      },
      {
        question: 'Berapa batas maksimal tarif jasa PPAT untuk pembuatan Akta Jual Beli (AJB) dan balik nama?',
        answer:
          'Sesuai Peraturan Menteri ATR/Kepala BPN No. 33 Tahun 2021, uang jasa PPAT dibatasi secara berjenjang: nilai transaksi s.d. Rp 500 juta maksimal 1,00%; Rp 500 juta s.d. Rp 1 miliar maksimal 0,75%; Rp 1 miliar s.d. Rp 2,5 miliar maksimal 0,50%; dan di atas Rp 2,5 miliar maksimal 0,25%.',
      },
      {
        question: 'Berapa lama proses balik nama sertifikat tanah di kantor BPN?',
        answer:
          'Waktu standar pelayanan balik nama sertifikat di Kantor Pertanahan (BPN) umumnya memakan waktu 5 hingga 14 hari kerja setelah seluruh berkas persyaratan dan bukti lunas validasi pajak (PPH Penjual dan BPHTB Pembeli) dinyatakan lengkap.',
      },
      {
        question: 'Bagaimana cara mengecek estimasi biaya dan status sertifikat secara mandiri?',
        answer:
          'Masyarakat dapat memanfaatkan aplikasi resmi Kementerian ATR/BPN yaitu Sentuh Tanahku untuk melakukan simulasi biaya layanan pertanahan, plot bidang tanah, serta memantau proses berkas pengurusan sertifikat secara transparan.',
      },
    ],
    simulationTableData: {
      caption: 'Matriks Estimasi Biaya Balik Nama Sertifikat Rumah Berdasarkan Nilai Transaksi 2026',
      columns: ['Nilai Properti', 'PNBP BPN (PP 128/2015)', 'Cek Sertifikat', 'Jasa PPAT (Permen 33/2021)', 'Estimasi Total Biaya BBN'],
      rows: [
        ['Rp 300.000.000', 'Rp 300.000', 'Rp 50.000', 'Rp 3.000.000 (1.00%)', 'Rp 3.850.000'],
        ['Rp 500.000.000', 'Rp 500.000', 'Rp 50.000', 'Rp 5.000.000 (1.00%)', 'Rp 6.050.000'],
        ['Rp 750.000.000', 'Rp 750.000', 'Rp 50.000', 'Rp 5.625.000 (0.75%)', 'Rp 6.925.000'],
        ['Rp 1.000.000.000', 'Rp 1.000.000', 'Rp 50.000', 'Rp 7.500.000 (0.75%)', 'Rp 9.050.000'],
        ['Rp 2.000.000.000', 'Rp 2.000.000', 'Rp 50.000', 'Rp 10.000.000 (0.50%)', 'Rp 12.550.000'],
      ],
    },
    chainedCalculators: [
      {
        title: 'Kalkulator Simulasi KPR Umum',
        slug: 'kpr-simulasi-umum',
        category: 'kredit-pembiayaan',
        description: 'Hitung rincian cicilan dan estimasi biaya legalitas notaris KPR.',
      },
      {
        title: 'Kalkulator KPR Bank BCA Promo 2026',
        slug: 'kpr-bank-bca',
        category: 'kredit-pembiayaan',
        description: 'Simulasi pembiayaan pembelian rumah dengan suku bunga promo BCA.',
      },
      {
        title: 'Kalkulator KPR Syariah (Akad Murabahah)',
        slug: 'kpr-syariah-murabahah',
        category: 'kredit-pembiayaan',
        description: 'Simulasi pembiayaan rumah syariah bebas bunga mengambang.',
      },
    ],
  },
};
