import React from 'react';

export default function HomePage() {
  const pillars = [
    {
      name: 'Kredit & Pembiayaan Konsumer',
      count: '25 Kalkulator',
      featured: 'KPR Bank BCA & Mandiri',
      href: '/properti/kpr-bank-bca',
      desc: 'Simulasi bunga anuitas, flat vs efektif, KPR syariah, take-over, dan pelunasan dipercepat.',
    },
    {
      name: 'Perpajakan & Regulasi RI',
      count: '20 Kalkulator',
      featured: 'PPh 21 TER Terbaru 2026',
      href: '/properti/kpr-bank-bca',
      desc: 'Pemotongan PPh 21 tarif efektif rata-rata (PP 58/2023), PPh final UMKM 0.5%, dan BPJS Ketenagakerjaan.',
    },
    {
      name: 'Investasi & Pasar Modal',
      count: '20 Kalkulator',
      featured: 'Yield Obligasi FR & SBN',
      href: '/properti/kpr-bank-bca',
      desc: 'Kupon obligasi negara, dividend yield saham, reksa dana, dan proyeksi bunga majemuk (compound interest).',
    },
    {
      name: 'Perencanaan Pensiun & FIRE',
      count: '15 Kalkulator',
      featured: 'Target Dana Pensiun & Rule 4%',
      href: '/properti/kpr-bank-bca',
      desc: 'Kalkulasi kebutuhan hidup pasca-pensiun, simulasi JHT & JP BPJAMSOSTEK, dan inflasi jangka panjang.',
    },
    {
      name: 'Keuangan Keluarga & Personal',
      count: '15 Kalkulator',
      featured: 'Budgeting 50/30/20 & Dana Darurat',
      href: '/properti/kpr-bank-bca',
      desc: 'Alokasi pengeluaran bulanan, target dana darurat keluarga, dan kalkulator inflasi biaya pendidikan anak.',
    },
    {
      name: 'Bisnis, UMKM & Marketplace',
      count: '15 Kalkulator',
      featured: 'Kalkulator Admin Marketplace E-Commerce',
      href: '/properti/kpr-bank-bca',
      desc: 'Perhitungan fee potongan Shopee, Tokopedia, TikTok Shop, titik impas (BEP), dan margin HPP produk.',
    },
  ];

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 24px 80px' }}>
      {/* Hero Section */}
      <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 56px' }}>
        <div style={{ display: 'inline-block', marginBottom: '16px' }}>
          <span className="zeltra-badge zeltra-badge-mint">
            WebAssembly Fixed-Point Precision Engine
          </span>
        </div>

        <h1
          style={{
            fontSize: '48px',
            lineHeight: '1.15',
            fontWeight: 800,
            letterSpacing: '-0.03em',
            marginBottom: '20px',
          }}
        >
          Infrastruktur Komputasi Finansial Terakurat di Indonesia
        </h1>

        <p
          style={{
            fontSize: '18px',
            color: 'var(--text-secondary)',
            lineHeight: '1.6',
            marginBottom: '36px',
          }}
        >
          150 kalkulator finansial bebas galat desimal JavaScript. Ditenagai mesin Rust WebAssembly untuk perbankan, perpajakan resmi DJP, investasi obligasi, dan transaksi bisnis digital.
        </p>

        {/* Omnibox / Spotlight Search Bar */}
        <div
          style={{
            background: 'var(--surface-card)',
            border: '1px solid var(--border-subtle)',
            borderRadius: '16px',
            padding: '12px 18px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            boxShadow: '0 10px 40px -10px rgba(0,0,0,0.5)',
          }}
        >
          <div style={{ color: 'var(--text-muted)', fontSize: '18px' }}>&loz;</div>
          <input
            type="text"
            placeholder="Cari kalkulator finansial (misal: KPR BCA, PPh 21 TER, Amortisasi, Tabungan Pensiun)..."
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text-primary)',
              width: '100%',
              fontSize: '15px',
            }}
          />
          <a
            href="/properti/kpr-bank-bca"
            className="zeltra-button-primary"
            style={{ padding: '8px 18px', fontSize: '13px', whiteSpace: 'nowrap', textDecoration: 'none' }}
          >
            Coba KPR BCA
          </a>
        </div>

        {/* Quick Chips */}
        <div
          style={{
            display: 'flex',
            gap: '10px',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginTop: '20px',
          }}
        >
          <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Paling Sering Dicari:</span>
          <a href="/properti/kpr-bank-bca" className="zeltra-chip" style={{ textDecoration: 'none' }}>
            KPR Bank BCA
          </a>
          <a href="/properti/kpr-bank-bca" className="zeltra-chip" style={{ textDecoration: 'none' }}>
            Simulasi Mandiri Anuitas
          </a>
          <a href="/properti/kpr-bank-bca" className="zeltra-chip" style={{ textDecoration: 'none' }}>
            Pajak PPh 21 TER
          </a>
          <a href="/properti/kpr-bank-bca" className="zeltra-chip" style={{ textDecoration: 'none' }}>
            Compound Interest FIRE
          </a>
        </div>
      </div>

      {/* Engineering Value Proposition Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: '20px',
          marginBottom: '64px',
        }}
      >
        <div className="zeltra-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--emerald-mint)', marginBottom: '4px' }}>
            0% Rounding Error
          </div>
          <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>Fixed-Point Arithmetic</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            Menggunakan rust_decimal murni tanpa floating-point JavaScript yang rawan presisi pada transaksi moneter.
          </p>
        </div>

        <div className="zeltra-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--cyan-electric)', marginBottom: '4px' }}>
            60 FPS Direct Canvas
          </div>
          <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>Zero-Lag Visualizer</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            Kurva amortisasi 360 bulan digambar langsung melalui HTML5 Canvas tanpa re-render DOM yang memicu stuttering.
          </p>
        </div>

        <div className="zeltra-card" style={{ padding: '24px' }}>
          <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
            Static Site Export
          </div>
          <h3 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '6px' }}>Edge Global CDN</h3>
          <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.5' }}>
            Seluruh 150 kalkulator di-generate secara statis. TTFB di bawah 40 milidetik dan dapat bekerja secara offline.
          </p>
        </div>
      </div>

      {/* 10 Pillars Financial Catalog */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '28px' }}>
          <div>
            <h2 style={{ fontSize: '28px', letterSpacing: '-0.02em', marginBottom: '8px' }}>
              Katalog 150 Kalkulator Finansial
            </h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
              Jelajahi kalkulator spesifik yang telah tervalidasi dengan regulasi dan standar perbankan nasional.
            </p>
          </div>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '24px',
          }}
        >
          {pillars.map((p, idx) => (
            <a
              key={idx}
              href={p.href}
              className="zeltra-card"
              style={{
                padding: '28px',
                textDecoration: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                  <span style={{ fontSize: '12px', color: 'var(--emerald-mint)', fontWeight: 600 }}>
                    {p.count}
                  </span>
                  <span className="zeltra-badge zeltra-badge-mint">Verified Math</span>
                </div>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '8px' }}>
                  {p.name}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6', marginBottom: '16px' }}>
                  {p.desc}
                </p>
              </div>

              <div
                style={{
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-subtle)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
                  Unggulan: <strong style={{ color: 'var(--text-primary)' }}>{p.featured}</strong>
                </span>
                <span style={{ color: 'var(--emerald-mint)', fontSize: '14px', fontWeight: 600 }}>
                  Buka &rarr;
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
