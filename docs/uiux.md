# Zeltra Finance — UI/UX Specification & Frontend Architecture (`uiux.md`)

Dokumen ini merupakan panduan spesifikasi antarmuka, arsitektur frontend, dan sistem desain untuk Zeltra Finance. Dirancang dengan standar rekayasa perangkat lunak 10 tahun pengalaman (Principal/Staff Engineer level) yang menyeimbangkan **SEO brutal (ranking Google), performa interaksi 60 FPS, WebAssembly integration, dan Zero Maintenance Debt**.

---

## 1. Arsitektur Frontend: Next.js 15+ App Router (Static Export)

Zeltra Finance dibangun menggunakan **Next.js (App Router)** yang dikonfigurasi dalam mode **Static Site Export (`output: 'export'`)**. Arsitektur ini dipilih sebagai standar industri untuk mencapai sinergi sempurna antara **Programmatic SEO (HTML siap saji untuk Google)** dan **Client-Side High Performance (Rust Wasm & 60 FPS Canvas)**.

### Karakteristik & Konfigurasi Inti
1. **Zero-Server Runtime (`output: 'export'`)**:
   - Seluruh 150 rute kalkulator dikompilasi saat build-time menjadi file HTML, CSS, dan JS statis murni (`out/`).
   - Tidak memerlukan server Node.js aktif di production.
   - Hosting gratis selamanya di Edge CDN (Cloudflare Pages, GitHub Pages, atau Vercel) dengan Time-To-First-Byte (TTFB) global $< 40\text{ ms}$.

2. **Dual-Phase Lifecycle (Server-Prerendered SEO + Client Hydration)**:
   - **Phase 1 (Server/Build Time)**: Next.js mengeksekusi `generateStaticParams()` dan `generateMetadata()`. Menghasilkan file HTML lengkap dengan judul `<h1>`, tabel simulasi cicilan cepat, FAQ terstruktur, dan tag OpenGraph.
   - **Phase 2 (Browser Runtime)**: Halaman dihidrasi dengan komponen `'use client'`. WebAssembly (`engine-wasm`) dimuat secara dinamis, mengaktifkan slider interaktif, kalkulasi instan, dan visualizer Canvas 60 FPS tanpa jeda.

3. **Routing Silo Semantik**:
   - Struktur folder mengikuti Semantic Silo di monorepo `apps/web`:
     - `apps/web/src/app/[silo]/[slug]/page.tsx`
     - Rute statis otomatis mencetak: `/properti/kpr-simulasi-umum/`, `/properti/kpr-bank-bca/`, `/pajak/pph-21-ter-2026/`.

---

## 2. Universal Declarative UI Renderer (Anti-Spaghetti Code)

Untuk menghindari menulis 150 komponen form yang membosankan dan boros kode, sistem mengadopsi **Single Master Dynamic Renderer (`apps/web/src/components/UniversalCalculatorView.tsx`)**:

```
[ Schema Metadata Kalkulator ] ──► [ UniversalCalculatorView ] ──► [ Rust Engine (Wasm) ]
                                                │                                │
                                                ▼                                ▼
                                     [ Adaptive Sliders & Inputs ]    [ 60 FPS Canvas Visualizer ]
```

### Format Schema Kontrak Bersama (`@zeltra/shared-contracts`)
```typescript
export interface InputFieldSchema {
  id: string;
  label: string;
  description?: string;
  type: 'currency' | 'percentage' | 'number' | 'select' | 'slider';
  defaultValue: number | string;
  validation: FieldValidation;
  options?: Array<{ label: string; value: string | number }>;
  unit?: string;
}

export interface OutputFieldSchema {
  id: string;
  label: string;
  type: 'currency' | 'percentage' | 'number' | 'badge';
  highlight?: boolean;
}

export interface CalculatorSchema {
  id: string;
  slug: string;
  name: string;
  category: CalculatorCategory;
  engineFunction: string;
  inputs: InputFieldSchema[];
  outputs: OutputFieldSchema[];
  seo: SeoSchema;
}
```

Dengan sistem ini:
- Menambahkan 1 kalkulator baru **cukup membuat 1 objek file konfigurasi di `apps/web/src/schemas/`**.
- Tampilan form, validasi, format Rupiah (`Rp 1.500.000`), slider, visualizer grafik, dan bagian FAQ di bawahnya otomatis terbentuk secara konsisten.

---

## 3. Sistem Desain Estetika: "FinTech Obsidian & Mint"

Sesuai standar antarmuka finansial modern tingkat atas (Linear / Stripe / TradingView style), antarmuka mengusung estetika **Dark Luxury Minimalist**:

### Palet Warna (Tailored Tokens)
- **Background Utama**: `var(--bg-obsidian)` `#0B0F17` (Gelap pekat bertekstur, nyaman di mata).
- **Surface / Card**: `var(--surface-card)` `#131B2A` dengan aksen glassmorphism subtle border (`rgba(255, 255, 255, 0.08)`).
- **Aksen Profit / Growth**: `var(--emerald-mint)` `#10B981` / `#059669` (Hijau neon elegan, melambangkan uang masuk dan investasi positif).
- **Aksen Beban / Bunga / Utang**: `var(--crimson-coral)` `#F43F5E` (Merah muda tegas untuk komponen bunga bank dan potongan pajak).
- **Aksen Interaksi & Slider**: `var(--cyan-electric)` `#06B6D4` (Warna dinamis saat menggeser slider).
- **Tipografi**: Menggunakan kombinasi Google Fonts **Outfit** (Heading / Angka Besar) dan **Inter** (Body / Keterangan Finansial) dengan *tabular figures* (`font-variant-numeric: tabular-nums`) agar angka tidak bergeser saat slider digerakkan.

---

## 4. UX & Micro-Interactions (The 60 FPS Experience)

### 1. Smart Universal Input (Omnibox di Homepage)
- Tampilan mirip Spotlight (macOS) / Command Palette di baris paling atas halaman depan.
- **Micro-feedback**:
  - Saat user mengetik *"800jt"*, sistem langsung memunculkan preview: `Rp 800.000.000` dalam badge kecil.
  - Shortcut tombol cepat (Chips): `[Hitung PPh 21]` `[Cek KPR]` `[Beli Mobil]` `[Simulasi Pensiun]`.

### 2. Physics-Based Sliders
- Setiap slider angka dilengkapi:
  - Tombol **Preset Cepat**: Misal pada tenor KPR ada tombol instan `[5 Thn]` `[10 Thn]` `[15 Thn]` `[20 Thn]`.
  - **Haptic Visual Ripple**: Saat nilai menyentuh batas tertentu (misal batas DSR utang > 30%), border kartu berubah menjadi amber/merah halus sebagai peringatan risiko finansial.

### 3. Canvas 2D Direct Rendering
- Grafik amortisasi 360 bulan digambar menggunakan native HTML5 Canvas `<canvas>` dengan `requestAnimationFrame`.
- Membaca data langsung dari memori Wasm tanpa konversi array JS, menjamin **0% stuttering** bahkan pada smartphone Android entry-level.

---

## 5. Blueprint Halaman & Silo SEO (Programmatic SEO)

Setiap halaman kalkulator memiliki arsitektur hierarki konten yang disukai Google bot:

```
┌─────────────────────────────────────────────────────────────┐
│ Header & Breadcrumb: Home > Properti > KPR Bank BCA         │
├─────────────────────────────────────────────────────────────┤
│ <h1> Kalkulator Simulasi KPR Bank BCA (Bunga Promo 2026)    │
├─────────────────────────────────────────┬───────────────────┤
│ Form Input Cerdas & Slider Dinamis      │ Summary Box &     │
│ - Plafon Pinjaman (Rp)                  │ Cicilan / Bulan   │
│ - Suku Bunga Fixed & Floating (%)       ├───────────────────┤
│ - Tenor Pinjaman (Tahun)                │ 60 FPS Canvas     │
│ - Pelunasan Ekstra                      │ Amortization Chart│
├─────────────────────────────────────────┴───────────────────┤
│ Action Bar: [Copy Link E2EE] [Unduh Jadwal PDF] [Chain KPR] │
├─────────────────────────────────────────────────────────────┤
│ <h2> Cara Menghitung Cicilan KPR BCA & Contoh Kasus Nyata   │
│ (Konten Edukatif Terstruktur untuk SEO Featured Snippet)    │
├─────────────────────────────────────────────────────────────┤
│ <h2> Tabel Simulasi Cicilan Plafon Rp 300 Jt - Rp 1 Miliar  │
├─────────────────────────────────────────────────────────────┤
│ <h2> Pertanyaan Sering Diajukan (FAQ Schema JSON-LD)        │
└─────────────────────────────────────────────────────────────┘
```

---

## 6. Offline-First PWA & Cache Architecture

1. **Manifest Configuration**:
   - `display: standalone` (menghilangkan address bar browser, tampil seperti aplikasi native iOS/Android).
   - Icon adaptive maskable untuk homescreen smartphone.
2. **Service Worker Cache Strategy**:
   - **Pre-cache Core**: Shell aplikasi, font, dan biner Wasm di-cache permanen saat instalasi pertama.
   - **Stale-While-Revalidate**: Halaman HTML yang pernah dikunjungi disimpan lokal di Cache API. Pengguna tetap bisa menghitung cicilan KPR dan pajak meski berada di dalam pesawat tanpa sinyal.
