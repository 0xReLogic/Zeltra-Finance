use super::annuity::calculate_annuity_internal;
use super::effective::calculate_effective_internal;
use super::flat::calculate_flat_internal;
use super::types::GeneralLoanCalculationResult;
use rust_decimal::Decimal;
use rust_decimal_macros::dec;

/// Menghitung simulasi KPR umum komprehensif (Nilai Properti, DP, Biaya Akad, DSR 30%).
pub fn calculate_kpr_general_internal(
    property_price: Decimal,
    down_payment: Decimal,
    annual_rate_percent: Decimal,
    tenor_months: u32,
    calc_type: &str,
) -> Result<GeneralLoanCalculationResult, String> {
    if property_price <= dec!(0) {
        return Err("Harga properti harus lebih besar dari 0".to_string());
    }
    if down_payment >= property_price {
        return Err("Uang muka tidak boleh melebihi atau sama dengan harga properti".to_string());
    }

    let principal = property_price - down_payment;

    let (first_installment, last_installment, total_interest, total_payment, schedule) = match calc_type {
        "flat" => {
            let res = calculate_flat_internal(principal, annual_rate_percent, tenor_months)?;
            let inst = Decimal::from_str_exact(&res.monthly_installment).unwrap_or(dec!(0));
            (
                inst,
                inst,
                Decimal::from_str_exact(&res.total_interest_paid).unwrap_or(dec!(0)),
                Decimal::from_str_exact(&res.total_payment).unwrap_or(dec!(0)),
                res.schedule,
            )
        }
        "effective" => {
            let (res, first, last) =
                calculate_effective_internal(principal, annual_rate_percent, tenor_months)?;
            (
                first,
                last,
                Decimal::from_str_exact(&res.total_interest_paid).unwrap_or(dec!(0)),
                Decimal::from_str_exact(&res.total_payment).unwrap_or(dec!(0)),
                res.schedule,
            )
        }
        _ => {
            // Default "annuity"
            let res = calculate_annuity_internal(principal, annual_rate_percent, tenor_months)?;
            let inst = Decimal::from_str_exact(&res.monthly_installment).unwrap_or(dec!(0));
            (
                inst,
                inst,
                Decimal::from_str_exact(&res.total_interest_paid).unwrap_or(dec!(0)),
                Decimal::from_str_exact(&res.total_payment).unwrap_or(dec!(0)),
                res.schedule,
            )
        }
    };

    // Estimasi biaya akad kredit awal standar perbankan 2026:
    // 1. Provisi: 1.00% dari plafon pinjaman
    let provision_fee = (principal * dec!(0.01)).round_dp_with_strategy(
        0,
        rust_decimal::RoundingStrategy::MidpointAwayFromZero,
    );
    // 2. Administrasi: Estimasi flat Rp 1.000.000
    let estimated_admin_fee = dec!(1000000);
    // 3. Biaya Notaris, APHT, AJB, SKMHT: Estimasi ~2.00% dari plafon pinjaman
    let estimated_legal_notary_fee = (principal * dec!(0.02)).round_dp_with_strategy(
        0,
        rust_decimal::RoundingStrategy::MidpointAwayFromZero,
    );

    let total_upfront_cost =
        down_payment + provision_fee + estimated_admin_fee + estimated_legal_notary_fee;

    // Rekomendasi Gaji Minimum (Standar BI/OJK batas maksimal Debt Service Ratio DSR 30%)
    let recommended_minimum_income = (first_installment / dec!(0.30)).round_dp_with_strategy(
        0,
        rust_decimal::RoundingStrategy::MidpointAwayFromZero,
    );

    Ok(GeneralLoanCalculationResult {
        property_price: property_price.to_string(),
        down_payment: down_payment.to_string(),
        principal: principal.to_string(),
        calculation_type: calc_type.to_string(),
        first_month_installment: first_installment.to_string(),
        last_month_installment: last_installment.to_string(),
        total_interest_paid: total_interest.to_string(),
        total_payment: total_payment.to_string(),
        provision_fee: provision_fee.to_string(),
        estimated_admin_fee: estimated_admin_fee.to_string(),
        estimated_legal_notary_fee: estimated_legal_notary_fee.to_string(),
        total_upfront_cost: total_upfront_cost.to_string(),
        recommended_minimum_income: recommended_minimum_income.to_string(),
        schedule,
    })
}
