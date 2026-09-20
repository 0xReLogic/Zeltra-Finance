import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import {
  getCalculatorBySiloAndSlug,
  getAllStaticRoutes,
} from '../../../schemas';
import { UniversalCalculatorView } from '../../../components/UniversalCalculatorView';
import { DualJsonLdSchema } from '../../../components/DualJsonLdSchema';

interface PageProps {
  params: Promise<{
    silo: string;
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return getAllStaticRoutes();
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { silo, slug } = await params;
  const calculator = getCalculatorBySiloAndSlug(silo, slug);

  if (!calculator) {
    return {
      title: 'Kalkulator Tidak Ditemukan',
    };
  }

  const canonicalUrl = `https://zeltra.id/${silo}/${slug}/`;

  return {
    title: calculator.seo.title,
    description: calculator.seo.description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: calculator.seo.title,
      description: calculator.seo.description,
      url: canonicalUrl,
      siteName: 'Zeltra Finance',
      locale: 'id_ID',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: calculator.seo.title,
      description: calculator.seo.description,
    },
  };
}

export default async function CalculatorPage({ params }: PageProps) {
  const { silo, slug } = await params;
  const calculator = getCalculatorBySiloAndSlug(silo, slug);

  if (!calculator) {
    notFound();
  }

  const canonicalUrl = `https://zeltra.id/${silo}/${slug}/`;

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '32px 24px' }}>
      {/* Dual Schema JSON-LD Injection */}
      <DualJsonLdSchema schema={calculator} canonicalUrl={canonicalUrl} />

      {/* Breadcrumb Bar */}
      <nav
        aria-label="Breadcrumb"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '13px',
          color: 'var(--text-muted)',
          marginBottom: '20px',
        }}
      >
        <a href="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
          Beranda
        </a>
        <span>/</span>
        <span style={{ textTransform: 'capitalize', color: 'var(--text-secondary)' }}>
          {silo}
        </span>
        <span>/</span>
        <span style={{ color: 'var(--emerald-mint)', fontWeight: 500 }}>
          {calculator.name}
        </span>
      </nav>

      {/* The 30% First Fold Rule: Authoritative H1 + Direct Answer Snippet */}
      <div style={{ marginBottom: '32px' }}>
        <h1
          style={{
            fontSize: '32px',
            lineHeight: '1.25',
            marginBottom: '16px',
            letterSpacing: '-0.03em',
          }}
        >
          {calculator.seo.h1}
        </h1>

        <div
          style={{
            backgroundColor: 'rgba(19, 27, 42, 0.7)',
            borderLeft: '4px solid var(--emerald-mint)',
            borderRadius: '0 12px 12px 0',
            padding: '16px 20px',
            color: 'var(--text-secondary)',
            fontSize: '15px',
            lineHeight: '1.6',
            backdropFilter: 'blur(8px)',
          }}
        >
          <strong style={{ color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
            Ringkasan Cepat & Jawaban Definitif:
          </strong>
          {calculator.seo.directAnswerSnippet}
        </div>
      </div>

      {/* Interactive WebAssembly Engine Form & Visualizer */}
      <section style={{ marginBottom: '48px' }}>
        <UniversalCalculatorView schema={calculator} />
      </section>

      {/* Educational & Mathematical Grounding */}
      <section style={{ marginBottom: '48px' }}>
        <div className="zeltra-card" style={{ padding: '32px' }}>
          <h2 style={{ fontSize: '22px', marginBottom: '16px' }}>
            Dasar Matematis Formula Bunga Anuitas Perbankan
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '16px' }}>
            Metode bunga anuitas mengatur jumlah angsuran bulanan yang dibayarkan nasabah tetap sama setiap bulannya selama masa fixed bunga. Namun, komposisi pembayaran di dalamnya berubah setiap periode: porsi pembayaran bunga menurun seiring berkurangnya sisa utang pokok, sedangkan porsi pelunasan pokok bertambah secara bertahap.
          </p>
          <div
            style={{
              background: 'rgba(11, 15, 23, 0.7)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '8px',
              padding: '16px',
              fontFamily: 'monospace',
              fontSize: '14px',
              color: 'var(--emerald-mint)',
              marginBottom: '16px',
            }}
          >
            A = P &times; [ i(1 + i)^n ] / [ (1 + i)^n - 1 ]
          </div>
          <p style={{ color: 'var(--text-muted)', fontSize: '13px', lineHeight: '1.6' }}>
            Di mana <code>A</code> adalah angsuran bulanan, <code>P</code> adalah nilai pokok pinjaman (plafon), <code>i</code> adalah suku bunga per bulan (bunga tahunan dibagi 12), dan <code>n</code> adalah total jumlah bulan tenor pinjaman. Seluruh kalkulasi di Zeltra Finance dieksekusi menggunakan modul WebAssembly Rust Decimal untuk memastikan nol galat pembulatan desimal.
          </p>
        </div>
      </section>

      {/* Static Simulation Matrix Table (Google Featured Snippet Umpan #0) */}
      <section style={{ marginBottom: '48px' }}>
        <div className="zeltra-card" style={{ padding: '32px' }}>
          <h2 style={{ fontSize: '22px', marginBottom: '12px' }}>
            {calculator.seo.simulationTableData.caption}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '20px' }}>
            Tabel komparasi cepat estimasi cicilan per bulan untuk berbagai plafon kredit pembiayaan dengan acuan bunga promo tetap 7,00% efektif.
          </p>

          <div className="zeltra-table-container">
            <table className="zeltra-table">
              <thead>
                <tr>
                  {calculator.seo.simulationTableData.columns.map((col, idx) => (
                    <th key={idx}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {calculator.seo.simulationTableData.rows.map((row, rowIdx) => (
                  <tr key={rowIdx}>
                    {row.map((cell, cellIdx) => (
                      <td
                        key={cellIdx}
                        className="tabular-nums"
                        style={{
                          fontWeight: cellIdx === 0 ? 600 : 400,
                          color: cellIdx === 0 ? 'var(--text-primary)' : 'var(--text-secondary)',
                        }}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Structured FAQ Section */}
      <section style={{ marginBottom: '48px' }}>
        <div className="zeltra-card" style={{ padding: '32px' }}>
          <h2 style={{ fontSize: '22px', marginBottom: '24px' }}>
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {calculator.seo.faq.map((item, idx) => (
              <div
                key={idx}
                style={{
                  paddingBottom: '20px',
                  borderBottom:
                    idx === calculator.seo.faq.length - 1 ? 'none' : '1px solid var(--border-subtle)',
                }}
              >
                <h3 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '8px', color: 'var(--text-primary)' }}>
                  {item.question}
                </h3>
                <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                  {item.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Internal Linking Chaining: Recommended Next Calculations */}
      <section>
        <h2 style={{ fontSize: '20px', marginBottom: '16px' }}>Kalkulator Terkait yang Disarankan</h2>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '20px',
          }}
        >
          {calculator.seo.chainedCalculators.map((chain, idx) => (
            <div
              key={idx}
              className="zeltra-card"
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: '11px',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                    color: 'var(--emerald-mint)',
                    fontWeight: 600,
                  }}
                >
                  Langkah Finansial Berikutnya
                </span>
                <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '8px 0', color: 'var(--text-primary)' }}>
                  {chain.title}
                </h3>
                <p style={{ fontSize: '13px', color: 'var(--text-muted)', lineHeight: '1.6' }}>
                  {chain.description}
                </p>
              </div>
              <div style={{ marginTop: '20px' }}>
                <span
                  style={{
                    fontSize: '13px',
                    fontWeight: 600,
                    color: 'var(--emerald-mint)',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                  }}
                >
                  Buka Kalkulator &rarr;
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
