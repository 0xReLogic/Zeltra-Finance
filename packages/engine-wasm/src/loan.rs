use rust_decimal::Decimal;
use rust_decimal::MathematicalOps;
use rust_decimal_macros::dec;
use serde::{Deserialize, Serialize};
use wasm_bindgen::prelude::*;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct AmortizationRow {
    pub month: u32,
    pub principal_payment: String,
    pub interest_payment: String,
    pub total_installment: String,
    pub remaining_balance: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct LoanCalculationResult {
    pub monthly_installment: String,
    pub total_interest_paid: String,
    pub total_payment: String,
    pub schedule: Vec<AmortizationRow>,
}

/// Menghitung cicilan pinjaman anuitas dengan presisi fixed-point.
/// Formula: A = P * [i * (1 + i)^n] / [(1 + i)^n - 1]
pub fn calculate_annuity_internal(
    principal: Decimal,
    annual_rate_percent: Decimal,
    tenor_months: u32,
) -> Result<LoanCalculationResult, String> {
    if principal <= dec!(0) {
        return Err("Pokok pinjaman harus lebih besar dari 0".to_string());
    }
    if tenor_months == 0 {
        return Err("Tenor pinjaman minimal 1 bulan".to_string());
    }

    let monthly_rate = (annual_rate_percent / dec!(100)) / dec!(12);

    let monthly_installment = if monthly_rate == dec!(0) {
        (principal / Decimal::from(tenor_months)).round_dp_with_strategy(
            0,
            rust_decimal::RoundingStrategy::MidpointAwayFromZero,
        )
    } else {
        let one = dec!(1);
        let one_plus_i = one + monthly_rate;
        let n_dec = Decimal::from(tenor_months);

        // (1 + i)^n via powd
        let factor = one_plus_i.powd(n_dec);

        let numerator = principal * monthly_rate * factor;
        let denominator = factor - one;

        if denominator == dec!(0) {
            return Err("Terjadi pembagian dengan nol".to_string());
        }

        (numerator / denominator).round_dp_with_strategy(
            0,
            rust_decimal::RoundingStrategy::MidpointAwayFromZero,
        )
    };

    let mut remaining = principal;
    let mut total_interest = dec!(0);
    let mut schedule = Vec::with_capacity(tenor_months as usize);

    for m in 1..=tenor_months {
        let interest_part = if monthly_rate > dec!(0) {
            (remaining * monthly_rate).round_dp_with_strategy(
                0,
                rust_decimal::RoundingStrategy::MidpointAwayFromZero,
            )
        } else {
            dec!(0)
        };

        let principal_part = if m == tenor_months {
            // Pada bulan terakhir, pokok ditutup persis sisa saldo agar saldo akhir tepat 0
            remaining
        } else {
            let p = monthly_installment - interest_part;
            if p > remaining {
                remaining
            } else {
                p
            }
        };

        remaining -= principal_part;
        if remaining < dec!(0) {
            remaining = dec!(0);
        }
        total_interest += interest_part;

        let actual_installment = principal_part + interest_part;

        schedule.push(AmortizationRow {
            month: m,
            principal_payment: principal_part.to_string(),
            interest_payment: interest_part.to_string(),
            total_installment: actual_installment.to_string(),
            remaining_balance: remaining.to_string(),
        });
    }

    let total_payment = principal + total_interest;

    Ok(LoanCalculationResult {
        monthly_installment: monthly_installment.to_string(),
        total_interest_paid: total_interest.to_string(),
        total_payment: total_payment.to_string(),
        schedule,
    })
}

#[wasm_bindgen]
pub fn calculate_kpr_annuity(
    principal_str: &str,
    annual_rate_str: &str,
    tenor_months: u32,
) -> Result<JsValue, JsValue> {
    let principal = Decimal::from_str_exact(principal_str)
        .map_err(|e| JsValue::from_str(&format!("Plafon tidak valid: {}", e)))?;
    let annual_rate = Decimal::from_str_exact(annual_rate_str)
        .map_err(|e| JsValue::from_str(&format!("Bunga tidak valid: {}", e)))?;

    let result = calculate_annuity_internal(principal, annual_rate, tenor_months)
        .map_err(|e| JsValue::from_str(&e))?;

    serde_wasm_bindgen_or_json(&result)
}

fn serde_wasm_bindgen_or_json<T: Serialize>(value: &T) -> Result<JsValue, JsValue> {
    let json_str = serde_json::to_string(value)
        .map_err(|e| JsValue::from_str(&format!("Serialization error: {}", e)))?;
    Ok(JsValue::from_str(&json_str))
}

#[cfg(test)]
mod tests {
    use super::*;
    use rust_decimal_macros::dec;

    #[test]
    fn test_golden_case_kpr_bca_mandiri() {
        // Golden Case: Pinjaman Rp 500.000.000, Bunga 7.00% per tahun, Tenor 15 Tahun (180 Bulan)
        // Standar cicilan perbankan nasional: Rp 4.494.141 per bulan (pembulatan half-up)
        let principal = dec!(500000000);
        let annual_rate = dec!(7.00);
        let tenor = 180;

        let result = calculate_annuity_internal(principal, annual_rate, tenor).unwrap();

        assert_eq!(result.monthly_installment, "4494141");

        // Verifikasi saldo akhir bulan ke-180 harus tepat Rp 0
        let last_row = result.schedule.last().unwrap();
        assert_eq!(last_row.month, 180);
        assert_eq!(last_row.remaining_balance, "0");
    }

    #[test]
    fn test_zero_interest() {
        // Pinjaman tanpa bunga (misal pinjaman keluarga): Rp 12.000.000, tenor 12 bulan = Rp 1.000.000/bln
        let principal = dec!(12000000);
        let annual_rate = dec!(0);
        let tenor = 12;

        let result = calculate_annuity_internal(principal, annual_rate, tenor).unwrap();
        assert_eq!(result.monthly_installment, "1000000");
        assert_eq!(result.total_interest_paid, "0");
        assert_eq!(result.schedule.last().unwrap().remaining_balance, "0");
    }
}
