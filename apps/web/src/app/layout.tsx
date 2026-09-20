import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: {
    template: '%s | Zeltra Finance',
    default: 'Zeltra Finance - 150 Kalkulator Finansial Presisi Tinggi Indonesia',
  },
  description:
    'Platform komputasi finansial terintegrasi 150 kalkulator untuk perhitungan KPR, PPh 21 TER, investasi obligasi, amortisasi pinjaman, dan perencanaan pensiun berbasis WebAssembly presisi tinggi.',
  metadataBase: new URL('https://zeltra.id'),
  keywords: [
    'kalkulator finansial',
    'simulasi kpr bca',
    'kalkulator pph 21 ter',
    'amortisasi pinjaman',
    'perhitungan bunga anuitas',
    'zeltra finance',
  ],
  authors: [{ name: 'Zeltra Finance Engineering' }],
  creator: 'Zeltra Finance',
  publisher: 'Zeltra Finance',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body style={{ backgroundColor: 'var(--bg-obsidian)', color: 'var(--text-primary)', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <header
          style={{
            borderBottom: '1px solid var(--border-subtle)',
            backgroundColor: 'rgba(11, 15, 23, 0.85)',
            backdropFilter: 'blur(12px)',
            position: 'sticky',
            top: 0,
            zIndex: 50,
          }}
        >
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              padding: '16px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <a
              href="/"
              style={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  background: 'linear-gradient(135deg, #10B981, #06B6D4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 800,
                  fontSize: '18px',
                  color: '#0B0F17',
                }}
              >
                Z
              </div>
              <div>
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 800,
                    letterSpacing: '-0.03em',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  ZELTRA
                </span>
                <span
                  style={{
                    fontSize: '18px',
                    fontWeight: 400,
                    color: 'var(--emerald-mint)',
                    marginLeft: '4px',
                    fontFamily: 'var(--font-display)',
                  }}
                >
                  FINANCE
                </span>
              </div>
            </a>

            <nav style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
              <a
                href="/properti/kpr-bank-bca"
                style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                  transition: 'color 0.2s',
                }}
              >
                KPR & Properti
              </a>
              <a
                href="/pajak/pph-21-ter-2026"
                style={{
                  color: 'var(--text-secondary)',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: 500,
                  transition: 'color 0.2s',
                }}
              >
                Pajak TER 2024
              </a>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  backgroundColor: 'rgba(16, 185, 129, 0.1)',
                  color: 'var(--emerald-mint)',
                  fontSize: '12px',
                  fontWeight: 600,
                  border: '1px solid rgba(16, 185, 129, 0.25)',
                }}
              >
                Rust Wasm Core
              </span>
            </nav>
          </div>
        </header>

        <main style={{ flex: 1 }}>{children}</main>

        <footer
          style={{
            borderTop: '1px solid var(--border-subtle)',
            backgroundColor: 'var(--bg-obsidian-deep)',
            padding: '48px 24px 32px',
            marginTop: '80px',
          }}
        >
          <div
            style={{
              maxWidth: '1200px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '40px',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}>
                <span style={{ fontWeight: 800, fontSize: '16px', color: 'var(--text-primary)' }}>
                  ZELTRA FINANCE
                </span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Infrastruktur komputasi finansial presisi tetap (Fixed-Point Arithmetic) berbasis WebAssembly. Bebas galat floating-point JavaScript untuk simulasi perbankan dan perpajakan Indonesia.
              </p>
            </div>

            <div>
              <h4 style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '16px' }}>
                Pilar Kalkulator
              </h4>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: '13px', lineHeight: '2' }}>
                <li>
                  <a href="/properti/kpr-bank-bca" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                    KPR BCA & Mandiri
                  </a>
                </li>
                <li>
                  <a href="/pajak/pph-21-ter-2026" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                    Pajak PPh 21 TER 2026
                  </a>
                </li>
                <li>
                  <a href="/investasi/compound-interest" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                    Compound Interest & FIRE
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: '14px', color: 'var(--text-primary)', marginBottom: '16px' }}>
                Kepatuhan & Disclaimer
              </h4>
              <p style={{ fontSize: '12px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                Kalkulasi finansial ditujukan untuk simulasi analitis dan proyeksi edukatif. Keputusan kredit resmi dan besaran bunga definitif tunduk pada kontrak masing-masing lembaga perbankan atau ketetapan Direktorat Jenderal Pajak RI.
              </p>
            </div>
          </div>

          <div
            style={{
              maxWidth: '1200px',
              margin: '32px auto 0',
              paddingTop: '24px',
              borderTop: '1px solid var(--border-subtle)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: '12px',
              color: 'var(--text-muted)',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <span>&copy; {new Date().getFullYear()} Zeltra Finance. Seluruh hak cipta dilindungi.</span>
            <span>Zero-Server Static Export | 60 FPS WebAssembly Engine</span>
          </div>
        </footer>
      </body>
    </html>
  );
}
