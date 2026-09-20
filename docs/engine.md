# Zeltra Finance — Computation Engine Specification (`engine.md`)

Dokumen ini merupakan cetak biru spesifikasi rekayasa perangkat lunak (*software engineering spec*) untuk mesin komputasi finansial Zeltra Finance. Spesifikasi ini disusun berdasarkan riset literatur komputasi finansial internasional terkini (FinTech calculation DSLs, incremental DAG engines, IEEE 754 precision mitigation, dan WebAssembly memory models).

---

## 1. Landasan Riset & Standar Industri (Academic Grounding)

Untuk memastikan sistem terhindar dari *technical debt* saat melayani 150 kalkulator, arsitektur engine mengadopsi 4 konsensus literatur komputer finansial:

1. **Domain-Specific Declarative Computation (DATEV & Credit Suisse Paradise Architecture)**:
   - *Riset*: Penelitian Voelter et al. (*A Domain-Specific Language for Payroll & Financial Calculations*) membuktikan bahwa hard-coding rumus ke fungsi imperatif memicu technical debt besar saat regulasi berubah.
   - *Penerapan*: 150 kalkulator tidak di-hardcode sebagai 150 fungsi terisolasi, melainkan diekspresikan sebagai **Declarative Calculation Nodes** di atas runtime matematika yang modular.

2. **Incremental Reactive Evaluation via DAG (Adapton & Salsa Incremental Models)**:
   - *Riset*: Model komputasi inkremental (Hammer et al., *Incremental Computation through Demand-Driven Memoization*) membuktikan pembaruan parsial pada pohon ketergantungan (DAG) mencegah evaluasi ulang yang tidak perlu (*early cut-off*).
   - *Penerapan*: Mengubah variabel gaji hanya menghitung ulang sub-tree (PPh 21, budget KPR), tanpa menyentuh node kalkulator independen lainnya.

3. **Arbitrary Precision Fixed-Point Arithmetic (Accounting Reliability Standards)**:
   - *Riset*: Standar akuntansi dan ISO 4217 mensyaratkan tidak adanya *floating-point rounding drift*. Operasi pembagian suku bunga anuitas memerlukan perhitungan desimal dengan presisi minimal 28 digit signifikan sebelum pembulatan ke satuan mata uang.
   - *Penerapan*: Seluruh kalkulasi wajib menggunakan `rust_decimal::Decimal` (96-bit integer mantissa dengan skala desimal eksak).

4. **Zero-Copy Shared Memory Wasm View**:
   - *Riset*: Marshalling data JSON berukuran besar melalui jembatan JS-Wasm memicu bottleneck serialisasi dan *Garbage Collection spikes* (State of WebAssembly 2025/2026).
   - *Penerapan*: Transfer data amortisasi panjang (360 bulan) menggunakan alokasi buffer linear statis (`TypedArray view`), memungkinkan UI membaca data langsung dari memori Wasm tanpa alokasi baru.

---

## 2. Arsitektur Komputasi: Triad Core Engine

Seluruh 150 kalkulator di [produk.md](file:///workspaces/Zeltra-Finance/produk.md) diturunkan secara hierarkis dari 3 Core Engine:

```
┌────────────────────────────────────────────────────────────────────────┐
│                      REACTIVE ENGINE COORDINATOR                       │
│        (Incremental DAG Scheduler + Dependency Cache Engine)          │
└───────────────┬────────────────────────┬───────────────────────────────┘
                │                        │                               │
┌───────────────▼──────────────┐ ┌───────▼──────────────────────┐ ┌──────▼──────────────────────┐
│        CORE ENGINE A         │ │        CORE ENGINE B         │ │        CORE ENGINE C         │
│  Loan & Debt Amortization    │ │  Capital & Time Value (TVM)  │ │  Statutory, Tax & Commercial │
│  (Annuity, Effective, Flat)  │ │  (Compounding, FIRE, Solver) │ │  (PPh 21 TER, BPJS, Margins) │
└───────────────┬──────────────┘ └───────┬──────────────────────┘ └──────┬──────────────────────┘
                │                        │                               │
       • KPR (Tools 1-20)       • Investasi (Tools 76-95)       • Pajak/HRD (Tools 36-55)
       • KKB Otomotif (21-35)   • FIRE & Pensiun (96-110)       • UMKM Online Shop (56-75)
       • Utang & DSR (136-145)  • Edukasi Keluarga (111-125)    • Belanja & Zakat (126-150)
```

---

### Core Engine A: Amortisasi Pinjaman & Kredit (Loan Engine)
Melayani: **Kategori 1 (KPR), Kategori 2 (KKB Otomotif), Kategori 9 (Manajemen Utang)**.

#### 1. Rumus Presisi Anuitas Bank Konvensional
Cicilan bulanan tetap ($A$) dihitung dari pokok hutang ($P$), suku bunga efektif per bulan ($i = \frac{r}{12}$), dan total bulan ($n$):

$$A = P \times \frac{i(1 + i)^n}{(1 + i)^n - 1}$$

- Porsi Bunga Bulan ke-$k$: $I_k = S_{k-1} \times i$
- Porsi Pokok Bulan ke-$k$: $C_k = A - I_k$
- Saldo Pokok Akhir Bulan ke-$k$: $S_k = S_{k-1} - C_k$
- *Ketentuan*: Pembulatan setengah ke atas (*Half-Up*) dilakukan pada $A$ dan $I_k$. Nilai $C_k$ adalah selisih eksak $A - I_k$ agar tidak terjadi akumulasi residu pada sisa pinjaman.

#### 2. Transisi Hybrid Fixed-to-Floating
- **Masa Fixed** ($1 \le k \le m \times 12$): Bunga acuan $r_{\text{fixed}}$.
- **Masa Floating** ($k > m \times 12$): Bunga pasar $r_{\text{floating}}$.
- *Logika Rekalkulasi*: Pada bulan ke-$(m \times 12 + 1)$, sisa pokok $S_{m \times 12}$ menjadi pokok baru pinjaman ($P_{\text{new}}$) dengan sisa tenor $n - (m \times 12)$ bulan, menghasilkan nilai cicilan baru $A_{\text{floating}}$.

#### 3. Pelunasan Ekstra & Restrukturisasi
- Menerima injeksi pembayaran ekstra $\Delta P_k$ di bulan ke-$k$.
- Pilihan mode: **Perpendek Tenor** (cicilan bulanan tetap, $n$ berkurang) atau **Perkecil Cicilan** (tenor tetap, $A$ dihitung ulang dengan pokok yang lebih kecil).

---

### Core Engine B: Nilai Waktu Uang & Akumulasi Aset (TVM Engine)
Melayani: **Kategori 5 (Investasi), Kategori 6 (Pensiun FIRE), Kategori 7 (Pendidikan & Keluarga)**.

#### 1. Compound Interest Berkala (Future Value)
Nilai masa depan ($FV$) dari modal awal ($PV$), setoran rutin bulanan ($PMT$), bunga tahunan ($r$), frekuensi pemajemukan bulanan ($m = 12$), dan jangka waktu tahun ($t$):

$$FV = PV \left(1 + \frac{r}{m}\right)^{mt} + PMT \left[ \frac{\left(1 + \frac{r}{m}\right)^{mt} - 1}{\frac{r}{m}} \right]$$

#### 2. Penyesuaian Inflasi Riil (Purchasing Power)
Untuk mengantisipasi inflasi pendidikan (~10%/tahun) atau inflasi umum (~3.5%-5%/tahun):
$$FV_{\text{real}} = \frac{FV}{(1 + g)^t}$$
di mana $g$ adalah tingkat inflasi tahunan yang diasumsikan.

#### 3. Goal-Seeking Inverse Solver (Newton-Raphson & Bisection)
Bila pengguna menentukan target akhir $FV^*$ (misal target pensiun Rp 5 Miliar):
- Algoritma menghitung mundur nilai $PMT$ yang dibutuhkan:
  $$PMT = \frac{FV^* - PV \left(1 + \frac{r}{m}\right)^{mt}}{\left[ \frac{\left(1 + \frac{r}{m}\right)^{mt} - 1}{\frac{r}{m}} \right]}$$
- Untuk mencari tingkat return $r$ yang dibutuhkan bila $PMT$ terbatas, engine mengeksekusi metode numerik **Bisection** dengan toleransi $\epsilon = 10^{-6}$ (selesai dalam < 25 iterasi di CPU).

---

### Core Engine C: Kepatuhan Regulasi RI & Komersial (Statutory Engine)
Melayani: **Kategori 3 (Gaji, HRD & Pajak Pribadi), Kategori 4 (UMKM), Kategori 8 & 10 (Utilitas & Zakat)**.

#### 1. PPh 21 Skema TER Terbaru (PP 58/2023)
- **Kategori TER Berdasarkan Status PTKP**:
  - **TER A**: TK/0 (PTKP Rp 54.000.000), TK/1 (Rp 58.500.000), K/0 (Rp 58.500.000).
  - **TER B**: TK/2 (Rp 63.000.000), TK/3 (Rp 67.500.000), K/1 (Rp 63.000.000), K/2 (Rp 67.500.000).
  - **TER C**: K/3 (PTKP Rp 72.000.000).
- Pemotongan Masa Januari–November:
  $$\text{PPh 21}_{\text{bulan}} = \text{Penghasilan Bruto} \times \text{Tarif TER}_{\text{lookup}}(\text{Bruto}, \text{Kategori})$$
- Rekonsiliasi Masa Desember: Menghitung total pajak terutang setahun berdasarkan tarif progresif Pasal 17 UU HPP, dikurangi akumulasi potongan Januari–November.

#### 2. Iuran Wajib Jaminan Sosial (BPJS)
- **BPJS Kesehatan**:
  - Tanggungan Pekerja: 1% dari upah (maksimal batas upah Rp 12.000.000 ➔ potongan maksimal Rp 120.000).
  - Tanggungan Pemberi Kerja: 4% dari upah (maksimal Rp 480.000).
- **BPJS Ketenagakerjaan**:
  - JHT (Jaminan Hari Tua): Pekerja 2%, Perusahaan 3.7% (tanpa batas upah).
  - JP (Jaminan Pensiun): Pekerja 1%, Perusahaan 2% (dengan plafon batas upah yang disinkronisasi regulasi pemerintah tahun berjalan).
  - JKK (0.24% - 1.74%) & JKM (0.3%): Ditanggung pemberi kerja.

#### 3. Logika Penetapan Harga Jual UMKM & Margin Marketplace
- Input: HPP ($C$), target laba bersih yang diinginkan ($m$), persentase potongan admin marketplace ($a$).
- Rumus rekomendasi harga jual agar margin tidak tergerus biaya platform:
  $$P_{\text{sell}} = \frac{C \times (1 + m)}{1 - a}$$

---

## 3. Protokol Aliran Data Antar-Kalkulator (Cross-Tool Chaining DAG)

Setiap kalkulator di Zeltra Finance terdaftar sebagai **Node Komputasi** dalam graf DAG:

```rust
use rust_decimal::Decimal;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct CalculationNodeContract {
    pub node_id: String,                  // e.g., "calc-take-home-pay"
    pub input_keys: Vec<String>,          // e.g., ["gross_salary", "ptkp_status"]
    pub output_keys: Vec<String>,         // e.g., ["net_income", "pph21_monthly", "bpjs_employee"]
}

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct PipePayload {
    pub variable_name: String,            // e.g., "net_income"
    pub value: Decimal,                   // Presisi tanpa rounding error
    pub currency: String,                 // "IDR"
    pub period: String,                   // "monthly"
}
```

### Jalur Integrasi Reaktif (Contoh Pipeline Karyawan ke KPR)
```
[ Gaji Kotor: Rp 15.000.000 ]
             │
             ▼ (Engine C: PPh 21 TER + BPJS)
[ net_take_home_pay: Rp 13.450.000 ] ────────┐
             │                               │
             ▼                               ▼
[ Anggaran 50/30/20 ]           [ DSR Maksimal 30%: Rp 4.035.000/bln ]
- Kebutuhan: Rp 6.725.000                    │
- Keinginan: Rp 4.035.000                    ▼ (Engine A: Reverse Amortization)
- Tabungan/FIRE: Rp 2.690.000    [ Kemampuan Plafon KPR: ~Rp 420.000.000 ]
```

---

## 4. Wasm Linear Memory & Zero-Copy Amortization Buffer

Untuk menjaga rendering 60 FPS pada visualizer amortisasi (360 baris data cicilan):

1. **Alokasi Statis di Memory Rust**:
   Rust mengalokasikan struct memori kontinu:
   ```rust
   #[repr(C)]
   pub struct AmortizationPoint {
       pub month: f64,
       pub principal: f64,
       pub interest: f64,
       pub balance: f64,
   }
   // Buffer statis: 360 x 4 float64 = 1.440 float64 = 11,52 KB memori
   pub static mut AMORTIZATION_BUFFER: [AmortizationPoint; 360] = ...;
   ```
2. **Direct JS TypedArray View**:
   JavaScript memetakan pointer memori Wasm langsung:
   ```javascript
   const floatView = new Float64Array(wasmMemory.buffer, bufferPtr, 360 * 4);
   // Canvas me-render kurva grafik langsung dari floatView tanpa memicu alokasi heap baru!
   ```

---

## 5. Matriks Verifikasi & Kualitas Pengujian (Testing Suite)

Setiap implementasi engine diwajibkan melewati 3 tahap validasi:

1. **Golden Value Regression Tests**:
   - Uji nilai pasti dengan tabel angsuran bank BCA, BTN subsidi, dan Mandiri.
   - Uji nilai pemotongan PPh 21 TER terhadap kalkulator resmi Ditjen Pajak RI.
2. **Edge-Case Resilience**:
   - Suku bunga $0\%$ (bebas bunga / KPR murni syariah).
   - Tenor 1 bulan hingga 360 bulan (30 tahun).
   - Nilai input nominal miliaran rupiah tanpa risiko integer overflow.
3. **Execution Latency Benchmark**:
   - Seluruh siklus evaluasi DAG (Chain 5 kalkulator berurutan) wajib selesai dalam tempo $< 5\text{ milidetik}$ di browser.
