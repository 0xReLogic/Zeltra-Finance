'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ExtendedCalculatorSchema } from '../schemas/kpr-bank-bca';
import {
  AmortizationRow,
  LoanCalculationResult,
  GeneralLoanCalculationResult,
  PropertyTitleTransferResult,
  BphtbCalculationResult,
} from '@zeltra/shared-contracts';

interface Props {
  schema: ExtendedCalculatorSchema;
}

interface WasmEngineApi {
  calculate_kpr_annuity: (p: string, r: string, t: number) => string;
  calculate_kpr_general: (p: string, dp: string, r: string, t: number, m: string) => string;
  calculate_property_title_transfer?: (v: string) => string;
  calculate_bphtb?: (p: string, n: string, r: string) => string;
  get_engine_version: () => string;
}

export function UniversalCalculatorView({ schema }: Props) {
  const [wasmEngine, setWasmEngine] = useState<WasmEngineApi | null>(null);

  const isGeneralKpr = schema.engineFunction === 'calculate_kpr_general';
  const isTitleTransfer = schema.engineFunction === 'calculate_property_title_transfer';
  const isBphtb = schema.engineFunction === 'calculate_bphtb';
  const isStatutory = isTitleTransfer || isBphtb;

  // State for General KPR / Title Transfer / BPHTB (Property Value / NPOP)
  const [propertyPrice, setPropertyPrice] = useState<number>(750000000);
  const [dpPercent, setDpPercent] = useState<number>(20);
  const [calculationType, setCalculationType] = useState<string>('annuity');

  // State for BPHTB
  const [npoptkpAmount, setNpoptkpAmount] = useState<number>(80000000);
  const [bphtbRate, setBphtbRate] = useState<number>(5.0);

  // State for Direct Loan
  const [principalDirect, setPrincipalDirect] = useState<number>(500000000);

  // Common State
  const [annualRate, setAnnualRate] = useState<number>(7.0);
  const [tenorYears, setTenorYears] = useState<number>(15);

  // Results
  const [annuityResult, setAnnuityResult] = useState<LoanCalculationResult | null>(null);
  const [generalResult, setGeneralResult] = useState<GeneralLoanCalculationResult | null>(null);
  const [titleTransferResult, setTitleTransferResult] = useState<PropertyTitleTransferResult | null>(null);
  const [bphtbResult, setBphtbResult] = useState<BphtbCalculationResult | null>(null);

  const [copiedLink, setCopiedLink] = useState<boolean>(false);
  const [showSchedule, setShowSchedule] = useState<boolean>(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Load Wasm Module dynamically on client
  useEffect(() => {
    let isMounted = true;
    async function loadEngine() {
      try {
        const wasmModule = (await import('engine-wasm')) as unknown as {
          default: () => Promise<unknown>;
          calculate_kpr_annuity: (p: string, r: string, t: number) => string;
          calculate_kpr_general: (p: string, dp: string, r: string, t: number, m: string) => string;
          calculate_property_title_transfer?: (v: string) => string;
          calculate_bphtb?: (p: string, n: string, r: string) => string;
          get_engine_version: () => string;
        };
        await wasmModule.default();
        if (isMounted) {
          setWasmEngine({
            calculate_kpr_annuity: wasmModule.calculate_kpr_annuity,
            calculate_kpr_general: wasmModule.calculate_kpr_general,
            calculate_property_title_transfer: wasmModule.calculate_property_title_transfer,
            calculate_bphtb: wasmModule.calculate_bphtb,
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

  // Compute Calculation via Rust Wasm
  useEffect(() => {
    if (!wasmEngine) return;

    try {
      if (isBphtb) {
        if (wasmEngine.calculate_bphtb) {
          const rawJson = wasmEngine.calculate_bphtb(
            propertyPrice.toString(),
            npoptkpAmount.toString(),
            bphtbRate.toFixed(2)
          );
          const parsed: BphtbCalculationResult = JSON.parse(rawJson);
          setBphtbResult(parsed);
        }
      } else if (isTitleTransfer) {
        if (wasmEngine.calculate_property_title_transfer) {
          const rawJson = wasmEngine.calculate_property_title_transfer(propertyPrice.toString());
          const parsed: PropertyTitleTransferResult = JSON.parse(rawJson);
          setTitleTransferResult(parsed);
        }
      } else if (isGeneralKpr) {
        const tenorMonths = tenorYears * 12;
        const dpAmount = Math.round((propertyPrice * dpPercent) / 100);
        const rawJson = wasmEngine.calculate_kpr_general(
          propertyPrice.toString(),
          dpAmount.toString(),
          annualRate.toFixed(2),
          tenorMonths,
          calculationType
        );
        const parsed: GeneralLoanCalculationResult = JSON.parse(rawJson);
        setGeneralResult(parsed);
      } else {
        const tenorMonths = tenorYears * 12;
        const rawJson = wasmEngine.calculate_kpr_annuity(
          principalDirect.toString(),
          annualRate.toFixed(2),
          tenorMonths
        );
        const parsed: LoanCalculationResult = JSON.parse(rawJson);
        setAnnuityResult(parsed);
      }
    } catch (err) {
      console.error('Calculation error:', err);
    }
  }, [
    wasmEngine,
    isBphtb,
    isTitleTransfer,
    isGeneralKpr,
    propertyPrice,
    npoptkpAmount,
    bphtbRate,
    dpPercent,
    calculationType,
    principalDirect,
    annualRate,
    tenorYears,
  ]);



  const activeSchedule: AmortizationRow[] = isGeneralKpr
    ? generalResult?.schedule || []
    : annuityResult?.schedule || [];

  const effectivePrincipal: number = isGeneralKpr
    ? propertyPrice - Math.round((propertyPrice * dpPercent) / 100)
    : principalDirect;

  // Render Amortization Canvas Chart (60 FPS Direct Native Canvas)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || activeSchedule.length === 0) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, width, height);

    const padding = { top: 20, right: 20, bottom: 30, left: 60 };
    const chartW = width - padding.left - padding.right;
    const chartH = height - padding.top - padding.bottom;

    const maxPrincipal = effectivePrincipal;
    const totalMonths = activeSchedule.length;

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

    activeSchedule.forEach((row: AmortizationRow) => {
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
    activeSchedule.forEach((row: AmortizationRow, idx: number) => {
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
    for (let yr = 0; yr <= tenorYears; yr += Math.max(1, Math.ceil(tenorYears / 5))) {
      const x = padding.left + (yr / tenorYears) * chartW;
      ctx.fillText(`Thn ${yr}`, x, height - 10);
    }
  }, [activeSchedule, effectivePrincipal, tenorYears]);

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

  const currentDpAmount = Math.round((propertyPrice * dpPercent) / 100);

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
            <h2 style={{ fontSize: '18px', fontWeight: 700 }}>
              {isBphtb
                ? 'Parameter Pajak BPHTB'
                : isTitleTransfer
                ? 'Nilai Transaksi Properti'
                : 'Parameter Pinjaman'}
            </h2>
            <span className="zeltra-badge zeltra-badge-mint">Wasm Powered</span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            {isBphtb ? (
              /* BPHTB Inputs */
              <>
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      Nilai Transaksi / NJOP (NPOP)
                    </label>
                    <span className="tabular-nums" style={{ fontSize: '15px', fontWeight: 700, color: 'var(--emerald-mint)' }}>
                      {formatRupiah(propertyPrice)}
                    </span>
                  </div>
                  <input
                    type="range"
                    className="zeltra-slider"
                    min={50000000}
                    max={5000000000}
                    step={25000000}
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  />
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
                    {[350000000, 600000000, 800000000, 1200000000, 2000000000].map((p) => (
                      <button
                        key={p}
                        type="button"
                        className={`zeltra-chip ${propertyPrice === p ? 'active' : ''}`}
                        onClick={() => setPropertyPrice(p)}
                      >
                        {formatShortRupiah(p)}
                      </button>
                    ))}
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
                    Gunakan nilai tertinggi antara harga transaksi riil pada AJB atau NJOP PBB-P2.
                  </p>
                </div>

                <div>
                  <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                    Jenis Perolehan Hak & Batas NPOPTKP
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                    {[
                      { id: 80000000, label: 'Jual Beli / Hibah', desc: 'Bebas Pajak Rp 80 Jt' },
                      { id: 300000000, label: 'Waris / Wasiat', desc: 'Bebas Pajak Rp 300 Jt' },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        type="button"
                        className={`zeltra-button-secondary ${npoptkpAmount === opt.id ? 'active' : ''}`}
                        style={{
                          padding: '10px 12px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'flex-start',
                          borderColor: npoptkpAmount === opt.id ? 'var(--emerald-mint)' : undefined,
                        }}
                        onClick={() => setNpoptkpAmount(opt.id)}
                      >
                        <span style={{ fontSize: '13px', fontWeight: 600, color: npoptkpAmount === opt.id ? 'var(--emerald-mint)' : 'var(--text-primary)' }}>
                          {opt.label}
                        </span>
                        <span style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '2px' }}>
                          {opt.desc}
                        </span>
                      </button>
                    ))}
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
                    Pasal 44 UU HKPD No. 1/2022: Ambang batas minimal nasional tidak kena pajak.
                  </p>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      Tarif BPHTB Daerah
                    </label>
                    <span className="tabular-nums" style={{ fontSize: '15px', fontWeight: 700, color: 'var(--cyan-electric)' }}>
                      {bphtbRate.toFixed(1)} %
                    </span>
                  </div>
                  <input
                    type="range"
                    className="zeltra-slider"
                    min={1.0}
                    max={5.0}
                    step={0.5}
                    value={bphtbRate}
                    onChange={(e) => setBphtbRate(Number(e.target.value))}
                  />
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
                    {[5.0, 3.0, 2.5].map((rate) => (
                      <button
                        key={rate}
                        type="button"
                        className={`zeltra-chip ${bphtbRate === rate ? 'active' : ''}`}
                        onClick={() => setBphtbRate(rate)}
                      >
                        {rate.toFixed(1)}% {rate === 5.0 ? '(Maksimal UU)' : ''}
                      </button>
                    ))}
                  </div>
                  <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
                    Pasal 45 UU HKPD No. 1/2022: Tarif ditetapkan paling tinggi 5% oleh Perda masing-masing daerah.
                  </p>
                </div>
              </>
            ) : isTitleTransfer ? (
              /* Title Transfer: Nilai Properti / Transaksi */
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Nilai Transaksi / NJOP Properti
                  </label>
                  <span className="tabular-nums" style={{ fontSize: '15px', fontWeight: 700, color: 'var(--emerald-mint)' }}>
                    {formatRupiah(propertyPrice)}
                  </span>
                </div>
                <input
                  type="range"
                  className="zeltra-slider"
                  min={100000000}
                  max={5000000000}
                  step={25000000}
                  value={propertyPrice}
                  onChange={(e) => setPropertyPrice(Number(e.target.value))}
                />
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
                  {[300000000, 500000000, 750000000, 1000000000, 2000000000].map((p) => (
                    <button
                      key={p}
                      type="button"
                      className={`zeltra-chip ${propertyPrice === p ? 'active' : ''}`}
                      onClick={() => setPropertyPrice(p)}
                    >
                      {formatShortRupiah(p)}
                    </button>
                  ))}
                </div>
                <p style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '8px' }}>
                  Dasar pengenaan PNBP BPN (PP 128/2015) dan jasa batas maksimal PPAT (Permen ATR/BPN 33/2021).
                </p>
              </div>
            ) : isGeneralKpr ? (
              <>
                {/* General Input 1: Harga Properti */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      Harga Rumah / Properti
                    </label>
                    <span className="tabular-nums" style={{ fontSize: '15px', fontWeight: 700, color: 'var(--emerald-mint)' }}>
                      {formatRupiah(propertyPrice)}
                    </span>
                  </div>
                  <input
                    type="range"
                    className="zeltra-slider"
                    min={100000000}
                    max={5000000000}
                    step={25000000}
                    value={propertyPrice}
                    onChange={(e) => setPropertyPrice(Number(e.target.value))}
                  />
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
                    {[350000000, 500000000, 625000000, 850000000, 1200000000].map((p) => (
                      <button
                        key={p}
                        type="button"
                        className={`zeltra-chip ${propertyPrice === p ? 'active' : ''}`}
                        onClick={() => setPropertyPrice(p)}
                      >
                        {formatShortRupiah(p)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* General Input 2: Uang Muka (DP) */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      Uang Muka / Down Payment ({dpPercent}%)
                    </label>
                    <span className="tabular-nums" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                      {formatRupiah(currentDpAmount)}
                    </span>
                  </div>
                  <input
                    type="range"
                    className="zeltra-slider"
                    min={0}
                    max={50}
                    step={5}
                    value={dpPercent}
                    onChange={(e) => setDpPercent(Number(e.target.value))}
                  />
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
                    {[0, 5, 10, 15, 20, 30].map((dp) => (
                      <button
                        key={dp}
                        type="button"
                        className={`zeltra-chip ${dpPercent === dp ? 'active' : ''}`}
                        onClick={() => setDpPercent(dp)}
                      >
                        {dp}%
                      </button>
                    ))}
                  </div>
                </div>

                {/* General Input 3: Metode Perhitungan */}
                <div>
                  <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', display: 'block', marginBottom: '8px' }}>
                    Metode Perhitungan Angsuran
                  </label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
                    {[
                      { id: 'annuity', label: 'Anuitas' },
                      { id: 'effective', label: 'Efektif' },
                      { id: 'flat', label: 'Flat' },
                    ].map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        className={`zeltra-button-secondary ${calculationType === m.id ? 'active' : ''}`}
                        style={{
                          padding: '8px 12px',
                          fontSize: '13px',
                          borderColor: calculationType === m.id ? 'var(--emerald-mint)' : undefined,
                          color: calculationType === m.id ? 'var(--emerald-mint)' : undefined,
                        }}
                        onClick={() => setCalculationType(m.id)}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>
                </div>
              </>
            ) : (
              /* Direct Loan Plafon */
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                    Plafon Pinjaman Pokok
                  </label>
                  <span className="tabular-nums" style={{ fontSize: '15px', fontWeight: 700, color: 'var(--emerald-mint)' }}>
                    {formatRupiah(principalDirect)}
                  </span>
                </div>
                <input
                  type="range"
                  className="zeltra-slider"
                  min={50000000}
                  max={5000000000}
                  step={25000000}
                  value={principalDirect}
                  onChange={(e) => setPrincipalDirect(Number(e.target.value))}
                />
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '6px' }}>
                  {[250000000, 500000000, 750000000, 1000000000, 1500000000].map((preset) => (
                    <button
                      key={preset}
                      type="button"
                      className={`zeltra-chip ${principalDirect === preset ? 'active' : ''}`}
                      onClick={() => setPrincipalDirect(preset)}
                    >
                      {formatShortRupiah(preset)}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {!isStatutory && (
              <>
                {/* Suku Bunga Pinjaman */}
                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                    <label style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      Suku Bunga (% / Tahun)
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

                {/* Tenor Pinjaman */}
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
              </>
            )}
          </div>
        </div>

        {/* Right Card: Calculation Summary & Live Result */}
        <div className="zeltra-card zeltra-card-glow-mint" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '13px', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>
                {isBphtb
                  ? 'Estimasi Pajak Pembeli BPHTB Terutang'
                  : isTitleTransfer
                  ? 'Estimasi Total Biaya Balik Nama (BBN)'
                  : isGeneralKpr && calculationType === 'effective'
                  ? 'Angsuran Bulan Pertama'
                  : 'Estimasi Angsuran Bulanan'}
              </span>
              <span className="zeltra-badge zeltra-badge-mint">
                {isBphtb ? 'UU HKPD 1/2022' : isTitleTransfer ? 'PP 128/2015 BPN' : 'Fixed-Point Math'}
              </span>
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
                {isBphtb
                  ? bphtbResult
                    ? formatRupiah(bphtbResult.bphtb_due)
                    : 'Memuat Engine...'
                  : isTitleTransfer
                  ? titleTransferResult
                    ? formatRupiah(titleTransferResult.total_title_transfer_cost)
                    : 'Memuat Engine...'
                  : isGeneralKpr
                  ? generalResult
                    ? formatRupiah(generalResult.first_month_installment)
                    : 'Memuat Engine...'
                  : annuityResult
                  ? formatRupiah(annuityResult.monthly_installment)
                  : 'Memuat Engine...'}
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '4px' }}>
                {isBphtb
                  ? 'Pajak daerah resmi yang wajib disetor ke kas daerah sebelum penandatanganan Akta Jual Beli (AJB).'
                  : isTitleTransfer
                  ? 'Estimasi resmi PNBP kantor BPN dan honorarium PPAT sesuai regulasi Menteri ATR/BPN.'
                  : isGeneralKpr && calculationType === 'effective'
                  ? `Angsuran menurun hingga ${generalResult ? formatRupiah(generalResult.last_month_installment) : '-'} pada bulan terakhir.`
                  : 'Perhitungan presisi fixed-point tanpa galat pembulatan JavaScript.'}
              </p>
            </div>

            {/* Detailed Financial Breakdown */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '16px',
                paddingTop: '20px',
                borderTop: '1px solid var(--border-subtle)',
              }}
            >
              {isBphtb && bphtbResult ? (
                <>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                      Nilai Transaksi (NPOP)
                    </span>
                    <span className="tabular-nums" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {formatRupiah(bphtbResult.property_value)}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                      Batas Bebas Pajak (NPOPTKP)
                    </span>
                    <span className="tabular-nums" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--cyan-electric)' }}>
                      {formatRupiah(bphtbResult.npoptkp)}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                      NPOP Kena Pajak
                    </span>
                    <span className="tabular-nums" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {formatRupiah(bphtbResult.taxable_value)}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                      Tarif BPHTB Terpilih
                    </span>
                    <span className="tabular-nums" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--emerald-mint)' }}>
                      {bphtbResult.tax_rate_percent}
                    </span>
                  </div>
                </>
              ) : isTitleTransfer && titleTransferResult ? (
                <>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                      PNBP BPN (PP 128/2015)
                    </span>
                    <span className="tabular-nums" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {formatRupiah(titleTransferResult.bpn_pnbp_fee)}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                      Pengecekan Sertifikat BPN
                    </span>
                    <span className="tabular-nums" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {formatRupiah(titleTransferResult.bpn_check_fee)}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                      Honorarium Jasa PPAT ({titleTransferResult.ppat_rate_percent})
                    </span>
                    <span className="tabular-nums" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--cyan-electric)' }}>
                      {formatRupiah(titleTransferResult.ppat_fee)}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                      Validasi & Administrasi
                    </span>
                    <span className="tabular-nums" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {formatRupiah(titleTransferResult.admin_validation_fee)}
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                      Plafon Pinjaman Pokok
                    </span>
                    <span className="tabular-nums" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {formatRupiah(effectivePrincipal)}
                    </span>
                  </div>
                  <div>
                    <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                      Total Akumulasi Bunga
                    </span>
                    <span className="tabular-nums" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--crimson-coral)' }}>
                      {isGeneralKpr
                        ? generalResult
                          ? formatRupiah(generalResult.total_interest_paid)
                          : '-'
                        : annuityResult
                        ? formatRupiah(annuityResult.total_interest_paid)
                        : '-'}
                    </span>
                  </div>
                  {isGeneralKpr && generalResult && (
                    <>
                      <div>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                          Estimasi Biaya Akad Awal
                        </span>
                        <span className="tabular-nums" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--cyan-electric)' }}>
                          {formatRupiah(generalResult.total_upfront_cost)}
                        </span>
                      </div>
                      <div>
                        <span style={{ fontSize: '12px', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>
                          Syarat Gaji Bersih (DSR 30%)
                        </span>
                        <span className="tabular-nums" style={{ fontSize: '16px', fontWeight: 700, color: 'var(--emerald-mint)' }}>
                          {formatRupiah(generalResult.recommended_minimum_income)}
                        </span>
                      </div>
                    </>
                  )}
                </>
              )}
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
            {!isStatutory && (
              <button
                type="button"
                className="zeltra-button-secondary"
                style={{ flex: 1 }}
                onClick={() => setShowSchedule(!showSchedule)}
              >
                {showSchedule ? 'Tutup Jadwal' : 'Lihat Jadwal Amortisasi'}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Visualizer Card: 60 FPS Native Canvas Amortization Chart (Kredit/Pinjaman) */}
      {!isStatutory && (
        <div className="zeltra-card" style={{ padding: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h3 style={{ fontSize: '16px', fontWeight: 700 }}>Kurva Pelunasan Pokok Pinjaman (Amortisasi)</h3>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', marginTop: '2px' }}>
                Penurunan sisa saldo utang pokok selama {tenorYears} tahun masa tenor kredit.
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
      )}



      {/* Expandable Amortization Schedule Table */}
      {showSchedule && activeSchedule.length > 0 && (
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
                {activeSchedule.slice(0, 12).map((row: AmortizationRow) => (
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
