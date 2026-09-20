# Zeltra Finance — Roadmap 150 Kalkulator Finansial

Dokumen ini memuat daftar 150 kalkulator finansial yang dikelompokkan ke dalam 10 kategori utama, lengkap dengan pelacak status implementasi (*Implementation Tracker*).

> Untuk arsitektur teknis sistem, engine komputasi, dan rincian 10 Fitur Utama, lihat dokumen [ARCHITECTURE.md](file:///workspaces/Zeltra-Finance/ARCHITECTURE.md).

---

## Status Progres Eksekusi
- **Total Kalkulator**: 150
- **Telah Selesai**: 6 / 150 (4.00%)
- **Dalam Pengerjaan**: 1 (Kalkulator KPR CIMB Niaga)

---

## Kategori 1: Properti & Rumah (KPR) — [Tools 1 - 20]
> **Ceruk paling besar.** Menggunakan *Core Engine Amortisasi Pinjaman* (Anuitas, Efektif, Flat).

- [x] 1. **Kalkulator Simulasi KPR Umum**: Hitung cicilan rumah bulanan standar (Anuitas, Efektif, Flat). *(Selesai: [/properti/kpr-simulasi-umum/](file:///workspaces/Zeltra-Finance/apps/web/src/schemas/kpr-simulasi-umum.ts))*
- [x] 2. **Kalkulator KPR Bank BCA**: Custom suku bunga fixed & floating mengikuti promo terbaru BCA. *(Selesai: [/properti/kpr-bank-bca/](file:///workspaces/Zeltra-Finance/apps/web/src/schemas/kpr-bank-bca.ts))*
- [x] 3. **Kalkulator KPR Bank Mandiri**: Simulasi cicilan khusus produk Mandiri KPR (Super Promo 2026). *(Selesai: [/properti/kpr-bank-mandiri/](file:///workspaces/Zeltra-Finance/apps/web/src/schemas/kpr-bank-mandiri.ts))*
- [x] 4. **Kalkulator KPR Bank BTN**: Fokus pada cicilan rumah subsidi FLPP 5% dan Platinum komersial. *(Selesai: [/properti/kpr-bank-btn/](file:///workspaces/Zeltra-Finance/apps/web/src/schemas/kpr-bank-btn.ts))*
- [x] 5. **Kalkulator KPR Bank BRI**: Simulasi pinjaman Griya BRI bunga promo 2026. *(Selesai: [/properti/kpr-bank-bri/](file:///workspaces/Zeltra-Finance/apps/web/src/schemas/kpr-bank-bri.ts))*
- [x] 6. **Kalkulator KPR Bank BNI**: Simulasi pinjaman BNI Griya bunga promo 2026. *(Selesai: [/properti/kpr-bank-bni/](file:///workspaces/Zeltra-Finance/apps/web/src/schemas/kpr-bank-bni.ts))*

- [ ] 7. **Kalkulator KPR CIMB Niaga**: Simulasi KPR Xtra.

- [ ] 8. **Kalkulator KPR Syariah (Murabahah)**: Menggunakan prinsip margin keuntungan tetap, bukan bunga mengambang.
- [ ] 9. **Kalkulator KPR Syariah (MMQ)**: Simulasi skema kepemilikan bertahap (Musyarakah Mutanaqisah).
- [ ] 10. **Kalkulator Biaya Balik Nama (BBN)**: Estimasi biaya legalitas sertifikat properti.
- [ ] 11. **Kalkulator Pajak Pembeli (BPHTB)**: Hitung otomatis tarif 5% setelah dikurangi NPOPTKP daerah.
- [ ] 12. **Kalkulator Pajak Penjual (PPh Properti)**: Hitung potongan 2.5% dari nilai pengalihan hak tanah/bangunan.
- [ ] 13. **Kalkulator Biaya Notaris KPR**: Estimasi biaya APHT, AJB, dan SKMHT.
- [ ] 14. **Kalkulator Kemampuan Beli Rumah**: Input gaji bulanan, sistem memberi tahu harga maksimal rumah yang bisa dicicil.
- [ ] 15. **Kalkulator Sewa vs Beli Rumah**: Analisis finansial jangka panjang apakah lebih untung sewa atau langsung ambil KPR.
- [ ] 16. **Kalkulator Pelunasan KPR Dipercepat**: Hitung pinalti bank vs penghematan bunga jika bayar pokok ekstra.
- [ ] 17. **Kalkulator KPR Take Over**: Simulasi pindah KPR antar bank untuk dapet bunga lebih rendah.
- [ ] 18. **Kalkulator Biaya Bangun Rumah per Meter**: Estimasi total dana proyek konstruksi mandiri.
- [ ] 19. **Kalkulator Asuransi Jiwa & Kebakaran KPR**: Estimasi komponen biaya wajib KPR.
- [ ] 20. **Kalkulator Renovasi Rumah berkala**: Simulasi tabungan untuk perbaikan rumah di masa depan.

---

## Kategori 2: Otomotif & Kendaraan (KKB) — [Tools 21 - 35]
> **Traffic tinggi musiman** (saat pameran otomotif GIIAS/IIMS atau akhir tahun).

- [ ] 21. **Kalkulator Kredit Mobil Baru**: Simulasi cicilan mobil dengan sistem bunga flat.
- [ ] 22. **Kalkulator Kredit Mobil Bekas**: Memasukkan variabel suku bunga yang biasanya lebih tinggi untuk mobil bekas.
- [ ] 23. **Kalkulator Kredit Motor Baru**: Hitung angsuran bulanan motor matic/sport.
- [ ] 24. **Kalkulator Simpanan DP (Down Payment) Kendaraan**: Target menabung untuk mencapai DP minimal 20-30%.
- [ ] 25. **Kalkulator Tukar Tambah (Trade-In)**: Hitung sisa utang mobil lama dipotong nilai jual untuk sisa DP mobil baru.
- [ ] 26. **Kalkulator Biaya Pajak Tahunan Mobil (STNK)**: Estimasi PKB berdasarkan bobot dan nilai jual kendaraan.
- [ ] 27. **Kalkulator Biaya Pajak Tahunan Motor**: Perhitungan PKB lokal untuk motor.
- [ ] 28. **Kalkulator Denda Keterlambatan Pajak STNK**: Hitung denda sanksi administrasi per bulan telat bayar.
- [ ] 29. **Kalkulator Asuransi All Risk vs TLO**: Membandingkan premi tahunan proteksi kendaraan.
- [ ] 30. **Kalkulator Depresiasi Nilai Mobil**: Menghitung penurunan harga aset kendaraan dari tahun ke tahun.
- [ ] 31. **Kalkulator Simulasi Kredit Pegadaian Amanah**: Skema pembiayaan kendaraan syariah.
- [ ] 32. **Kalkulator Biaya Balik Nama Kendaraan Bermotor (BBNKB)**: Estimasi biaya beli kendaraan seken antar daerah.
- [ ] 33. **Kalkulator Konversi Konsumsi BBM**: Menghitung biaya bensin bulanan berdasarkan jarak tempuh harian.
- [ ] 34. **Kalkulator Biaya Operasional Kendaraan (TCO)**: Total biaya bensin + servis + pajak bulanan.
- [ ] 35. **Simulasi Cicilan Mobil Opsi Baloon Payment**: Skema cicilan murah di awal, besar di akhir.

---

## Kategori 3: Gaji, HRD, & Pajak Pribadi — [Tools 36 - 55]
> **Traffic rutin** setiap akhir bulan (gajian) dan awal tahun (lapor SPT).

- [ ] 36. **Kalkulator PPh 21 Metode TER (Tarif Efektif Rata-rata) Terbaru**: Wajib up-to-date dengan aturan Ditjen Pajak PP 58/2023.
- [ ] 37. **Kalkulator Take Home Pay (Gaji Bersih)**: Gaji kotor dipotong BPJS dan Pajak.
- [ ] 38. **Kalkulator Gaji Pokok Pro-rata**: Hitung gaji proporsional jika karyawan masuk di pertengahan bulan.
- [ ] 39. **Kalkulator Uang Lembur (Overtime)**: Sesuai rumus Depnaker (1.5x jam pertama, 2x jam berikutnya).
- [ ] 40. **Kalkulator Iuran BPJS Kesehatan**: Pembagian jatah 4% perusahaan dan 1% karyawan.
- [ ] 41. **Kalkulator BPJS Ketenagakerjaan (JHT, JP, JKK, JKM)**: Hitung potongan jaminan hari tua & pensiun.
- [ ] 42. **Kalkulator Simulasi Pencairan JHT BPJS**: Estimasi dana yang didapat jika saldo JHT dicairkan 10%, 30%, atau 100%.
- [ ] 43. **Kalkulator Uang Pesangon PHK**: Hitung kompensasi berdasarkan masa kerja sesuai UU Cipta Kerja terbaru.
- [ ] 44. **Kalkulator THR (Tunjangan Hari Raya) Pro-rata**: Hitung bonus tahunan untuk karyawan baru di bawah 1 tahun.
- [ ] 45. **Kalkulator Pajak Freelancer (Norma NPPN)**: Hitung PPh 21 menggunakan potongan norma 50%.
- [ ] 46. **Kalkulator PPh 21 Gross vs Gross Up vs Net**: Membandingkan metode tunjangan pajak dari kantor.
- [ ] 47. **Kalkulator PPh Pasal 29 (Kurang Bayar SPT)**: Untuk menghitung kekurangan bayar pajak tahunan.
- [ ] 48. **Kalkulator Gaji Karyawan Harian/Lepas**: Perhitungan upah harian tidak kena pajak up to Rp450rb/hari.
- [ ] 49. **Kalkulator Anggaran Gaji untuk HRD (Cost to Company)**: Total biaya yang dikeluarkan perusahaan untuk 1 karyawan.
- [ ] 50. **Kalkulator Kenaikan Gaji Berkala**: Menghitung dampak persentase kenaikan gaji terhadap daya beli.
- [ ] 51. **Kalkulator Bonus Tahunan Bersih**: Hitung bonus bersih setelah dipotong pajak progresif.
- [ ] 52. **Kalkulator Pajak Progresif Kepemilikan Kendaraan**: Hitung tarif pajak jika punya lebih dari 1 mobil/motor.
- [ ] 53. **Kalkulator Penghasilan Tidak Kena Pajak (PTKP)**: Cek status TK/0, K/0, K/1, K/2, K/3 secara dinamis.
- [ ] 54. **Kalkulator Konversi Gaji per Jam / per Hari**: Mengubah gaji bulanan menjadi tarif hourly.
- [ ] 55. **Kalkulator Pajak Hadiah / Undian**: Hitung potongan pajak final atas hadiah (biasanya 25%).

---

## Kategori 4: UMKM, Toko Online, & Bisnis — [Tools 56 - 75]
> **Sangat dicari para online seller** Shopee, Tokopedia, TikTok Shop agar tidak jualan boncos.

- [ ] 56. **Kalkulator Potongan Admin Shopee Seller**: Update tarif admin Star, Star+, dan Shopee Mall.
- [ ] 57. **Kalkulator Potongan Admin Tokopedia**: Hitung potongan Power Merchant dan pro-fitur lainnya.
- [ ] 58. **Kalkulator Potongan Admin TikTok Shop (Tokopedia)**: Hitung admin fee komisi kategori produk.
- [ ] 59. **Kalkulator Margin Keuntungan**: Mencari margin profit dari harga beli dan harga jual.
- [ ] 60. **Kalkulator Markup Harga**: Menghitung harga jual berdasarkan persentase kenaikan dari HPP.
- [ ] 61. **Kalkulator Penentuan Harga Jual (Target Profit)**: Balikan rumus: input HPP dan biaya admin, keluar harga jual rekomendasi.
- [ ] 62. **Kalkulator Break Even Point (BEP)**: Hitung kapan modal bisnis kembali berdasarkan biaya tetap & variabel.
- [ ] 63. **Kalkulator Pajak Final UMKM (0.5%)**: Hitung omzet bulanan dikali tarif PPh final PP 55.
- [ ] 64. **Kalkulator HPP (Harga Pokok Penjualan) Manufaktur**: Menghitung bahan baku + tenaga kerja + overhead.
- [ ] 65. **Kalkulator Diskon Toko Berantai**: Simulasi diskon coret e-commerce (Misal: Diskon 30% + Voucher 10k).
- [ ] 66. **Kalkulator Arus Kas (Cash Flow) Sederhana**: Catatan pemasukan dan pengeluaran kas operasional.
- [ ] 67. **Kalkulator Rasio Keuangan - Current Ratio**: Mengukur kemampuan bayar utang jangka pendek bisnis.
- [ ] 68. **Kalkulator Rasio Keuangan - Debt to Equity (DER)**: Mengukur rasio utang modal usaha.
- [ ] 69. **Kalkulator ROI (Return on Investment) Bisnis**: Mengukur efektivitas modal yang ditanam di suatu project.
- [ ] 70. **Kalkulator Penyusutan Aset Metode Garis Lurus**: Depresiasi inventaris kantor/mesin produksi.
- [ ] 71. **Kalkulator Penyusutan Saldo Menurun**: Metode depresiasi dipercepat untuk kebutuhan akuntansi.
- [ ] 72. **Kalkulator Inventory Turnover**: Hitung perputaran stok barang dagangan dalam setahun.
- [ ] 73. **Kalkulator Konversi Ongkir vs Subsidi**: Membantu seller menentukan kelayakan fitur bebas ongkir.
- [ ] 74. **Kalkulator Biaya Akuisisi Pelanggan (CAC)**: Total biaya marketing dibagi jumlah pembeli baru.
- [ ] 75. **Kalkulator Customer Lifetime Value (LTV)**: Menghitung nilai keuntungan jangka panjang dari satu pelanggan setia.

---

## Kategori 5: Investasi & Perencanaan Masa Depan — [Tools 76 - 95]
> Menggunakan *Core Engine Compound Interest* (Bunga Berbunga) + Future Value.

- [ ] 76. **Kalkulator Compound Interest (Bunga Berbunga) Utama**: Visualisasi pertumbuhan uang jangka panjang.
- [ ] 77. **Kalkulator Reksa Dana Pasar Uang (RDPU)**: Simulasi investasi dengan return stabil ~4-5% per tahun.
- [ ] 78. **Kalkulator Reksa Dana Saham**: Simulasi investasi agresif dengan return fluktuatif jangka panjang.
- [ ] 79. **Kalkulator Saham DCA (Dollar Cost Averaging)**: Menghitung rata-rata harga saham jika dicicil konstan tiap bulan.
- [ ] 80. **Kalkulator Simulasi Investasi Emas**: Estimasi keuntungan emas batangan (Antam/Pegadaian) berdasarkan spread beli-buyback.
- [ ] 81. **Kalkulator Keuntungan Obligasi / SBN (Ori, Sukuk)**: Hitung kupon bulanan bersih setelah dipotong pajak 10%.
- [ ] 82. **Kalkulator Target Investasi Bulanan**: Input nominal target (misal Rp1 Miliar dalam 10 tahun), keluar angka tabungan per bulan.
- [ ] 83. **Kalkulator Masa Depan Tanpa Investasi vs Dengan Investasi**: Perbandingan efek uang jika cuma ditaruh di tabungan biasa.
- [ ] 84. **Kalkulator Dividen Yield Saham**: Hitung pasif income dari persentase dividen emiten saham.
- [ ] 85. **Kalkulator CAGR (Compound Annual Growth Rate)**: Menghitung rata-rata pertumbuhan tahunan portofolio investasi aktual.
- [ ] 86. **Kalkulator Inflasi Rupiah Historis**: Cek penurunan daya beli nilai uang dari tahun-tahun lalu ke tahun sekarang.
- [ ] 87. **Kalkulator Nilai Masa Depan Uang (Future Value)**: Dampak inflasi terhadap nilai riil tabungan lo 20 tahun lagi.
- [ ] 88. **Kalkulator Capital Gain Saham/Properti**: Hitung persentase keuntungan dari selisih harga jual dan beli.
- [ ] 89. **Kalkulator Investasi Peer-to-Peer (P2P) Lending**: Simulasi pendanaan dengan return persentase yield tahunan.
- [ ] 90. **Kalkulator Alokasi Aset Berdasarkan Umur**: Rumus otomatis (110 - Umur) untuk menentukan porsi instrumen agresif vs konservatif.
- [ ] 91. **Kalkulator Portofolio Rebalancing**: Menghitung sisa dana yang harus dipindah agar porsi instrumen investasi kembali ideal.
- [ ] 92. **Kalkulator Investasi Deposito Bank Digital**: Hitung bunga harian/bulanan bank digital setelah potong pajak bunga 20%.
- [ ] 93. **Kalkulator Simulasi Trading (Risk to Reward Ratio)**: Hitung posisi Stop Loss dan Take Profit berdasarkan modal.
- [ ] 94. **Kalkulator Break-Even Fee Transaksi Saham**: Menghitung minimal kenaikan harga saham agar tertutup biaya beli & jual sekuritas.
- [ ] 95. **Kalkulator Biaya Management Fee (AUM) Reksa Dana**: Dampak expense ratio terhadap hasil akhir investasi.

---

## Kategori 6: Pensiun Mandiri & Gerakan FIRE — [Tools 96 - 110]
> **Sangat digemari oleh generasi milenial dan Gen-Z urban** yang ogah kerja sampai tua.

- [ ] 96. **Kalkulator Angka FIRE (Financial Independence, Retire Early)**: Menghitung total dana wajib kumpul agar bisa pensiun dini.
- [ ] 97. **Kalkulator "The 4% Rule" (Aturan Penarikan 4%)**: Menghitung berapa uang aman yang bisa ditarik tiap tahun tanpa menghabiskan pokok tabungan.
- [ ] 98. **Kalkulator Coast FIRE**: Menghitung titik di mana tabungan investasi lo saat ini sudah cukup dibiarkan berkembang sendiri sampai hari tua tanpa perlu ditambah lagi.
- [ ] 99. **Kalkulator Lean FIRE**: Simulasi pensiun dini dengan gaya hidup minimalis (budget hemat).
- [ ] 100. **Kalkulator Fat FIRE**: Simulasi pensiun dini dengan gaya hidup mewah/sangat nyaman.
- [ ] 101. **Kalkulator Dana Pensiun BPJS TK (Jaminan Pensiun)**: Estimasi uang bulanan yang diterima saat usia 57 tahun.
- [ ] 102. **Kalkulator Usia Harapan Hidup vs Sisa Uang**: Analisis mitigasi risiko kehabisan uang di hari tua.
- [ ] 103. **Kalkulator Barista FIRE**: Simulasi pensiun dari pekerjaan utama, tapi tetap kerja part-time santai untuk nutup biaya harian.
- [ ] 104. **Kalkulator Simulasi Tabungan DPLK (Dana Pensiun Lembaga Keuangan)**: Investasi pensiun mandiri lewat bank.
- [ ] 105. **Kalkulator Pengeluaran Masa Pensiun**: Konversi pengeluaran bulanan sekarang ke nilai masa depan memperhitungkan inflasi.
- [ ] 106. **Kalkulator Pensiun Berdasarkan Umur Mulai**: Membandingkan hasil jika mulai nabung pensiun di usia 20 vs 30 vs 40 tahun.
- [ ] 107. **Kalkulator Dana Kesehatan Masa Pensiun**: Estimasi pos dana darurat medis khusus lansia.
- [ ] 108. **Kalkulator Kecepatan Nabung Pensiun (Savings Rate)**: Input persentase gaji yang ditabung, langsung keluar estimasi berapa tahun lagi lo bisa pensiun.
- [ ] 109. **Kalkulator Pengaruh Berhenti Merokok/Ngopi terhadap Dana Pensiun**: Mengonversi pengeluaran adiktif harian menjadi investasi masa depan.
- [ ] 110. **Kalkulator Dana Pensiun Pasutri**: Perencanaan FIRE gabungan pendapatan suami & istri.

---

## Kategori 7: Finansial Keluarga, Anak, & Edukasi — [Tools 111 - 125]
> **Target pasarnya adalah orang tua muda (Parenting Niche)** yang sensitif dengan inflasi pendidikan.

- [ ] 111. **Kalkulator Dana Pendidikan Anak (SD)**: Hitung biaya masuk sekolah dasar dengan inflasi pendidikan (~10% per tahun).
- [ ] 112. **Kalkulator Dana Pendidikan Anak (SMP)**: Target tabungan biaya uang pangkal & SPP SMP.
- [ ] 113. **Kalkulator Dana Pendidikan Anak (SMA)**: Biaya persiapan masuk SMA favorit.
- [ ] 114. **Kalkulator Dana Kuliah / Universitas**: Simulasi pembiayaan UKT dan uang gedung kuliah anak di masa depan.
- [ ] 115. **Kalkulator Dana Pernikahan / Lamaran**: Hitung rincian biaya gedung, catering, make up, undangan, dan mas kawin.
- [ ] 116. **Kalkulator Anggaran Bulanan Rumah Tangga (Sistem 50/30/20)**: Alokasi otomatis untuk Kebutuhan (50%), Keinginan (30%), Tabungan (20%).
- [ ] 117. **Kalkulator Anggaran Rumah Tangga (Sistem Amplop)**: Membagi pos pendapatan ke amplop virtual.
- [ ] 118. **Kalkulator Dana Kelahiran Bayi**: Estimasi biaya dokter, persalinan RS (Sesar/Normal), dan perlengkapan bayi baru lahir.
- [ ] 119. **Kalkulator Kebutuhan Uang Pertanggungan (UP) Asuransi Jiwa**: Rumus Income Replacement untuk pelindung nafkah keluarga jika pencari nafkah meninggal dunia.
- [ ] 120. **Kalkulator Dana Liburan Keluarga**: Target menabung untuk trip lokal maupun luar negeri.
- [ ] 121. **Kalkulator Simulasi Pembagian Harta Waris (Faraid) Dasar**: Estimasi pembagian harta sesuai hukum syariah Islam di Indonesia.
- [ ] 122. **Kalkulator Dana Darurat Keluarga Sejahtera**: Menghitung batas aman dana darurat (6x hingga 12x pengeluaran bulanan).
- [ ] 123. **Kalkulator Biaya Kepemilikan Anak (Cost of Raising a Child)**: Estimasi pengeluaran susu, popok, dan imunisasi bulanan.
- [ ] 124. **Kalkulator Dana Mudik Lebaran**: Simulasi biaya bensin, tol, tiket pesawat, dan amplop THR keluarga di kampung.
- [ ] 125. **Kalkulator Anggaran Belanja Dapur Bulanan**: Optimasi alokasi dana konsumsi rumah tangga.

---

## Kategori 8: Utilitas Harian, Konsumsi, & Belanja — [Tools 126 - 135]
> **Utilitas kasual sehari-hari** yang tinggi search volume harian singkat.

- [ ] 126. **Kalkulator Diskon Ganda (Promo Ramadhan/Harbolnas)**: Contoh hitung diskon "50% + Extra Diskon 20%".
- [ ] 127. **Kalkulator Split Bill (Bagi Tagihan Restoran)**: Hitung patungan makan bareng teman lengkap dengan proporsi pajak & service charge.
- [ ] 128. **Kalkulator Perbandingan Harga per Satuan unit (Unit Price Comparison)**: Misal membandingkan susu 400g seharga Rp50rb vs susu 900g seharga Rp110rb untuk tahu mana yang lebih ekonomis.
- [ ] 129. **Kalkulator Nilai Konversi Kurs Mata Uang (Sederhana)**: Kalkulator konversi mata uang asing populer (USD, SGD, JPY, MYR) ke Rupiah.
- [ ] 130. **Kalkulator Tip Restoran**: Menghitung persentase uang tip layak untuk pelayan/driver ojol.
- [ ] 131. **Kalkulator Target Nabung Beli Gadget (iPhone/Laptop)**: Hitung berapa hari/bulan harus menyisihkan uang jajan demi beli gadget baru tanpa ngutang.
- [ ] 132. **Kalkulator Langganan Bulanan (Subscription Tracker & Totalizer)**: Gabungkan biaya Netflix + Spotify + Youtube Premium + iCloud untuk tahu bocor alus bulanan lo.
- [ ] 133. **Kalkulator Cashback vs Diskon Langsung**: Menganalisis mana yang lebih untung antara promo potongan harga langsung atau cashback koin.
- [ ] 134. **Kalkulator Skema Arisan Bulanan**: Hitung urutan kocokan dan nominal uang yang didapat per putaran arisan.
- [ ] 135. **Kalkulator Sisa Uang Jajan Mahasiswa/Anak Kos**: Manajemen saku harian agar tidak kelaparan di akhir bulan.

---

## Kategori 9: Manajemen Utang & Triage Finansial — [Tools 136 - 145]
> **Penting untuk manajemen krisis** dan edukasi pelunasan utang.

- [ ] 136. **Kalkulator Bunga Pinjaman Online (Pinjol)**: Simulasi perhitungan bunga harian legal OJK (maks 0.1% per hari) vs Pinjol Ilegal.
- [ ] 137. **Kalkulator Strategi Pelunasan Utang - Debt Snowball**: Mengurutkan utang dari nominal terkecil untuk diselesaikan satu per satu demi momentum psikologis.
- [ ] 138. **Kalkulator Strategi Pelunasan Utang - Debt Avalanche**: Mengurutkan utang dari bunga terbesar untuk menghemat biaya bunga secara matematis.
- [ ] 139. **Kalkulator Rasio Utang Terhadap Pendapatan (DSR - Debt Service Ratio)**: Cek apakah cicilan lo saat ini sudah melewati batas aman (maks 30% dari gaji).
- [ ] 140. **Kalkulator Simulasi Minimum Payment Kartu Kredit**: Edukasi efek bahaya membayar tagihan CC hanya minimum payment (10%) yang bikin bunga menumpuk bergulung.
- [ ] 141. **Kalkulator Bunga Efektif vs Bunga Flat**: Konversi dari sistem bunga flat (kelihatan kecil) ke bunga efektif (bunga bank asli asli) biar user tidak tertipu visual.
- [ ] 142. **Kalkulator Konsolidasi Utang**: Simulasi menyatukan banyak utang kecil berbiaya tinggi ke dalam satu pinjaman bunga rendah.
- [ ] 143. **Kalkulator Konversi Bunga Tahunan (APR) ke Bulanan/Harian**: Breakdown detail transparansi biaya pinjaman.
- [ ] 144. **Kalkulator Denda Keterlambatan Cicilan**: Perhitungan denda akumulatif per hari telat bayar kredit leasing/bank.
- [ ] 145. **Kalkulator Cash Advance (Tarik Tunai Kartu Kredit)**: Estimasi biaya admin penarikan tunai awal + bunga berjalan.

---

## Kategori 10: Keuangan Religi & Sosial Indonesia — [Tools 146 - 150]
> **Ceruk pasar lokal Indonesia** yang sangat spesifik dan masif menjelang hari raya.

- [ ] 146. **Kalkulator Zakat Penghasilan (Profesi)**: Hitung otomatis kewajiban 2.5% jika total pendapatan setahun menyentuh nisab (setara 85 gram emas).
- [ ] 147. **Kalkulator Zakat Maal (Harta Kekayaan)**: Hitung zakat atas simpanan emas, tabungan, atau saham yang sudah mengendap 1 tahun (haul).
- [ ] 148. **Kalkulator Zakat Fitrah**: Konversi kewajiban beras (2.5 kg / 3.5 liter) ke nilai nominal rupiah mengikuti update harga beras pasar saat ini.
- [ ] 149. **Kalkulator Perencanaan Dana Kurban**: Simulasi menabung bulanan untuk beli sapi/kambing menjelang Hari Raya Idul Adha.
- [ ] 150. **Kalkulator Estimasi Keberangkatan Haji (Dana & Waktu)**: Perencanaan keuangan setoran awal pendaftaran porsi haji reguler/plus.