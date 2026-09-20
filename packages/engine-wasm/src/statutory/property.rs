use super::types::{
    BphtbCalculationResult, HomeAffordabilityResult, KprNotaryFeeResult, PropertySellerTaxResult,
    PropertyTitleTransferResult, RentVsBuyResult,
};
use rust_decimal::Decimal;
use rust_decimal::MathematicalOps;
use rust_decimal_macros::dec;

/// Menghitung Kemampuan Beli Rumah / Plafon KPR Maksimal (Affordability Analysis)
/// Berdasarkan batasan Debt Service Ratio (DSR 30% - 40%) standar Bank Indonesia & OJK.
pub fn calculate_home_affordability_internal(
    monthly_income: Decimal,
    other_debts: Decimal,
    dsr_percent: Decimal,
    annual_rate_percent: Decimal,
    tenor_months: u32,
    down_payment_percent: Decimal,
) -> Result<HomeAffordabilityResult, String> {
    if monthly_income <= dec!(0) {
        return Err("Penghasilan bulanan harus lebih besar dari 0".to_string());
    }
    if other_debts < dec!(0) {
        return Err("Cicilan utang lain tidak boleh negatif".to_string());
    }
    if dsr_percent <= dec!(0) || dsr_percent > dec!(100) {
        return Err("DSR harus antara 1% dan 100%".to_string());
    }
    if annual_rate_percent < dec!(0) || annual_rate_percent > dec!(100) {
        return Err("Suku bunga harus antara 0% dan 100%".to_string());
    }
    if tenor_months == 0 {
        return Err("Tenor pinjaman minimal 1 bulan".to_string());
    }
    if down_payment_percent < dec!(0) || down_payment_percent >= dec!(100) {
        return Err("Uang muka harus antara 0% dan di bawah 100%".to_string());
    }

    // 1. Cicilan KPR Maksimal yang Diizinkan berdasarkan DSR
    let allowed_total_debt = (monthly_income * (dsr_percent / dec!(100))).round_dp_with_strategy(
        0,
        rust_decimal::RoundingStrategy::MidpointAwayFromZero,
    );
    let max_installment = if allowed_total_debt > other_debts {
        allowed_total_debt - other_debts
    } else {
        dec!(0)
    };

    // 2. Inversi Rumus Anuitas: P = A * [(1+i)^n - 1] / [i * (1+i)^n]
    let max_loan_principal = if max_installment == dec!(0) {
        dec!(0)
    } else {
        let monthly_rate = (annual_rate_percent / dec!(100)) / dec!(12);
        if monthly_rate == dec!(0) {
            max_installment * Decimal::from(tenor_months)
        } else {
            let one = dec!(1);
            let one_plus_i = one + monthly_rate;
            let n_dec = Decimal::from(tenor_months);
            let factor = one_plus_i.powd(n_dec);
            let numerator = factor - one;
            let denominator = monthly_rate * factor;
            (max_installment * (numerator / denominator)).round_dp_with_strategy(
                0,
                rust_decimal::RoundingStrategy::MidpointAwayFromZero,
            )
        }
    };

    // 3. Harga Properti Maksimal: H = P / (1 - DP%)
    let dp_fraction = down_payment_percent / dec!(100);
    let max_property_price = if dp_fraction < dec!(1) {
        (max_loan_principal / (dec!(1) - dp_fraction)).round_dp_with_strategy(
            0,
            rust_decimal::RoundingStrategy::MidpointAwayFromZero,
        )
    } else {
        max_loan_principal
    };
    let required_down_payment = max_property_price - max_loan_principal;

    Ok(HomeAffordabilityResult {
        monthly_income: monthly_income.to_string(),
        other_debts: other_debts.to_string(),
        dsr_percent: format!("{:.1}%", dsr_percent),
        max_monthly_installment: max_installment.to_string(),
        max_loan_principal: max_loan_principal.to_string(),
        down_payment_percent: format!("{:.1}%", down_payment_percent),
        required_down_payment: required_down_payment.to_string(),
        max_property_price: max_property_price.to_string(),
        annual_rate_percent: format!("{:.2}%", annual_rate_percent),
        tenor_months,
    })
}

/// Menghitung Analisis Finansial Sewa vs Beli Rumah (Rent vs Buy Analysis)
/// Menggunakan model akumulasi ekuitas properti vs biaya peluang investasi modal awal & selisih arus kas.
pub fn calculate_rent_vs_buy_internal(
    property_price: Decimal,
    down_payment_percent: Decimal,
    annual_kpr_rate_percent: Decimal,
    kpr_tenor_years: u32,
    initial_monthly_rent: Decimal,
    rent_inflation_percent: Decimal,
    property_appreciation_percent: Decimal,
    investment_return_percent: Decimal,
    analysis_period_years: u32,
) -> Result<RentVsBuyResult, String> {
    if property_price <= dec!(0) {
        return Err("Harga properti harus lebih besar dari 0".to_string());
    }
    if down_payment_percent < dec!(0) || down_payment_percent >= dec!(100) {
        return Err("Uang muka harus antara 0% dan di bawah 100%".to_string());
    }
    if kpr_tenor_years == 0 {
        return Err("Tenor KPR minimal 1 tahun".to_string());
    }
    if initial_monthly_rent < dec!(0) {
        return Err("Biaya sewa awal tidak boleh negatif".to_string());
    }
    if analysis_period_years == 0 || analysis_period_years > 50 {
        return Err("Periode analisis antara 1 dan 50 tahun".to_string());
    }

    // 1. Parameter Modal Awal Beli
    let dp_amount = (property_price * (down_payment_percent / dec!(100))).round_dp_with_strategy(
        0,
        rust_decimal::RoundingStrategy::MidpointAwayFromZero,
    );
    let initial_legal_cost = (property_price * dec!(0.05)).round_dp_with_strategy(
        0,
        rust_decimal::RoundingStrategy::MidpointAwayFromZero,
    );
    let total_buy_initial_cost = dp_amount + initial_legal_cost;
    let loan_principal = property_price - dp_amount;

    // 2. Cicilan Bulanan KPR (Anuitas)
    let tenor_months = kpr_tenor_years * 12;
    let monthly_kpr_rate = (annual_kpr_rate_percent / dec!(100)) / dec!(12);
    let monthly_kpr_installment = if loan_principal == dec!(0) {
        dec!(0)
    } else if monthly_kpr_rate == dec!(0) {
        (loan_principal / Decimal::from(tenor_months)).round_dp_with_strategy(
            0,
            rust_decimal::RoundingStrategy::MidpointAwayFromZero,
        )
    } else {
        let one = dec!(1);
        let factor = (one + monthly_kpr_rate).powd(Decimal::from(tenor_months));
        let num = loan_principal * monthly_kpr_rate * factor;
        let den = factor - one;
        (num / den).round_dp_with_strategy(0, rust_decimal::RoundingStrategy::MidpointAwayFromZero)
    };

    // 3. Simulasi Tahun demi Tahun untuk Menemukan Break-Even & Saldo Akhir
    let monthly_inv_rate = (investment_return_percent / dec!(100)) / dec!(12);
    let monthly_maintenance = (property_price * dec!(0.005) / dec!(12)).round_dp_with_strategy(
        0,
        rust_decimal::RoundingStrategy::MidpointAwayFromZero,
    );

    let mut remaining_loan = loan_principal;
    let mut rent_portfolio = total_buy_initial_cost;
    let mut current_monthly_rent = initial_monthly_rent;
    let mut break_even_year: Option<u32> = None;

    let mut final_buy_net_wealth = dec!(0);
    let mut final_property_value = property_price;

    for y in 1..=analysis_period_years {
        // Apresiasi nilai rumah tahunan
        let prop_growth_factor = dec!(1) + (property_appreciation_percent / dec!(100));
        final_property_value = (final_property_value * prop_growth_factor).round_dp_with_strategy(
            0,
            rust_decimal::RoundingStrategy::MidpointAwayFromZero,
        );

        // Kenaikan sewa tahunan
        if y > 1 {
            let rent_growth_factor = dec!(1) + (rent_inflation_percent / dec!(100));
            current_monthly_rent = (current_monthly_rent * rent_growth_factor).round_dp_with_strategy(
                0,
                rust_decimal::RoundingStrategy::MidpointAwayFromZero,
            );
        }

        // Simulasi 12 bulan dalam tahun y
        for _ in 1..=12 {
            let current_month_index = (y - 1) * 12;
            let buy_outflow = if current_month_index < tenor_months {
                let interest = (remaining_loan * monthly_kpr_rate).round_dp_with_strategy(
                    0,
                    rust_decimal::RoundingStrategy::MidpointAwayFromZero,
                );
                let principal_paid = monthly_kpr_installment - interest;
                if remaining_loan > principal_paid {
                    remaining_loan -= principal_paid;
                } else {
                    remaining_loan = dec!(0);
                }
                monthly_kpr_installment + monthly_maintenance
            } else {
                remaining_loan = dec!(0);
                monthly_maintenance
            };

            let rent_outflow = current_monthly_rent;
            let cashflow_diff = buy_outflow - rent_outflow;

            rent_portfolio = (rent_portfolio * (dec!(1) + monthly_inv_rate)) + cashflow_diff;
        }

        let current_buy_nw = final_property_value - remaining_loan;
        if current_buy_nw >= rent_portfolio && break_even_year.is_none() {
            break_even_year = Some(y);
        }

        if y == analysis_period_years {
            final_buy_net_wealth = current_buy_nw;
        }
    }

    let final_rent_portfolio = rent_portfolio.round_dp_with_strategy(
        0,
        rust_decimal::RoundingStrategy::MidpointAwayFromZero,
    );

    let (recommendation, net_difference) = if final_buy_net_wealth >= final_rent_portfolio {
        (
            "BELI_LEBIH_UNTUNG".to_string(),
            (final_buy_net_wealth - final_rent_portfolio).to_string(),
        )
    } else {
        (
            "SEWA_LEBIH_UNTUNG".to_string(),
            (final_rent_portfolio - final_buy_net_wealth).to_string(),
        )
    };

    Ok(RentVsBuyResult {
        property_price: property_price.to_string(),
        initial_monthly_rent: initial_monthly_rent.to_string(),
        analysis_period_years,
        total_buy_initial_cost: total_buy_initial_cost.to_string(),
        monthly_kpr_installment: monthly_kpr_installment.to_string(),
        buy_property_future_value: final_property_value.to_string(),
        buy_remaining_loan: remaining_loan.to_string(),
        buy_net_wealth: final_buy_net_wealth.to_string(),
        rent_investment_future_value: total_buy_initial_cost.to_string(),
        rent_cashflow_investment_value: "0".to_string(),
        rent_total_net_wealth: final_rent_portfolio.to_string(),
        net_difference,
        recommendation,
        break_even_year,
    })
}

/// Menghitung Rincian Biaya Notaris & PPAT Akad Kredit KPR
/// Berdasarkan Permen ATR/BPN No. 33/2021 (AJB), UUHT No. 4/1996 (APHT), dan PP No. 128/2015 (PNBP Hak Tanggungan).
pub fn calculate_kpr_notary_fee_internal(
    property_value: Decimal,
    loan_principal: Decimal,
) -> Result<KprNotaryFeeResult, String> {
    if property_value <= dec!(0) {
        return Err("Nilai properti/transaksi harus lebih besar dari 0".to_string());
    }
    if loan_principal <= dec!(0) {
        return Err("Plafon pinjaman KPR harus lebih besar dari 0".to_string());
    }
    if loan_principal > property_value {
        return Err("Plafon pinjaman KPR tidak boleh melebihi nilai transaksi properti".to_string());
    }

    // 1. Akta Jual Beli (AJB) PPAT (Permen ATR/BPN No. 33/2021)
    let (ajb_rate, ajb_rate_str) = if property_value <= dec!(500000000) {
        (dec!(0.0100), "1.00%")
    } else if property_value <= dec!(1000000000) {
        (dec!(0.0075), "0.75%")
    } else if property_value <= dec!(2500000000) {
        (dec!(0.0050), "0.50%")
    } else {
        (dec!(0.0025), "0.25%")
    };
    let ajb_fee = (property_value * ajb_rate).round_dp_with_strategy(
        0,
        rust_decimal::RoundingStrategy::MidpointAwayFromZero,
    );

    // 2. Akta Pemberian Hak Tanggungan (APHT) PPAT (0.50% dari plafon kredit)
    let apht_rate = dec!(0.0050);
    let apht_fee = (loan_principal * apht_rate).round_dp_with_strategy(
        0,
        rust_decimal::RoundingStrategy::MidpointAwayFromZero,
    );

    // 3. PNBP Hak Tanggungan BPN (Lampiran PP No. 128 Tahun 2015)
    let bpn_ht_fee = if loan_principal <= dec!(250000000) {
        dec!(50000)
    } else if loan_principal <= dec!(1000000000) {
        dec!(200000)
    } else if loan_principal <= dec!(10000000000) {
        dec!(2500000)
    } else {
        dec!(25000000)
    };

    // 4. Akta Perjanjian Kredit (PK) Notaris (0.25% dari plafon kredit, minimal Rp 500.000)
    let mut pk_fee = (loan_principal * dec!(0.0025)).round_dp_with_strategy(
        0,
        rust_decimal::RoundingStrategy::MidpointAwayFromZero,
    );
    if pk_fee < dec!(500000) {
        pk_fee = dec!(500000);
    }

    // 5. Pengecekan Sertifikat & Validasi BPN
    let cert_check_fee = dec!(100000);

    // 6. Administrasi & Validasi Berkas Notaris/PPAT
    let admin_fee = dec!(500000);

    let total_notary_fee = ajb_fee + apht_fee + bpn_ht_fee + pk_fee + cert_check_fee + admin_fee;

    Ok(KprNotaryFeeResult {
        property_value: property_value.to_string(),
        loan_principal: loan_principal.to_string(),
        ajb_fee: ajb_fee.to_string(),
        ajb_rate_percent: ajb_rate_str.to_string(),
        apht_fee: apht_fee.to_string(),
        apht_rate_percent: "0.50%".to_string(),
        bpn_ht_pnbp_fee: bpn_ht_fee.to_string(),
        credit_agreement_fee: pk_fee.to_string(),
        certificate_check_fee: cert_check_fee.to_string(),
        admin_validation_fee: admin_fee.to_string(),
        total_notary_fee: total_notary_fee.to_string(),
    })
}

/// Menghitung Pajak Penjual Properti (PPh Final Pengalihan Hak atas Tanah dan/atau Bangunan)
/// Berdasarkan Peraturan Pemerintah (PP) No. 34 Tahun 2016 jo. UU PPh Pasal 4 ayat (2).
pub fn calculate_property_seller_tax_internal(
    gross_value: Decimal,
    tax_rate_percent: Decimal,
) -> Result<PropertySellerTaxResult, String> {
    if gross_value < dec!(0) {
        return Err("Nilai bruto pengalihan tidak boleh negatif".to_string());
    }
    if tax_rate_percent < dec!(0) || tax_rate_percent > dec!(100) {
        return Err("Tarif PPh final harus antara 0% dan 100%".to_string());
    }

    let rate_fraction = tax_rate_percent / dec!(100);
    let pph_final = (gross_value * rate_fraction).round_dp_with_strategy(
        0,
        rust_decimal::RoundingStrategy::MidpointAwayFromZero,
    );
    let net_proceeds = gross_value - pph_final;

    Ok(PropertySellerTaxResult {
        gross_value: gross_value.to_string(),
        tax_rate_percent: format!("{:.2}%", tax_rate_percent),
        pph_final_amount: pph_final.to_string(),
        net_proceeds: net_proceeds.to_string(),
    })
}

/// Menghitung Pajak Pembeli Properti (BPHTB - Bea Perolehan Hak atas Tanah dan Bangunan)
/// Berdasarkan UU HKPD No. 1 Tahun 2022 Pasal 44 & 45.
pub fn calculate_bphtb_internal(
    property_value: Decimal,
    npoptkp: Decimal,
    tax_rate_percent: Decimal,
) -> Result<BphtbCalculationResult, String> {
    if property_value < dec!(0) {
        return Err("Nilai perolehan objek pajak (NPOP) tidak boleh negatif".to_string());
    }
    if npoptkp < dec!(0) {
        return Err("NPOPTKP tidak boleh negatif".to_string());
    }
    if tax_rate_percent < dec!(0) || tax_rate_percent > dec!(100) {
        return Err("Tarif BPHTB harus antara 0% dan 100%".to_string());
    }

    // NPOP Kena Pajak = max(0, NPOP - NPOPTKP)
    let taxable_value = if property_value > npoptkp {
        property_value - npoptkp
    } else {
        dec!(0)
    };

    let rate_fraction = tax_rate_percent / dec!(100);
    let bphtb_due = (taxable_value * rate_fraction).round_dp_with_strategy(
        0,
        rust_decimal::RoundingStrategy::MidpointAwayFromZero,
    );

    Ok(BphtbCalculationResult {
        property_value: property_value.to_string(),
        npoptkp: npoptkp.to_string(),
        taxable_value: taxable_value.to_string(),
        tax_rate_percent: format!("{:.2}%", tax_rate_percent),
        bphtb_due: bphtb_due.to_string(),
    })
}

/// Menghitung Biaya Balik Nama (BBN) Sertifikat Tanah/Rumah
/// Berdasarkan PP No. 128 Tahun 2015 dan Permen ATR/BPN No. 33 Tahun 2021.
pub fn calculate_property_title_transfer_internal(
    property_value: Decimal,
) -> Result<PropertyTitleTransferResult, String> {
    if property_value <= dec!(0) {
        return Err("Nilai properti/transaksi harus lebih besar dari 0".to_string());
    }

    // 1. PNBP BPN sesuai PP 128/2015: (Nilai Tanah / 1000)
    let bpn_pnbp = (property_value / dec!(1000)).round_dp_with_strategy(
        0,
        rust_decimal::RoundingStrategy::MidpointAwayFromZero,
    );
    let bpn_check = dec!(50000); // Biaya pengecekan keaslian sertifikat di BPN
    let total_bpn = bpn_pnbp + bpn_check;

    // 2. Jasa PPAT sesuai Permen ATR/BPN No. 33/2021 (Tiering Nilai Transaksi)
    let (ppat_rate, ppat_rate_str) = if property_value <= dec!(500000000) {
        (dec!(0.0100), "1.00%")
    } else if property_value <= dec!(1000000000) {
        (dec!(0.0075), "0.75%")
    } else if property_value <= dec!(2500000000) {
        (dec!(0.0050), "0.50%")
    } else {
        (dec!(0.0025), "0.25%")
    };

    let ppat_fee = (property_value * ppat_rate).round_dp_with_strategy(
        0,
        rust_decimal::RoundingStrategy::MidpointAwayFromZero,
    );

    let admin_validation = dec!(500000); // Biaya administrasi & validasi berkas PPAT
    let total_cost = total_bpn + ppat_fee + admin_validation;

    Ok(PropertyTitleTransferResult {
        property_value: property_value.to_string(),
        bpn_pnbp_fee: bpn_pnbp.to_string(),
        bpn_check_fee: bpn_check.to_string(),
        total_bpn_cost: total_bpn.to_string(),
        ppat_fee: ppat_fee.to_string(),
        ppat_rate_percent: ppat_rate_str.to_string(),
        admin_validation_fee: admin_validation.to_string(),
        total_title_transfer_cost: total_cost.to_string(),
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_golden_case_bphtb_regular_600m() {
        let property_value = dec!(600000000);
        let npoptkp = dec!(80000000);
        let rate = dec!(5.0);

        let res = calculate_bphtb_internal(property_value, npoptkp, rate).unwrap();
        assert_eq!(res.property_value, "600000000");
        assert_eq!(res.npoptkp, "80000000");
        assert_eq!(res.taxable_value, "520000000");
        assert_eq!(res.tax_rate_percent, "5.00%");
        assert_eq!(res.bphtb_due, "26000000");
    }

    #[test]
    fn test_golden_case_bphtb_inheritance_800m() {
        let property_value = dec!(800000000);
        let npoptkp = dec!(300000000);
        let rate = dec!(5.0);

        let res = calculate_bphtb_internal(property_value, npoptkp, rate).unwrap();
        assert_eq!(res.property_value, "800000000");
        assert_eq!(res.npoptkp, "300000000");
        assert_eq!(res.taxable_value, "500000000");
        assert_eq!(res.tax_rate_percent, "5.00%");
        assert_eq!(res.bphtb_due, "25000000");
    }

    #[test]
    fn test_golden_case_bphtb_below_threshold() {
        let property_value = dec!(75000000);
        let npoptkp = dec!(80000000);
        let rate = dec!(5.0);

        let res = calculate_bphtb_internal(property_value, npoptkp, rate).unwrap();
        assert_eq!(res.taxable_value, "0");
        assert_eq!(res.bphtb_due, "0");
    }

    #[test]
    fn test_golden_case_seller_tax_regular_800m() {
        let gross_value = dec!(800000000);
        let rate = dec!(2.5);

        let res = calculate_property_seller_tax_internal(gross_value, rate).unwrap();
        assert_eq!(res.gross_value, "800000000");
        assert_eq!(res.tax_rate_percent, "2.50%");
        assert_eq!(res.pph_final_amount, "20000000");
        assert_eq!(res.net_proceeds, "780000000");
    }

    #[test]
    fn test_golden_case_seller_tax_regular_1500m() {
        let gross_value = dec!(1500000000);
        let rate = dec!(2.5);

        let res = calculate_property_seller_tax_internal(gross_value, rate).unwrap();
        assert_eq!(res.gross_value, "1500000000");
        assert_eq!(res.tax_rate_percent, "2.50%");
        assert_eq!(res.pph_final_amount, "37500000");
        assert_eq!(res.net_proceeds, "1462500000");
    }

    #[test]
    fn test_golden_case_seller_tax_subsidi_185m() {
        let gross_value = dec!(185000000);
        let rate = dec!(1.0);

        let res = calculate_property_seller_tax_internal(gross_value, rate).unwrap();
        assert_eq!(res.gross_value, "185000000");
        assert_eq!(res.tax_rate_percent, "1.00%");
        assert_eq!(res.pph_final_amount, "1850000");
        assert_eq!(res.net_proceeds, "183150000");
    }

    #[test]
    fn test_golden_case_seller_tax_exempt() {
        let gross_value = dec!(50000000);
        let rate = dec!(0.0);

        let res = calculate_property_seller_tax_internal(gross_value, rate).unwrap();
        assert_eq!(res.pph_final_amount, "0");
        assert_eq!(res.net_proceeds, "50000000");
    }

    #[test]
    fn test_golden_case_kpr_notary_fee_regular_750m() {
        let property_value = dec!(750000000);
        let loan_principal = dec!(600000000);

        let res = calculate_kpr_notary_fee_internal(property_value, loan_principal).unwrap();
        assert_eq!(res.property_value, "750000000");
        assert_eq!(res.loan_principal, "600000000");
        assert_eq!(res.ajb_fee, "5625000"); // 0.75%
        assert_eq!(res.ajb_rate_percent, "0.75%");
        assert_eq!(res.apht_fee, "3000000"); // 0.50%
        assert_eq!(res.bpn_ht_pnbp_fee, "200000"); // tier 250m-1b
        assert_eq!(res.credit_agreement_fee, "1500000"); // 0.25%
        assert_eq!(res.certificate_check_fee, "100000");
        assert_eq!(res.admin_validation_fee, "500000");
        assert_eq!(res.total_notary_fee, "10925000");
    }

    #[test]
    fn test_golden_case_kpr_notary_fee_high_1500m() {
        let property_value = dec!(1500000000);
        let loan_principal = dec!(1200000000);

        let res = calculate_kpr_notary_fee_internal(property_value, loan_principal).unwrap();
        assert_eq!(res.ajb_fee, "7500000"); // 0.50%
        assert_eq!(res.apht_fee, "6000000"); // 0.50%
        assert_eq!(res.bpn_ht_pnbp_fee, "2500000"); // tier 1b-10b
        assert_eq!(res.credit_agreement_fee, "3000000"); // 0.25%
        assert_eq!(res.total_notary_fee, "19600000");
    }

    #[test]
    fn test_golden_case_kpr_notary_fee_starter_300m() {
        let property_value = dec!(300000000);
        let loan_principal = dec!(240000000);

        let res = calculate_kpr_notary_fee_internal(property_value, loan_principal).unwrap();
        assert_eq!(res.ajb_fee, "3000000"); // 1.00%
        assert_eq!(res.apht_fee, "1200000"); // 0.50%
        assert_eq!(res.bpn_ht_pnbp_fee, "50000"); // tier <= 250m
        assert_eq!(res.credit_agreement_fee, "600000"); // 0.25%
        assert_eq!(res.total_notary_fee, "5450000");
    }

    #[test]
    fn test_golden_case_title_transfer_750m() {
        let value = dec!(750000000);
        let res = calculate_property_title_transfer_internal(value).unwrap();

        assert_eq!(res.property_value, "750000000");
        assert_eq!(res.bpn_pnbp_fee, "750000");
        assert_eq!(res.bpn_check_fee, "50000");
        assert_eq!(res.total_bpn_cost, "800000");
        assert_eq!(res.ppat_fee, "5625000");
        assert_eq!(res.ppat_rate_percent, "0.75%");
        assert_eq!(res.admin_validation_fee, "500000");
        assert_eq!(res.total_title_transfer_cost, "6925000");
    }

    #[test]
    fn test_golden_case_title_transfer_400m() {
        let value = dec!(400000000);
        let res = calculate_property_title_transfer_internal(value).unwrap();

        assert_eq!(res.bpn_pnbp_fee, "400000");
        assert_eq!(res.ppat_fee, "4000000"); // 1%
        assert_eq!(res.ppat_rate_percent, "1.00%");
        assert_eq!(res.total_title_transfer_cost, "4950000");
    }

    #[test]
    fn test_golden_case_home_affordability_single_15m() {
        let monthly_income = dec!(15000000);
        let other_debts = dec!(0);
        let dsr_percent = dec!(30);
        let annual_rate_percent = dec!(7.0);
        let tenor_months = 180;
        let down_payment_percent = dec!(20);

        let res = calculate_home_affordability_internal(
            monthly_income,
            other_debts,
            dsr_percent,
            annual_rate_percent,
            tenor_months,
            down_payment_percent,
        )
        .unwrap();

        assert_eq!(res.max_monthly_installment, "4500000");
        assert_eq!(res.max_loan_principal, "500651809");
        assert_eq!(res.max_property_price, "625814761");
        assert_eq!(res.required_down_payment, "125162952");
    }

    #[test]
    fn test_golden_case_home_affordability_joint_25m() {
        let monthly_income = dec!(25000000);
        let other_debts = dec!(2500000);
        let dsr_percent = dec!(35);
        let annual_rate_percent = dec!(6.5);
        let tenor_months = 240;
        let down_payment_percent = dec!(15);

        let res = calculate_home_affordability_internal(
            monthly_income,
            other_debts,
            dsr_percent,
            annual_rate_percent,
            tenor_months,
            down_payment_percent,
        )
        .unwrap();

        assert_eq!(res.max_monthly_installment, "6250000");
        assert_eq!(res.max_loan_principal, "838281277");
        assert_eq!(res.max_property_price, "986213267");
        assert_eq!(res.required_down_payment, "147931990");
    }

    #[test]
    fn test_golden_case_rent_vs_buy_10yr() {
        let property_price = dec!(800000000);
        let down_payment_percent = dec!(20);
        let annual_kpr_rate_percent = dec!(7.0);
        let kpr_tenor_years = 15;
        let initial_monthly_rent = dec!(2500000);
        let rent_inflation_percent = dec!(4.0);
        let property_appreciation_percent = dec!(5.0);
        let investment_return_percent = dec!(7.0);
        let analysis_period_years = 10;

        let res = calculate_rent_vs_buy_internal(
            property_price,
            down_payment_percent,
            annual_kpr_rate_percent,
            kpr_tenor_years,
            initial_monthly_rent,
            rent_inflation_percent,
            property_appreciation_percent,
            investment_return_percent,
            analysis_period_years,
        )
        .unwrap();

        assert_eq!(res.total_buy_initial_cost, "200000000"); // DP 160m + legal 40m
        assert_eq!(res.monthly_kpr_installment, "5752501");
        assert_eq!(res.recommendation, "BELI_LEBIH_UNTUNG");
        assert!(res.break_even_year.is_some());
    }

    #[test]
    fn test_golden_case_rent_vs_buy_short_term_3yr() {
        let property_price = dec!(800000000);
        let down_payment_percent = dec!(20);
        let annual_kpr_rate_percent = dec!(7.0);
        let kpr_tenor_years = 15;
        let initial_monthly_rent = dec!(2500000);
        let rent_inflation_percent = dec!(4.0);
        let property_appreciation_percent = dec!(3.0); // konservatif
        let investment_return_percent = dec!(8.0); // return investasi tinggi
        let analysis_period_years = 3;

        let res = calculate_rent_vs_buy_internal(
            property_price,
            down_payment_percent,
            annual_kpr_rate_percent,
            kpr_tenor_years,
            initial_monthly_rent,
            rent_inflation_percent,
            property_appreciation_percent,
            investment_return_percent,
            analysis_period_years,
        )
        .unwrap();

        // Dalam jangka pendek 3 tahun, sewa lebih unggul karena tidak terbeban biaya legalitas awal & bunga KPR
        assert_eq!(res.recommendation, "SEWA_LEBIH_UNTUNG");
    }
}



