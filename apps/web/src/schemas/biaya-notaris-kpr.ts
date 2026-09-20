import { ExtendedCalculatorSchema } from './kpr-bank-bca';

export const biayaNotarisKprSchema: ExtendedCalculatorSchema = {
  id: 'biaya-notaris-kpr',
  slug: 'biaya-notaris-kpr',
  silo: 'properti',
  name: 'Kalkulator Biaya Notaris & PPAT Akad KPR 2026: AJB, APHT, PK, PNBP',
  category: 'analisis-properti',
  engineFunction: 'calculate_kpr_notary_fee',
  inputs: [
    {
      id: 'propertyPrice',
      label: 'Harga Rumah / Nilai Transaksi (Rupiah)',
      description: 'Nilai transaksi properti pada Akta Jual Beli (AJB) sebagai dasar pengenaan honorarium PPAT.',
      type: 'currency',
      defaultValue: 750000000,
      validation: {
        min: 50000000,
        max: 20000000000,
        step: 10000000,
        required: true,
      },
    },
    {
      id: 'dpPercent',
      label: 'Uang Muka / Down Payment (%)',
      description: 'Persentase uang muka untuk menentukan nilai plafon kredit KPR yang dibebankan APHT.',
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
      id: 'total_notary_fee',
      label: 'Estimasi Total Biaya Notaris & PPAT KPR',
      type: 'currency',
      highlight: true,
    },
    {
      id: 'ajb_fee',
      label: 'Honorarium Akta Jual Beli (AJB PPAT)',
      type: 'currency',
    },
    {
      id: 'apht_fee',
      label: 'Akta Pemberian Hak Tanggungan (APHT PPAT)',
      type: 'currency',
    },
    {
      id: 'bpn_ht_pnbp_fee',
      label: 'Tarif PNBP Hak Tanggungan BPN (PP 128/2015)',
      type: 'currency',
    },
    {
      id: 'credit_agreement_fee',
      label: 'Akta Perjanjian Kredit (PK Notaris)',
      type: 'currency',
    },
    {
      id: 'certificate_check_fee',
      label: 'Pengecekan Sertifikat BPN',
      type: 'currency',
    },
    {
      id: 'admin_validation_fee',
      label: 'Validasi & Administrasi Berkas',
      type: 'currency',
    },
  ],
  seo: {
    title: 'Kalkulator Biaya Notaris KPR 2026: Rincian Lengkap AJB, APHT, PK, BPN',
    description:
      'Hitung akurat estimasi rincian biaya notaris dan PPAT akad kredit KPR 2026. Meliputi Akta Jual Beli (AJB Permen 33/2021), APHT, PK notariil, dan tarif resmi PNBP BPN PP 128/2015.',
    h1: 'Kalkulator Biaya Notaris & PPAT Akad KPR 2026',
    directAnswerSnippet:
      'Untuk pengajuan KPR rumah seharga Rp 750.000.000 dengan uang muka 20% (plafon kredit Rp 600.000.000), estimasi total biaya legalitas notaris dan PPAT akad kredit KPR tahun 2026 adalah sebesar Rp 10.925.000. Rincian paket legalitas ini mencakup honorarium Akta Jual Beli (AJB) PPAT sebesar Rp 5.625.000 (tarif 0,75% sesuai Permen ATR/BPN No. 33/2021), Akta Pemberian Hak Tanggungan (APHT) sebesar Rp 3.000.000 (0,50% dari plafon kredit), tarif PNBP pendaftaran Hak Tanggungan di kantor BPN sebesar Rp 200.000 (sesuai Lampiran PP No. 128/2015 untuk tier kredit Rp 250 juta s.d. Rp 1 miliar), Akta Perjanjian Kredit notariil sebesar Rp 1.500.000, pengecekan keaslian sertifikat BPN sebesar Rp 100.000, serta biaya administrasi dan validasi berkas notaris sekitar Rp 500.000.',
    faq: [
      {
        question: 'Apa perbedaan peran antara Notaris dan PPAT dalam akad kredit KPR?',
        answer:
          'Notaris berwenang membuat akta autentik perjanjian kredit (Akta PK / Pengakuan Hutang) antara debitur dan bank. Sedangkan PPAT (Pejabat Pembuat Akta Tanah) berwenang membuat akta peralihan hak tanah (Akta Jual Beli / AJB) serta akta pembebanan jaminan hak tanggungan (APHT/SKMHT) untuk didaftarkan ke kantor BPN. Biasanya kedua profesi ini dirangkap oleh satu pejabat rekanan bank.',
      },
      {
        question: 'Mengapa biaya notaris KPR lebih tinggi dibandingkan biaya transaksi tunai?',
        answer:
          'Pada transaksi KPR terdapat komponen pembebanan jaminan hutang bank berupa pembuatan Akta Pemberian Hak Tanggungan (APHT), PNBP pendaftaran Hak Tanggungan ke BPN, dan pembuatan akta otentik Perjanjian Kredit (PK) notariil. Komponen-komponen ini tidak ada pada transaksi jual beli tunai biasa yang hanya membutuhkan AJB dan balik nama.',
      },
      {
        question: 'Bagaimana dasar penentuan tarif PNBP Hak Tanggungan di BPN?',
        answer:
          'Berdasarkan Lampiran PP No. 128 Tahun 2015 tentang Jenis dan Tarif PNBP Kementerian ATR/BPN, tarif pendaftaran Hak Tanggungan berjenjang berdasarkan plafon pinjaman: s.d. Rp 250 juta sebesar Rp 50.000; di atas Rp 250 juta s.d. Rp 1 miliar sebesar Rp 200.000; di atas Rp 1 miliar s.d. Rp 10 miliar sebesar Rp 2.500.000; dan di atas Rp 10 miliar sebesar Rp 25.000.000.',
      },
      {
        question: 'Kapan seluruh biaya notaris KPR ini wajib dibayarkan?',
        answer:
          'Total biaya notaris dan PPAT wajib dilunasi oleh debitur pembeli sebelum atau pada saat penandatanganan akad kredit di hadapan notaris rekanan bank, biasanya didebet langsung dari rekening penampungan biaya pra-realisasi KPR.',
      },
    ],
    simulationTableData: {
      caption: 'Matriks Estimasi Biaya Notaris & PPAT Akad KPR Berdasarkan Plafon Kredit 2026',
      columns: ['Harga Properti', 'Plafon KPR (DP 20%)', 'AJB PPAT', 'APHT & BPN', 'Total Biaya Notaris KPR'],
      rows: [
        ['Rp 300.000.000', 'Rp 240.000.000', 'Rp 3.000.000', 'Rp 1.250.000', 'Rp 5.450.000'],
        ['Rp 500.000.000', 'Rp 400.000.000', 'Rp 5.000.000', 'Rp 2.200.000', 'Rp 8.800.000'],
        ['Rp 750.000.000', 'Rp 600.000.000', 'Rp 5.625.000', 'Rp 3.200.000', 'Rp 10.925.000'],
        ['Rp 1.000.000.000', 'Rp 800.000.000', 'Rp 7.500.000', 'Rp 4.200.000', 'Rp 14.300.000'],
        ['Rp 1.500.000.000', 'Rp 1.200.000.000', 'Rp 7.500.000', 'Rp 8.500.000', 'Rp 19.600.000'],
        ['Rp 2.500.000.000', 'Rp 2.000.000.000', 'Rp 12.500.000', 'Rp 12.500.000', 'Rp 30.600.000'],
      ],
    },
    chainedCalculators: [
      {
        title: 'Kalkulator Simulasi KPR Umum',
        slug: 'kpr-simulasi-umum',
        category: 'kredit-pembiayaan',
        description: 'Hitung rincian cicilan dan estimasi total biaya legalitas notaris pengajuan KPR.',
      },
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
    ],
  },
};
