# Zeltra Finance — SEO & GEO Distribution Engine 2026 (`seo.md`)

Dokumen ini merupakan cetak biru strategi distribusi organik dan penguasaan mesin pencari untuk Zeltra Finance. Dirancang berdasarkan lanskap pencarian **2025/2026**, di mana strategi SEO konvensional (10 blue links Google) telah bertransformasi menjadi perpaduan antara **Programmatic SEO (pSEO)** dan **Generative Engine Optimization (GEO)** untuk menaklukkan Google AI Overviews, Perplexity, ChatGPT Search, dan Apple Intelligence.

---

## 1. Lanskap Pencarian Finansial 2026: The Paradigm Shift

Berdasarkan riset industri dan statistik SEO 2026 (BrightEdge, Similarweb, SparkToro):
- **Zero-Click Searches melonjak hingga >65%**: Google AI Overviews kini aktif di hampir 50% pencarian kata kunci. Pengguna tidak mau membaca artikel 2.000 kata bertele-tele; mereka butuh **angka kalkulasi instan**.
- **Konversi Trafik LLM (GEO) 9x Lebih Tinggi**: Pengunjung yang datang dari rujukan AI (ChatGPT/Perplexity/Gemini) memiliki tingkat konversi 10.5%–15.9% dibanding pencarian organik biasa (~1.76%).
- **44.2% Kutipan LLM Berasal dari 30% Paragraf Awal**: Jawaban definitif, rumus, dan angka wajib berada di *above-the-fold*.

> **Target Distribusi Zeltra Finance**:
> 1. **Google Traditional Search**: Mendominasi Ranking 1 dan *Featured Snippets (Rank 0)* untuk 150 kata kunci spesifik perbankan & pajak Indonesia.
> 2. **AI Overviews & LLM Search (GEO)**: Menjadi sumber rujukan data primer (*Primary Citation Source*) saat user bertanya ke ChatGPT/Perplexity: *"Berapa cicilan KPR BCA pinjaman 500 juta 15 tahun?"* atau *"Cara hitung PPh 21 TER gaji 15 juta"*.

---

## 2. Arsitektur Silo Semantik (Topic Cluster 150 Kalkulator)

Struktur URL dirancang menggunakan **Hierarchical Semantic Silo** yang membagi otoritas domain ke dalam 10 kluster utama tanpa tumpang tindih:

```
https://zeltra.finance/
├── properti/                 (Silo 1: KPR & Rumah - Tools 1-20)
│   ├── kpr-umum
│   ├── kpr-bank-bca
│   ├── kpr-bank-mandiri
│   ├── bphtb
│   └── kemampuan-beli-rumah
├── otomotif/                 (Silo 2: Kendaraan - Tools 21-35)
│   ├── kredit-mobil-baru
│   └── pajak-tahunan-mobil
├── pajak/                    (Silo 3: Gaji & Regulasi - Tools 36-55)
│   ├── pph-21-ter
│   └── gaji-bersih
├── umkm/                     (Silo 4: Marketplace & Dagang - Tools 56-75)
│   ├── potongan-admin-shopee
│   └── margin-keuntungan
├── investasi/                (Silo 5: Wealth & Future Value - Tools 76-95)
│   └── compound-interest
└── pensiun/                  (Silo 6: Gerakan FIRE - Tools 96-110)
    └── angka-fire
```

### Aturan Internal Linking (Contextual Chaining)
- Setiap halaman kalkulator wajib memiliki minimal 3 tautan silang horizontal (*sibling link*) dan 1 tautan vertikal ke kategori induk (*parent category*).
- Contoh di halaman `/pajak/gaji-bersih`:
  - Link otomatis: *"Gunakan gaji bersih ini untuk [Cek Kemampuan Beli Rumah KPR](/properti/kemampuan-beli-rumah) atau [Simulasi Angka Pensiun Dini](/pensiun/angka-fire)"*.
  - Menghasilkan *crawl depth* maksimal $\le 3$ klik dari homepage untuk seluruh 150 kalkulator.

---

## 3. Programmatic SEO (pSEO) Blueprint: The Content Factory

Untuk mencetak 150 halaman berotoritas tinggi tanpa konten duplikat (*thin content penalty*), setiap halaman kalkulator di-generate secara otomatis menggunakan template data terstruktur:

### 1. Intent-Driven Metadata Formula
- **Title Tag Pattern**:
  `[Nama Kalkulator] Indonesia 2026: Simulasi [Target Manfaat] Akurat`
  *Contoh*: `Kalkulator KPR Bank BCA 2026: Simulasi Cicilan Fixed & Floating Akurat`
- **Meta Description Pattern**:
  `Hitung otomatis [Variabel Utama] dengan aturan [Regulasi Terkini]. Lengkap dengan tabel cicilan bulanan, breakdown bunga, dan 100% bebas biaya.`

### 2. The 30% First Fold Rule (Direct Answer Box)
Paragraf pembuka di bawah judul `<h1>` ditulis to-the-point dalam 2 kalimat ringkas untuk langsung diserap oleh web crawler dan AI summary:
> *"Kalkulator KPR Bank BCA menghitung estimasi angsuran bulanan berdasarkan suku bunga fixed promo (mulai 3.75%) dan estimasi floating rate perbankan nasional. Masukkan plafon pinjaman dan tenor untuk melihat tabel amortisasi lengkap tanpa jeda kalkulasi."*

### 3. Programmatic Simulation Matrix Table (Featured Snippet Bait)
Di bawah form kalkulator interaktif, sistem mencetak tabel statis HTML berisi skenario umum yang paling sering dicari orang di Google.
*Contoh pada halaman KPR*:

| Plafon Pinjaman | Tenor 10 Tahun (Bunga 7%) | Tenor 15 Tahun (Bunga 7%) | Tenor 20 Tahun (Bunga 7%) |
| :--- | :--- | :--- | :--- |
| **Rp 250.000.000** | Rp 2.902.000 / bln | Rp 2.247.000 / bln | Rp 1.938.000 / bln |
| **Rp 500.000.000** | Rp 5.805.000 / bln | Rp 4.494.000 / bln | Rp 3.876.000 / bln |
| **Rp 1.000.000.000** | Rp 11.610.000 / bln | Rp 8.988.000 / bln | Rp 7.753.000 / bln |

*Dampak*: Tabel statis ini yang di-crawl oleh bot Google dan langsung diangkat menjadi **Google Featured Snippet (Posisi #0)**.

---

## 4. Generative Engine Optimization (GEO) & LLM Retrieval Standards

Bagaimana agar Zeltra Finance dikutip oleh ChatGPT Search, Google Gemini, dan Perplexity saat menjawab pertanyaan finansial pengguna?

1. **Entity Citation & Authoritative References**:
   - Setiap kalkulator wajib mencantumkan sumber otoritatif perundang-undangan (DJP PP 58/2023, UU HPP No. 7/2021, Peraturan OJK, Bank Indonesia BI-Rate).
   - LLM memprioritaskan situs yang menyertakan referensi legal resmi sebagai bukti validitas fakta.

2. **FAQ Accordion dengan Pertanyaan Percakapan (Natural Voice Queries)**:
   - Format pertanyaan disesuaikan dengan cara orang mengetik di ChatGPT:
     - `Q: "Apakah pelunasan KPR BCA dipercepat kena penalti?"`
     - `A: "Ya, pelunasan sebagian atau seluruhnya sebelum masa fixed berakhir umumnya dikenakan denda pinalti 1% - 3% dari sisa pokok pinjaman."`

3. **Information Density & Structured Markdown**:
   - Algoritma LLM ekstraktor menyukai teks dengan *information density* tinggi: menggunakan heading jelas (`##`, `###`), bullet point ringkas, dan menghindari filler words (*"Halo sobat finansial..."*).

---

## 5. Structured Data Machine Layer (Rich Snippets JSON-LD)

Setiap halaman diinjeksi dengan schema ganda (Dual-Schema) saat proses build time Next.js:

### 1. `WebApplication` Schema
```json
{
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "Kalkulator KPR Bank BCA",
  "url": "https://zeltra.finance/properti/kpr-bank-bca",
  "applicationCategory": "FinanceApplication",
  "operatingSystem": "All",
  "browserRequirements": "Requires JavaScript and WebAssembly",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "IDR"
  }
}
```

### 2. `FAQPage` Schema
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Berapa minimal DP KPR Bank BCA?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Uang Muka (DP) KPR BCA mulai dari 0% hingga 10% untuk rumah pertama sesuai kebijakan Loan to Value (LTV) Bank Indonesia."
      }
    }
  ]
}
```

---

## 6. Core Web Vitals & Technical SEO Metrics Target

Google menjadikan pengalaman halaman (*page experience*) sebagai sinyal peringkat penting:

| Metrik Core Web Vitals | Standar Google (Good) | Target Zeltra Finance 2026 | Strategi Pencapaian |
| :--- | :--- | :--- | :--- |
| **LCP (Largest Contentful Paint)** | $\le 2.5\text{ s}$ | **$\le 0.6\text{ s}$** | Static HTML Export (SSG) + Cloudflare Edge Anycast CDN |
| **INP (Interaction to Next Paint)** | $\le 200\text{ ms}$ | **$\le 16\text{ ms}$ (60 FPS)** | Rust/Wasm Direct Execution + Ring-Buffer Rendering |
| **CLS (Cumulative Layout Shift)** | $\le 0.1$ | **$0.00$** | Fixed dimensions container untuk canvas dan slider form |
| **TTFB (Time to First Byte)** | $\le 800\text{ ms}$ | **$\le 40\text{ ms}$** | Edge Cache Storage tanpa database query |

---

## 7. Automated Sitemap & Indexing Protocol

1. **Sitemap Segmentation**:
   - `sitemap-index.xml` memecah 150 kalkulator per kategori: `sitemap-properti.xml`, `sitemap-pajak.xml`, `sitemap-umkm.xml`.
   - Update otomatis setiap kali ada penyesuaian aturan pajak atau suku bunga.
2. **IndexNow Protocol**:
   - Mengintegrasikan protokol *IndexNow* (Bing, Yandex, dan search engine AI) untuk memberitahukan pembaruan konten dalam hitungan detik setelah rilis.
3. **Robots.txt Standar 2026**:
   - Mengizinkan crawler AI publik (`GPTBot`, `PerplexityBot`, `ClaudeBot`, `Google-Extended`) agar seluruh kalkulator diindeks ke dalam basis pengetahuan LLM global.
