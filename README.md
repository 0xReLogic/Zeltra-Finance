# Zeltra Finance

Platform perencana dan 150 kalkulator finansial presisi tinggi untuk pasar Indonesia. Dibangun dengan pendekatan **Client-Side High Performance (Rust + WebAssembly)**, **Next.js (Static Site Generation)**, dan **Programmatic SEO / Generative Engine Optimization (GEO)**.

---

## Dokumentasi Arsitektur & Spesifikasi

Seluruh blueprint dan spesifikasi rekayasa sistem disimpan secara terstruktur di folder [`docs/`](file:///workspaces/Zeltra-Finance/docs):

| Dokumen | Deskripsi | Tautan |
| :--- | :--- | :--- |
| **Master Blueprint** | Arsitektur induk, Triad Engine, dan integrasi 10 Fitur Utama | [ARCHITECTURE.md](file:///workspaces/Zeltra-Finance/ARCHITECTURE.md) |
| **Produk & Roadmap** | Spesifikasi lengkap 150 kalkulator finansial dalam 10 kategori pasar Indonesia | [docs/produk.md](file:///workspaces/Zeltra-Finance/docs/produk.md) |
| **Mesin Komputasi** | Spesifikasi matematika presisi Rust, DAG reactive pipeline, dan Wasm buffer | [docs/engine.md](file:///workspaces/Zeltra-Finance/docs/engine.md) |
| **Frontend & UI/UX** | Next.js 15+ SSG, Universal Declarative Renderer, dan Obsidian-Mint design tokens | [docs/uiux.md](file:///workspaces/Zeltra-Finance/docs/uiux.md) |
| **Distribusi SEO & GEO** | Programmatic SEO, Google Featured Snippets #0, dan optimasi AI LLM 2026 | [docs/seo.md](file:///workspaces/Zeltra-Finance/docs/seo.md) |
| **Governance & Rules** | Standar persona dan pembatasan arsitektur agen AI | [GEMINI.md](file:///workspaces/Zeltra-Finance/GEMINI.md) / [AGENTS.md](file:///workspaces/Zeltra-Finance/AGENTS.md) |

---

## Struktur Repositori (Monorepo)

```
zeltra-finance/
├── apps/
│   └── web/                   # Next.js 15+ App Router (SSG Export)
├── packages/
│   ├── engine-wasm/           # Rust Wasm Crate (Precision Math Core)
│   └── shared-contracts/      # TypeScript Interfaces & DAG Contracts
├── docs/                      # Dokumentasi Spesifikasi Resmi
│   ├── produk.md              # 150 Kalkulator Finansial
│   ├── engine.md              # Spesifikasi Rust Wasm
│   ├── uiux.md                # Spesifikasi UI/UX & Next.js
│   └── seo.md                 # Spesifikasi SEO & GEO
├── ARCHITECTURE.md            # Master System Architecture Blueprint
├── GEMINI.md                  # Kontrak Governance AI Assistant
├── AGENTS.md                  # Universal Multi-Agent Governance
├── README.md                  # Overview Proyek
└── .gitignore                 # Proteksi Kredensial & Build Artifacts
```