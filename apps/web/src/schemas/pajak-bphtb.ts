import { ExtendedCalculatorSchema } from './kpr-bank-bca';

export const pajakBphtbSchema: ExtendedCalculatorSchema = {
  id: 'pajak-bphtb',
  slug: 'pajak-bphtb',
  silo: 'properti',
  name: 'Kalkulator Pajak Pembeli Properti (BPHTB) 2026: UU HKPD',
  category: 'analisis-properti',
  engineFunction: 'calculate_bphtb',
  inputs: [
    {
      id: 'propertyPrice',
      label: 'Nilai Transaksi / NJOP Properti (NPOP)',
      description: 'Nilai perolehan properti berdasarkan nilai pasar transaksi riil atau NJOP PBB-P2 tertinggi.',
      type: 'currency',
      defaultValue: 600000000,
      validation: {
        min: 50000000,
        max: 20000000000,
        step: 10000000,
        required: true,
      },
    },
    {
      id: 'npoptkpAmount',
      label: 'Nilai Tidak Kena Pajak (NPOPTKP)',
      description: 'Batas pembebasan pajak perolehan hak pertama berdasarkan UU HKPD No. 1/2022 (Min Rp 80 Jt, Waris Rp 300 Jt).',
      type: 'currency',
      defaultValue: 80000000,
      validation: {
        min: 0,
        max: 1000000000,
        step: 10000000,
        required: true,
      },
    },
    {
      id: 'bphtbRate',
      label: 'Tarif BPHTB Daerah (%)',
      description: 'Tarif pajak pembeli berdasarkan Peraturan Daerah (Perda) setempat (Maksimal 5.00%).',
      type: 'percentage',
      defaultValue: 5.0,
      validation: {
        min: 0.5,
        max: 5.0,
        step: 0.1,
        required: true,
      },
    },
  ],
  outputs: [
    {
      id: 'bphtb_due',
      label: 'Estimasi Pajak Pembeli BPHTB Terutang',
      type: 'currency',
      highlight: true,
    },
    {
      id: 'property_value',
      label: 'Nilai Perolehan Objek Pajak (NPOP)',
      type: 'currency',
    },
    {
      id: 'npoptkp',
      label: 'Nilai Bebas Pajak (NPOPTKP)',
      type: 'currency',
    },
    {
      id: 'taxable_value',
      label: 'NPOP Kena Pajak (Dasar Pengenaan)',
      type: 'currency',
    },
    {
      id: 'tax_rate_percent',
      label: 'Tarif BPHTB Daerah Efektif',
      type: 'percentage',
    },
  ],
  seo: {
    title: 'Kalkulator Pajak Pembeli Properti (BPHTB) 2026: Rumus UU HKPD',
    description:
      'Hitung akurat pajak pembeli properti BPHTB 2026 sesuai UU HKPD No. 1 Tahun 2022. Rumus resmi tarif 5% dikali NPOP kena pajak, batas NPOPTKP Rp 80 juta & waris Rp 300 juta.',
    h1: 'Kalkulator Pajak Pembeli Properti (BPHTB) 2026',
    directAnswerSnippet:
      'Untuk pembelian rumah atau properti seharga Rp 600.000.000 dengan batas NPOPTKP standar nasional Rp 80.000.000, estimasi kewajiban Pajak Pembeli (BPHTB) tahun 2026 adalah sebesar Rp 26.000.000. Perhitungan ini mengacu pada ketentuan Undang-Undang Hubungan Keuangan antara Pemerintah Pusat dan Pemerintahan Daerah (UU HKPD) No. 1 Tahun 2022, di mana Nilai Perolehan Objek Pajak Kena Pajak (NPOP KP) adalah Rp 520.000.000 (Rp 600.000.000 dikurangi Rp 80.000.000) dan dikenakan tarif BPHTB daerah maksimal sebesar 5%. Pembayaran BPHTB wajib disetorkan dan divalidasi oleh Badan Pendapatan Daerah (Bapenda) sebelum penandatanganan Akta Jual Beli (AJB) di hadapan PPAT.',
    faq: [
      {
        question: 'Apa dasar hukum resmi pengenaan BPHTB dan berapa tarif maksimalnya di tahun 2026?',
        answer:
          'Dasar hukum pengenaan BPHTB adalah UU No. 1 Tahun 2022 tentang Hubungan Keuangan antara Pemerintah Pusat dan Pemerintahan Daerah (UU HKPD) Pasal 44 dan 45. Tarif BPHTB ditetapkan melalui Peraturan Daerah (Perda) kabupaten/kota setempat dengan batas maksimal sebesar 5%.',
      },
      {
        question: 'Berapa batas Nilai Perolehan Objek Pajak Tidak Kena Pajak (NPOPTKP) yang berlaku?',
        answer:
          'Berdasarkan Pasal 44 ayat (2) UU HKPD No. 1/2022, batas NPOPTKP ditetapkan paling rendah sebesar Rp 80.000.000 untuk setiap wajib pajak perolehan hak pertama. Khusus untuk perolehan hak karena waris atau hibah wasiat yang diterima orang pribadi dalam hubungan keluarga sedarah dalam garis lurus satu derajat ke atas atau ke bawah (termasuk suami/istri), NPOPTKP ditetapkan paling rendah sebesar Rp 300.000.000.',
      },
      {
        question: 'Dasar apa yang digunakan sebagai NPOP jika harga transaksi pada AJB berbeda dengan NJOP PBB?',
        answer:
          'Sesuai Pasal 44 ayat (1) UU HKPD, NPOP ditentukan berdasarkan nilai transaksi pasar riil. Namun jika nilai transaksi tidak diketahui atau lebih rendah daripada Nilai Jual Objek Pajak (NJOP) yang digunakan dalam pengenaan PBB-P2 pada tahun terjadinya perolehan, maka dasar pengenaan BPHTB adalah nilai NJOP tersebut.',
      },
      {
        question: 'Kapan waktu pembayaran dan validasi BPHTB wajib diselesaikan?',
        answer:
          'Kewajiban pembayaran BPHTB timbul sejak tanggal dibuat dan ditandatanganinya akta perolehan hak di hadapan PPAT. Berdasarkan ketentuan pertanahan dan perpajakan daerah, bukti pembayaran (SSPD-BPHTB) wajib divalidasi oleh Bapenda sebelum PPAT menandatangani AJB dan mendaftarkannya ke kantor BPN.',
      },
    ],
    simulationTableData: {
      caption: 'Matriks Simulasi BPHTB Rumah Berdasarkan Nilai Transaksi (Tarif 5% & NPOPTKP Rp 80 Jt) 2026',
      columns: ['Nilai Properti (NPOP)', 'NPOPTKP', 'NPOP Kena Pajak', 'Tarif BPHTB', 'Estimasi BPHTB Terutang'],
      rows: [
        ['Rp 350.000.000', 'Rp 80.000.000', 'Rp 270.000.000', '5.00%', 'Rp 13.500.000'],
        ['Rp 500.000.000', 'Rp 80.000.000', 'Rp 420.000.000', '5.00%', 'Rp 21.000.000'],
        ['Rp 600.000.000', 'Rp 80.000.000', 'Rp 520.000.000', '5.00%', 'Rp 26.000.000'],
        ['Rp 750.000.000', 'Rp 80.000.000', 'Rp 670.000.000', '5.00%', 'Rp 33.500.000'],
        ['Rp 1.000.000.000', 'Rp 80.000.000', 'Rp 920.000.000', '5.00%', 'Rp 46.000.000'],
        ['Rp 1.500.000.000', 'Rp 80.000.000', 'Rp 1.420.000.000', '5.00%', 'Rp 71.000.000'],
      ],
    },
    chainedCalculators: [
      {
        title: 'Kalkulator Biaya Balik Nama (BBN) Sertifikat Properti 2026',
        slug: 'biaya-balik-nama-sertifikat',
        category: 'analisis-properti',
        description: 'Hitung rincian biaya resmi PNBP BPN dan honorarium PPAT untuk peralihan hak tanah/rumah.',
      },
      {
        title: 'Kalkulator Simulasi KPR Umum',
        slug: 'kpr-simulasi-umum',
        category: 'kredit-pembiayaan',
        description: 'Hitung rincian cicilan dan estimasi total biaya legalitas notaris pengajuan KPR.',
      },
      {
        title: 'Kalkulator KPR Bank Mandiri Promo 2026',
        slug: 'kpr-bank-mandiri',
        category: 'kredit-pembiayaan',
        description: 'Simulasi pembiayaan rumah dengan suku bunga berjenjang Bank Mandiri.',
      },
    ],
  },
};
