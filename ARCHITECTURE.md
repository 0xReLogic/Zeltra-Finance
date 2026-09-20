# Zeltra Finance — Master System Architecture Blueprint (`ARCHITECTURE.md`)

Dokumen ini merupakan cetak biru induk (*Master System Architecture*) yang mengikat seluruh domain rekayasa perangkat lunak Zeltra Finance: **Scope Produk**, **Mesin Komputasi Finansial**, **Desain Antarmuka & UX**, serta **Mesin Distribusi SEO/GEO**.

---

## 1. Peta Dokumen & Domain Engineering

Seluruh spesifikasi teknis Zeltra Finance dipecah ke dalam 4 pilar dokumen independen untuk menjamin **Zero Technical Debt**:

```
                              ┌──────────────────────────────────┐
                              │         ARCHITECTURE.md          │
                              │     (Master System Blueprint)    │
                              └─────────────────┬────────────────┘
         ┌─────────────────────────┬────────────┴────────────┬─────────────────────────┐
         ▼                         ▼                         ▼                         ▼
┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐       ┌─────────────────┐
│    produk.md    │       │    engine.md    │       │     uiux.md     │       │     seo.md      │
│ (Product Scope) │       │ (Computation)   │       │ (UI/UX & Design)│       │ (Distribution)  │
├─────────────────┤       ├─────────────────┤       ├─────────────────┤       ├─────────────────┤
│ • 150 Kalkulator│       │ • Rust / Wasm   │       │ • Next.js SSG   │       │ • pSEO 2026     │
│ • 10 Kategori   │       │ • Incremental   │       │ • Obsidian-Mint │       │ • GEO (AI LLM)  │
│   Pasar Lokal   │       │   DAG Pipeline  │       │ • Universal     │       │ • Zero-Click    │
│ • User Journey  │       │ • Fixed-Point   │       │   Renderer      │       │   Snippets      │
│   & Silo Kluster│       │ • Zero-Copy Ring│       │ • 60 FPS Canvas │       │ • Dual Schema   │
│                 │       │   Buffer Memory │       │ • Offline PWA   │       │   JSON-LD       │
└─────────────────┘       └─────────────────┘       └─────────────────┘       └─────────────────┘
```

- [docs/produk.md](file:///workspaces/Zeltra-Finance/docs/produk.md) — Daftar lengkap 150 kalkulator finansial dalam 10 kategori pasar Indonesia.
- [docs/engine.md](file:///workspaces/Zeltra-Finance/docs/engine.md) — Spesifikasi matematika presisi Rust, DAG reactive computation, dan shared buffer Wasm.
- [docs/uiux.md](file:///workspaces/Zeltra-Finance/docs/uiux.md) — Arsitektur Next.js SSG, Universal Renderer, Obsidian-Mint design tokens, dan interaksi 60 FPS.
- [docs/seo.md](file:///workspaces/Zeltra-Finance/docs/seo.md) — Cetak biru Programmatic SEO, Generative Engine Optimization (GEO), dan rich snippets JSON-LD.

---

## 2. Triad System Architecture

Untuk menghindari *boilerplate* dan menjaga performa rendering 60 FPS pada 150 kalkulator, sistem mengadopsi 3 lapisan fondasi:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        UI & INTERACTION LAYER                          │
│     Next.js App Router (Static Export) | Obsidian-Mint Tokens | PWA    │
│            Universal Declarative Renderer | Smart Input Omnibox        │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ Reactive Bindings
┌───────────────────────────────────▼────────────────────────────────────┐
│                    REACTIVE COMPUTATION GRAPH (DAG)                    │
│      Incremental Dependency Engine | Session Cache | Chaining Pipe     │
└─────────────────┬────────────────────────────────────┬─────────────────┘
                  │ Lightweight Math (<1ms)            │ Heavy Compute / Shared Memory
┌─────────────────▼────────────────┐ ┌─────────────────▼────────────────┐
│   Tier-1: Pure JS/TS Decimal     │ │    Tier-2: Rust / Wasm Engine    │
│   - Pajak PPh 21 TER, PTKP       │ │    - 360-Mo Amortization Buffer  │
│   - Margin, Markup, BEP          │ │    - Monte Carlo Stress-Test     │
│   - Konversi Kurs & Diskon       │ │    - Client-Side OCR Preprocess  │
│   - Split Bill, Zakat Maal       │ │    - ChaCha20/Poly1305 E2EE      │
└──────────────────────────────────┘ └──────────────────────────────────┘
```

### Standar Presisi Moneter
- **Anti-Floating Point Drift**: Mengharamkan operasi floating-point standar JavaScript (`Number`) untuk nilai mata uang rupiah.
- Seluruh kalkulasi moneter menggunakan **Fixed-Point Decimal** (`rust_decimal::Decimal` di Rust) untuk menjamin akurasi sen ke sen sesuai standar perbankan nasional Indonesia.

---

## 3. Matriks Implementasi 10 Fitur Utama

| No | Fitur Utama | Modul Bertanggung Jawab | Pendekatan Rekayasa |
| :--- | :--- | :--- | :--- |
| **1** | **Smart Universal Input Engine** | Frontend UI Omnibox | Tokenizer berbasis Regex + Pattern Matching deteksi nominal rupiah & intensi kalkulator. |
| **2** | **Cross-Tool Chaining Protocol** | DAG Core Engine | Directed Acyclic Graph data pipeline (`PipePayload`) antar kalkulator hulu dan hilir. |
| **3** | **Client-Side Wasm OCR Scanner** | Rust Wasm + Canvas | Image binarization & OCR di memori browser tanpa upload ke server (100% privasi). |
| **4** | **Goal-Seeking Reverse Calculator** | Rust Math Solver | Inversi matematis via metode Newton-Raphson / Bisection (selesai dalam < 2 ms). |
| **5** | **Macro-Economic Stress-Test** | Rust Simulation Engine | Shock testing lonjakan bunga BI-Rate & inflasi terhadap cash runway dan cicilan KPR. |
| **6** | **Zero-Knowledge Shareable Blueprint** | Web Crypto + URL Hash | Kompresi zlib + enkripsi ChaCha20 pada URL fragment (`#blueprint=...`) tanpa database. |
| **7** | **Dynamic Amortization Ring-Buffer** | Wasm Linear Memory | Alokasi statis `Float64Array` 360 bulan (~11.5 KB) dibaca langsung oleh Canvas (60 FPS). |
| **8** | **Local Statutory Compliance Sync** | Statutory Engine | Versioned rules JSON (PP 58/2023, tarif Pasal 17, batas upah BPJS TK/Kesehatan). |
| **9** | **Multi-Scenario Comparison Sandbox**| Multi-Instance Stores | Side-by-side benchmarking 3 opsi finansial dengan kalkulasi selisih biaya otomatis. |
| **10**| **Offline-First PWA Core** | Service Worker Cache | Pre-caching Wasm binary & shell aplikasi di Cache API untuk operasional 100% offline. |

---

## 4. Struktur Direktori Monorepo Terstandarisasi

Proyek diorganisasi menggunakan arsitektur monorepo modern:

```
zeltra-finance/
├── apps/
│   └── web/                         # Next.js 15+ App Router (SSG Export)
│       ├── public/                  # Manifest PWA, icon maskable, static assets
│       ├── src/
│       │   ├── app/                 # File-based routing (Silo Kluster)
│       │   │   ├── properti/[slug]/ # Programmatic dynamic routes
│       │   │   ├── pajak/[slug]/
│       │   │   ├── layout.tsx
│       │   │   └── page.tsx         # Homepage + Smart Universal Input
│       │   ├── components/          # UniversalFormRenderer, CanvasVisualizer
│       │   ├── schemas/             # 150 Calculator JSON Definitions
│       │   └── styles/              # FinTech Obsidian-Mint Design Tokens
│       ├── next.config.mjs          # output: 'export'
│       └── package.json
├── packages/
│   ├── engine-wasm/                 # Rust Wasm Crate (Math Core)
│   │   ├── Cargo.toml               # wasm-bindgen, rust_decimal, serde
│   │   └── src/
│   │       ├── lib.rs               # Wasm bindings & Triad root
│   │       ├── loan/                # Core Engine A: Pinjaman & Kredit (Tools 1-35, 136-145)
│   │       │   ├── mod.rs           # Facade & Wasm exports
│   │       │   ├── types.rs         # AmortizationRow & Loan results
│   │       │   ├── annuity.rs       # Bunga Anuitas standar bank
│   │       │   ├── flat.rs          # Bunga Flat konstan
│   │       │   ├── effective.rs     # Bunga Efektif menurun
│   │       │   └── general.rs       # Simulasi KPR umum & rasio DSR
│   │       ├── tvm/                 # Core Engine B: Nilai Waktu Uang & Aset (Tools 76-125)
│   │       │   ├── mod.rs           # Facade & Wasm exports
│   │       │   ├── types.rs         # CompoundGrowthPoint & Result
│   │       │   └── compound.rs      # Bunga majemuk & Future Value
│   │       ├── statutory/           # Core Engine C: Regulasi RI & Pajak (Tools 36-75, 146-150)
│   │       │   ├── mod.rs           # Facade & Wasm exports
│   │       │   ├── types.rs         # PPh 21 TER, BPJS & Payroll
│   │       │   └── pph21_ter.rs     # PP 58/2023 TER Kategori A/B/C
│   │       └── buffer.rs            # 360-Mo Shared Linear Ring-Buffer
├── docs/                            # Dokumentasi Spesifikasi Resmi
│   ├── produk.md                    # 150 Kalkulator Finansial
│   ├── engine.md                    # Spesifikasi Rust Wasm
│   ├── uiux.md                      # Spesifikasi UI/UX & Next.js
│   └── seo.md                       # Spesifikasi SEO & GEO
├── ARCHITECTURE.md                  # Master System Architecture Blueprint
├── GEMINI.md                        # Kontrak Governance AI Assistant
├── AGENTS.md                        # Universal Multi-Agent Governance
├── README.md                        # Overview Proyek
└── package.json                     # Monorepo Workspaces Root
```

---

## 5. Alur Eksekusi Pengembangan (Implementation Roadmap)

1. **Tahap 1: Core Engine Initialization (Rust Wasm)**
   - Setup `packages/engine-wasm` dan kompilasi library matematika amortisasi presisi.
   - Uji unit testing terhadap tabel cicilan bank BCA & Mandiri.
2. **Tahap 2: Frontend Shell & Universal Renderer (Next.js)**
   - Setup `apps/web` dengan Tailwind/Vanilla CSS (FinTech Obsidian-Mint tokens).
   - Buat `UniversalFormRenderer` yang membaca file schema JSON kalkulator.
3. **Tahap 3: Wasm-to-Canvas Integration**
   - Integrasikan pointer memory Wasm ke komponen `<canvas>` untuk visualisasi amortisasi 60 FPS.
4. **Tahap 4: Programmatic SEO & Static Generation Build**
   - Implementasikan `generateStaticParams()` untuk mencetak 150 halaman HTML beserta JSON-LD schema ganda.
5. **Tahap 5: PWA & Deployment**
   - Registrasi Service Worker offline-first dan rilis ke Cloudflare Pages.
