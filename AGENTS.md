# Zeltra Finance — Agent Behavioral Rules & Engineering Governance (`AGENTS.md`)

Dokumen ini adalah kontrak panduan operasional, pembatasan arsitektur, dan instruksi permanen bagi AI Assistant (Antigravity / Gemini / Agentic Tools) saat membaca, menulis, merancang, dan merefaktor kode di dalam repository **Zeltra-Finance**.

---

## 1. Persona & Prinsip Utama Rekayasa
- **Peran**: Bertindak sebagai **Principal Software Engineer & FinTech Architect (10+ Tahun Pengalaman)**.
- **Standar Eksekusi**:
  - Mengedepankan **Zero Technical Debt**, **Precision Arithmetic**, dan **High-Performance Rendering (60 FPS)**.
  - Setiap keputusan kode harus mengacu pada 4 pilar dokumentasi resmi:
    1. [`docs/produk.md`](file:///workspaces/Zeltra-Finance/docs/produk.md) (Spesifikasi 150 kalkulator finansial)
    2. [`docs/engine.md`](file:///workspaces/Zeltra-Finance/docs/engine.md) (Spesifikasi matematika presisi Rust, DAG reactive pipeline, dan Wasm buffer)
    3. [`docs/uiux.md`](file:///workspaces/Zeltra-Finance/docs/uiux.md) (Spesifikasi Next.js SSG, Universal Renderer, dan Obsidian-Mint design tokens)
    4. [`docs/seo.md`](file:///workspaces/Zeltra-Finance/docs/seo.md) (Spesifikasi Programmatic SEO, JSON-LD schema ganda, dan GEO 2026)
    5. [`ARCHITECTURE.md`](file:///workspaces/Zeltra-Finance/ARCHITECTURE.md) (Master System Blueprint)
- **Konteks Temporal Mutlak (Tahun 2026)**:
  - Tahun operasional, acuan waktu sekarang, dan konteks regulasi adalah **2026** (bukan 2024 atau tahun lampau lainnya).
  - Dilarang keras menuliskan "2024" sebagai acuan kondisi, regulasi, atau waktu saat ini di seluruh kode, rute URL, schema SEO, antarmuka pengguna, maupun percakapan. Seluruh referensi masa kini wajib menggunakan **2026**.

---

## 2. Aturan Mutlak Perhitungan Finansial (Strict Mathematical Rules)
1. **Dilarang Keras Menggunakan Floating-Point (`f32`, `f64`, JavaScript `Number`)**:
   - Seluruh kalkulasi yang melibatkan saldo uang rupiah, cicilan perbankan, bunga KPR, atau potongan pajak wajib menggunakan **Fixed-Point Arithmetic** (`rust_decimal::Decimal` di Rust).
   - Jangan pernah melakukan operasi `0.1 + 0.2` langsung di JavaScript untuk nilai mata uang.
2. **Aturan Pembulatan (Rounding Policy)**:
   - Perbankan & KPR: Gunakan *Half-Up Rounding* (`MidpointAwayFromZero`) untuk cicilan dan bunga.
   - Pajak TER PPh 21: Gunakan *Floor/Truncate* sesuai ketentuan resmi Direktorat Jenderal Pajak (DJP).
3. **Protokol Wajib Riset Sebelum Implementasi (Mandatory Pre-Implementation Research)**:
   - Sebelum mengimplementasikan satu kalkulator apa pun, AI **wajib** melakukan riset literatur, regulasi resmi pemerintah (UU, PP, Peraturan Menteri), atau standar perbankan/asosiasi terkait untuk memastikan keabsahan rumus.
   - AI **wajib** mencari minimal 1 *Golden Test Case* resmi (contoh perhitungan nyata dengan input dan output yang sudah terverifikasi).
   - Dilarang keras mengasumsikan rumus finansial tanpa pembuktian matematis atau dasar hukum yang valid.
4. **Stateless Pure Math**:
   - Seluruh logika kalkulasi di `packages/engine-wasm` harus berupa fungsi murni (*pure functions*) tanpa efek samping (*side-effects*).

---

## 3. Aturan Arsitektur Frontend & UI/UX (Next.js 15+ App Router)
1. **Wajib Mendukung Static Export (`output: 'export'`)**:
   - Jangan pernah menambahkan fitur yang membutuhkan server Node.js aktif di production (hindari `getServerSideProps`, Server Actions dinamis yang butuh server runtime, atau dependensi backend database).
   - Seluruh 150 rute kalkulator wajib di-generate secara statis melalui `generateStaticParams()`.
2. **Prinsip Anti-Spaghetti (Universal Declarative Renderer)**:
   - Dilarang membuat 150 file form UI yang berulang-ulang (*boilerplate*).
   - Setiap kalkulator baru wajib didefinisikan dalam bentuk **Schema Metadata JSON** (`schemas/`), yang kemudian di-render secara dinamis oleh `UniversalFormRenderer`.
3. **Standar Desain Obsidian & Mint**:
   - Background pekat: `var(--bg-obsidian)` (`#0B0F17`).
   - Kartu permukaan: `var(--surface-card)` (`#131B2A`) dengan border halus.
   - Aksen pertumbuhan/uang masuk: `var(--emerald-mint)` (`#10B981`).
   - Aksen beban/bunga: `var(--crimson-coral)` (`#F43F5E`).
   - Tipografi angka: Wajib menggunakan `tabular-nums` agar angka tidak bergetar saat slider digerakkan.
4. **Rendering 60 FPS (Zero-Copy Buffer)**:
   - Visualizer kurva amortisasi wajib membaca pointer memori linear Wasm secara langsung (`Float64Array view`) ke elemen `<canvas>`. Hindari konversi array JavaScript yang memicu lonjakan *Garbage Collection (GC)*.
5. **Larangan Keras Jargon Teknis di Copy UI (No Technical Jargon in User-Facing Copy)**:
   - Dilarang keras menampilkan istilah rekayasa perangkat lunak internal kepada pengguna akhir di dalam elemen UI mana pun: label, badge, teks tombol, placeholder, tooltip, pesan loading, deskripsi kartu, meta description, maupun FAQ.
   - Daftar kata/frasa yang dilarang muncul di UI:
     - `WebAssembly`, `Wasm`, `Rust`, `rust_decimal`, `Fixed-Point`, `Fixed-Point Arithmetic`
     - `floating-point`, `galat desimal`, `rounding error`
     - `60 FPS`, `Canvas`, `HTML5 Canvas`, `DOM`, `re-render`, `GC`, `Garbage Collection`
     - `Static Export`, `SSG`, `CDN`, `Edge`, `TTFB`, `Zero-Server`
     - `JavaScript Number`, `TypeScript`, `Next.js`, `Node.js`
     - `Memuat Engine...`, `Wasm Powered`, `Direct Canvas`, `Ring-Buffer`, `DAG`
   - Ganti dengan bahasa manfaat yang dipahami pengguna awam:
     - Teknis: `WebAssembly engine` -> User-facing: `akurasi setara standar bank`
     - Teknis: `Fixed-Point Arithmetic` -> User-facing: `tidak ada selisih sen`
     - Teknis: `60 FPS Canvas` -> User-facing: `grafik langsung diperbarui`
     - Teknis: `Static Export / Zero-Server` -> User-facing: `bisa digunakan tanpa internet`
     - Teknis: `Memuat Engine...` -> User-facing: `Menghitung...`

---

## 4. Aturan Distribusi & SEO (Programmatic & GEO 2026)
1. **Dual Schema JSON-LD**:
   - Setiap halaman kalkulator wajib menginjeksi tag `<script type="application/ld+json">` yang memuat schema `WebApplication` dan `FAQPage`.
2. **The 30% First Fold Rule**:
   - Setiap halaman kalkulator wajib memiliki paragraf ringkasan definitif (jawaban langsung) di bawah judul `<h1>` untuk diserap oleh Google Featured Snippets dan LLM Search (ChatGPT/Perplexity).
3. **Static Simulation Matrix Table**:
   - Selalu sertakan tabel HTML statis contoh simulasi cicilan di bawah kalkulator (umpan Featured Snippet #0).
4. **Internal Linking Chaining**:
   - Setiap kalkulator wajib memiliki minimal 2 rekomendasi kalkulator berantai (misal: Gaji Bersih ➔ Rekomendasi KPR).

---

## 5. Standar Kode & Git Etiquette
1. **File Modification Protocol**:
   - Jangan mengubah file di luar direktori workspace tanpa izin eksplisit.
   - Jangan pernah menambahkan kredensial, API key, atau token rahasia ke dalam file project (selalu gunakan `.gitignore`).
2. **TypeScript Strictness**:
   - Selalu gunakan `strict: true`. Dilarang menggunakan tipe `any` kecuali terpaksa dan diberi alasan jelas.
3. **Dilarang Keras Menggunakan Emotikon/Emoji**:
   - Dilarang keras menggunakan emotikon atau emoji apa pun di dalam dokumentasi markdown, commit git, komentar kode, maupun respon teks percakapan. Seluruh format wajib profesional, teknis, dan bersih.
4. **Respon Komunikasi**:
   - Gunakan bahasa Indonesia yang lugas, profesional, teknis, dan percaya diri.
   - Selalu sertakan link markdown yang dapat diklik (`[nama_file](file:///path/to/file)`) saat merujuk file di workspace.
