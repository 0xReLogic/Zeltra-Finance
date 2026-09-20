'use client';

import React, { useState, useEffect, useRef, useTransition } from 'react';
import { ExtendedCalculatorSchema } from '../schemas/kpr-bank-bca';
import { AmortizationRow, LoanCalculationResult } from '@zeltra/shared-contracts';

interface Props {
  schema: ExtendedCalculatorSchema;
}

export function UniversalCalculatorView({ schema }: Props) {
  const [wasmEngine, setWasmEngine] = useState<{
    calculate_kpr_annuity: (p: string, r: string, t: number) => string;
    get_engine_version: () => string;
  } | null>(null);

  // Form State
  const [principal, setPrincipal] = useState<number>(500000000);
  const [annualRate, setAnnualRate] = useState<number>(7.0);
  const [tenorYears, setTenorYears] = useState<number>(15);

  // Calculation Result
  const [result, setResult] = useState<LoanCalculationResult | null>(null);
  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [showSchedule, setShowSchedule] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Load Wasm Module dynamically on client
  useEffect(() => {
    let isMounted = true;
    async function loadEngine() {
      try {
        const wasmModule = await import('engine-wasm');
        await wasmModule.default();
        if (isMounted) {
          setWasmEngine({
            calculate_kpr_annuity: wasmModule.calculate_kpr_annuity,
            get_engine_version: wasmModule.get_engine_version,
          });
        }
      } catch (err) {
        console.error('Failed to initialize WebAssembly engine:', err);
      }
    }
    loadEngine();
    return () => {
      isMounted = false;
    };
  }, []);

  // Compute Calculation
  useEffect(() => {
    if (!wasmEngine) return;

    try {
      const tenorMonths = tenorYears * 12;
      const rawJson = wasmEngine.calculate_kpr_annuity(
        principal.toString(),
        annualRate.toFixed(2),
        tenorMonths
      );
      const parsed: LoanCalculationResult = JSON.parse(rawJson);
      setResult(parsed);
    } catch (err) {
      console.error('Calculation error:', err);
    }
  }, [wasmEngine, principal, annualRate, tenorYears]);

  // Render Amortization Canvas Chart (60 FPS Direct Native Canvas)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !result || !result.schedule || result.schedule.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    // Clear background
    ctx.clearRect(0, 0, width, height);

    const padding = { top: 20, right: 20, bottom: 30, left: 60 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const maxPrincipal = principal;
    const totalMonths = result.schedule.length;

    // Grid lines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= 4; i++) {
      const y = padding.top + (chartH / 4) * i;
      ctx.beginPath();
      ctx.moveTo(padding.left, y);
      ctx.lineTo(width - padding.right, y);
      ctx.stroke();

      const val = maxPrincipal * (1 - i / 4);
      ctx.fillStyle = '#64748B';
      ctx.font = '11px Inter, sans-serif';
      ctx.textAlign = 'right';
      ctx.fillText(formatShortRupiah(val), padding.left - 8, y + 4);
    }

    // Gradient fill under curve
    const gradient = ctx.createLinearGradient(0, padding.top, 0, height - padding.bottom);
    gradient.addColorStop(0, 'rgba(16, 185, 129, 0.25)');
    gradient.addColorStop(1, 'rgba(16, 185, 129, 0.00)');

    ctx.beginPath();
    ctx.moveTo(padding.left, height - padding.bottom);

    result.schedule.forEach((row: AmortizationRow) => {
      const x = padding.left + ((row.month - 1) / totalMonths) * chartW;
      const balance = parseFloat(row.remaining_balance);
      const y = padding.top + (1 - balance / maxPrincipal) * chartH;
      ctx.lineTo(x, y);
    });

    ctx.lineTo(padding.left + chartW, height - padding.bottom);
    ctx.closePath();
    ctx.fillStyle = gradient;
    ctx.fill();

    // Curve line
    ctx.beginPath();
    result.schedule.forEach((row: AmortizationRow, idx: number) => {
      const x = padding.left + ((row.month - 1) / totalMonths) * chartW;
      const balance = parseFloat(row.remaining_balance);
      const y = padding.top + (1 - balance / maxPrincipal) * chartH;
      if (idx === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    });

    ctx.strokeStyle = '#10B981';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // X-Axis labels
    ctx.fillStyle = '#64748B';
    ctx.textAlign = 'center';
    ctx.font = '11px Inter, sans-serif';
    for (let yr = 0; yr <= tenorYears; yr += Math.ceil(tenorYears / 5)) {
      const x = padding.left + (yr / tenorYears) * chartW;
      ctx.fillText(`Thn ${yr}`, x, height - 10);
    }
  }, [result, principal, tenorYears]);

  function formatRupiah(numStr: string | number): string {
    const n = typeof numStr === 'string' ? parseInt(numStr, 10) : numStr;
    if (isNaN(n)) return 'Rp 0';
    return 'Rp ' + n.toLocaleString('id-ID');
  }

  function formatShortRupiah(num: number): string {
    if (num >= 1000000000) return (num / 1000000000).toFixed(1) + 'M';
    if (num >= 1000000) return (num / 1000000).toFixed(0) + 'Jt';
    return num.toString();
  }

  function copyCurrentLink() {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
      {/* 2-Column Responsive Calculation Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px',
        }}
      >
        {/* Left Card: Input Parameter Form */}
        <div className="zeltra-card" style={{ padding: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
            <h2 style={{ fontSize: '18px', fontWeight: 700 }}>Parameter Pinjaman</h2>
            <span className="zeltra-badge zeltra-badge-mint">Wasm Powered</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {/* Input 1: Plafon Pinjaman */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Plafon Pinjaman Pokok
                </label>
                <span className="tabular-nums" style={{ fontSize: '15px', fontWeight: 700, color: 'var(--emerald-mint)' }}>
                  {formatRupiah(principal)}
                </span>
              </div>
              <input
                type="range"
                className="zeltra-slider"
                min={50000000}
                max={5000000000}
                step={25000000}
                value={principal}
                onChange={(e) => setPrincipal(Number(e.target.value))}
              />
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
                {[250000000, 500000000, 750000000, 1000000000, 1500000000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    className={`zeltra-chip ${principal === preset ? 'active' : ''}`}
                    onClick={() => setPrincipal(preset)}
                  >
                    {formatShortRupiah(preset)}
                  </button>
                ))}
              </div>
            </div>

            {/* Input 2: Suku Bunga Anuitas */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Suku Bunga Efektif (% / Tahun)
                </label>
                <span className="tabular-nums" style={{ fontSize: '15px', fontWeight: 700, color: 'var(--cyan-electric)' }}>
                  {annualRate.toFixed(2)} %
                </span>
              </div>
              <input
                type="range"
                className="zeltra-slider"
                min={2.0}
                max={15.0}
                step={0.1}
                value={annualRate}
                onChange={(e) => setAnnualRate(Number(e.target.value))}
              />
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
                {[4.5, 6.75, 7.0, 8.5, 10.0].map((rate) => (
                  <button
                    key={rate}
                    type="button"
                    className={`zeltra-chip ${annualRate === rate ? 'active' : ''}`}
                    onClick={() => setAnnualRate(rate)}
                  >
                    {rate.toFixed(2)}%
                  </button>
                ))}
              </div>
            </div>

            {/* Input 3: Tenor Pinjaman */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Tenor Pinjaman (Jangka Waktu)
                </label>
                <span className="tabular-nums" style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {tenorYears} Tahun ({tenorYears * 12} Bulan)
                </span>
              </div>
              <input
                type="range"
                className="zeltra-slider"
                min={1}
                max={30}
                step={1}
                value={tenorYears}
                onChange={(e) => setTenorYears(Number(e.target.value))}
              />
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
                {[5, 10, 15, 20, 25].map((t) => (
                  <button
                    key={t}
                    type="button"
                    className={`zeltra-chip ${tenorYears === t ? 'active' : ''}`}
                    onClick={() => setTenorYears(t)}
                  >
                    {t} Thn
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Card: Calculation Summary & Live Result */}
        <div className="zeltra-card zeltra-card-glow-mint" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                Estimasi Angsuran Bulanan
              </span>
              <span className="zeltra-badge zeltra-badge-mint">Anuitas Fixed-Point</span>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div
                className="tabular-nums"
                style={{
                  fontSize: '38px',
                  fontWeight: 800,
                  fontFamily: 'var(--font-display)',
                  color: 'var(--emerald-mint)',
                  letterSpacing: '-0.02em',
                }}
              >
                {result ? formatRupiah(result.monthly_installment) : 'Memuat Engine...'}
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                Perhitungan anuitas presisi dengan pembulatan Half-Up Rounding standar perbankan.
              </p>
            </div>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                paddingTop: '20px',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Total Akumulasi Bunga
                </span>
                <span className="tabular-nums" style={{ fontSize: '17px', fontWeight: 700, color: 'var(--crimson-coral)' }}>
                  {result ? formatRupiah(result.total_interest_paid) : '-'}
                </span>
              </div>
              <div>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                  Total Pengembalian
                </span>
                <span className="tabular-nums" style={{ fontSize: '17px', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {result ? formatRupiah(result.total_payment) : '-'}
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px', marginTop: '28px', flexWrap: 'wrap' }}>
            <button
              type="button"
              className="zeltra-button-secondary"
              style={{ flex: 1 }}
              onClick={copyCurrentLink}
            >
              {copiedLink ? 'Link Tersalin' : 'Bagikan Simulasi'}
            </button>
            <button
              type="button"
              className="zeltra-button-secondary"
              style={{ flex: 1 }}
              onClick={() => setShowSchedule(!showSchedule)}
            >
              {showSchedule ? 'Tutup Jadwal' : 'Lihat Jadwal Amortisasi'}
            </button>
          </div>
        </div>
      </div>

      {/* Visualizer Card: 60 FPS Native Canvas Amortization Chart */}
      <div className="zeltra-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div>
            <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Kurva Pelunasan Pokok Pinjaman (Amortisasi)</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
              Penurunan saldo utang pokok selama {tenorYears} tahun masa tenor kredit.
            </p>
          </div>
          <span className="zeltra-badge zeltra-badge-mint">Direct 60 FPS Canvas</span>
        </div>
        <div style={{ width: '100%', height: '240px', position: 'relative' }}>
          <canvas
            ref={canvasRef}
            style={{ width: '100%', height: '100%', display: 'block' }}
          />
        </div>
      </div>

      {/* Expandable Amortization Schedule Table */}
      {showSchedule && result && result.schedule && (
        <div className="zeltra-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Rincian Amortisasi 12 Bulan Pertama</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)' }}>
                Pembagian porsi angsuran pokok dan bunga pinjaman di awal masa cicilan.
              </p>
            </div>
            <span className="zeltra-badge zeltra-badge-mint">Fixed-Point</span>
          </div>

          <div className="zeltra-table-container">
            <table className="zeltra-table">
              <thead>
                <tr>
                  <th>Bulan</th>
                  <th>Porsi Pokok</th>
                  <th>Porsi Bunga</th>
                  <th>Total Angsuran</th>
                  <th>Sisa Saldo Pinjaman</th>
                </tr>
              </thead>
              <tbody>
                {result.schedule.slice(0, 12).map((row: AmortizationRow) => (
                  <tr key={row.month}>
                    <td className="tabular-nums" style={{ fontWeight: 600 }}>Ke-{row.month}</td>
                    <td className="tabular-nums" style={{ color: 'var(--emerald-mint)' }}>
                      {formatRupiah(row.principal_payment)}
                    </td>
                    <td className="tabular-nums" style={{ color: 'var(--crimson-coral)' }}>
                      {formatRupiah(row.interest_payment)}
                    </td>
                    <td className="tabular-nums" style={{ fontWeight: 700 }}>
                      {formatRupiah(row.total_installment)}
                    </td>
                    <td className="tabular-nums" style={{ color: 'var(--text-secondary)' }}>
                      {formatRupiah(row.remaining_balance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
