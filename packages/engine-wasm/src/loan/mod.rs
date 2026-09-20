pub mod annuity;
pub mod effective;
pub mod flat;
pub mod general;
pub mod types;

pub use annuity::calculate_annuity_internal;
pub use effective::calculate_effective_internal;
pub use flat::calculate_flat_internal;
pub use general::calculate_kpr_general_internal;
pub use types::{AmortizationRow, GeneralLoanCalculationResult, LoanCalculationResult};

use rust_decimal::Decimal;
use serde::Serialize;
use wasm_bindgen::prelude::*;

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

#[wasm_bindgen]
pub fn calculate_kpr_general(
    property_price_str: &str,
    dp_amount_str: &str,
    annual_rate_str: &str,
    tenor_months: u32,
    calc_type: &str,
) -> Result<JsValue, JsValue> {
    let property_price = Decimal::from_str_exact(property_price_str)
        .map_err(|e| JsValue::from_str(&format!("Harga properti tidak valid: {}", e)))?;
    let dp_amount = Decimal::from_str_exact(dp_amount_str)
        .map_err(|e| JsValue::from_str(&format!("Uang muka tidak valid: {}", e)))?;
    let annual_rate = Decimal::from_str_exact(annual_rate_str)
        .map_err(|e| JsValue::from_str(&format!("Suku bunga tidak valid: {}", e)))?;

    let result = calculate_kpr_general_internal(
        property_price,
        dp_amount,
        annual_rate,
        tenor_months,
        calc_type,
    )
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
        let principal = dec!(500000000);
        let annual_rate = dec!(7.00);
        let tenor = 180;

        let result = calculate_annuity_internal(principal, annual_rate, tenor).unwrap();

        assert_eq!(result.monthly_installment, "4494141");

        let last_row = result.schedule.last().unwrap();
        assert_eq!(last_row.month, 180);
        assert_eq!(last_row.remaining_balance, "0");
    }

    #[test]
    fn test_golden_case_kpr_bank_mandiri_promo_5yr() {
        // Golden Case Mandiri: Pinjaman Rp 600.000.000, Promo Fixed 5 Tahun 5.50%, Tenor 20 Tahun (240 Bulan)
        let principal = dec!(600000000);
        let annual_rate = dec!(5.50);
        let tenor = 240;

        let result = calculate_annuity_internal(principal, annual_rate, tenor).unwrap();

        assert_eq!(result.monthly_installment, "4127324");

        let last_row = result.schedule.last().unwrap();
        assert_eq!(last_row.month, 240);
        assert_eq!(last_row.remaining_balance, "0");
    }

    #[test]
    fn test_golden_case_kpr_general_annuity() {
        let property = dec!(625000000);
        let dp = dec!(125000000);
        let rate = dec!(7.00);
        let tenor = 180;

        let res = calculate_kpr_general_internal(property, dp, rate, tenor, "annuity").unwrap();

        assert_eq!(res.principal, "500000000");
        assert_eq!(res.first_month_installment, "4494141");
        assert_eq!(res.last_month_installment, "4494141");
        assert_eq!(res.total_interest_paid, "308945508");
        assert_eq!(res.total_payment, "808945508");
        assert_eq!(res.provision_fee, "5000000");
        assert_eq!(res.estimated_admin_fee, "1000000");
        assert_eq!(res.estimated_legal_notary_fee, "10000000");
        assert_eq!(res.total_upfront_cost, "141000000");
        assert_eq!(res.recommended_minimum_income, "14980470");
    }

    #[test]
    fn test_golden_case_kpr_general_flat() {
        let property = dec!(150000000);
        let dp = dec!(30000000);
        let rate = dec!(12.00);
        let tenor = 12;

        let res = calculate_kpr_general_internal(property, dp, rate, tenor, "flat").unwrap();

        assert_eq!(res.principal, "120000000");
        assert_eq!(res.first_month_installment, "11200000");
        assert_eq!(res.last_month_installment, "11200000");
        assert_eq!(res.total_interest_paid, "14400000");
        assert_eq!(res.total_payment, "134400000");
        assert_eq!(res.schedule.last().unwrap().remaining_balance, "0");
    }

    #[test]
    fn test_golden_case_kpr_general_effective() {
        let property = dec!(150000000);
        let dp = dec!(30000000);
        let rate = dec!(12.00);
        let tenor = 12;

        let res = calculate_kpr_general_internal(property, dp, rate, tenor, "effective").unwrap();

        assert_eq!(res.principal, "120000000");
        assert_eq!(res.first_month_installment, "11200000");
        assert_eq!(res.last_month_installment, "10100000");
        assert_eq!(res.total_interest_paid, "7800000");
        assert_eq!(res.total_payment, "127800000");
        assert_eq!(res.schedule.last().unwrap().remaining_balance, "0");
    }

    #[test]
    fn test_golden_case_btn_kpr_subsidi_flpp() {
        let property = dec!(185000000);
        let dp = dec!(1850000); // 1% DP
        let rate = dec!(5.00); // 5% fixed FLPP
        let tenor = 240; // 20 years

        let res = calculate_kpr_general_internal(property, dp, rate, tenor, "annuity").unwrap();

        assert_eq!(res.principal, "183150000");
        assert_eq!(res.first_month_installment, "1208709");
        assert_eq!(res.last_month_installment, "1208709");
        assert_eq!(res.total_interest_paid, "106940136");
        assert_eq!(res.total_payment, "290090136");
        assert_eq!(res.schedule.last().unwrap().remaining_balance, "0");
    }

    #[test]
    fn test_golden_case_kpr_griya_bri() {
        let property = dec!(500000000);
        let dp = dec!(50000000); // 10% DP
        let rate = dec!(5.45); // 5.45% promo 5 thn
        let tenor = 180; // 15 years

        let res = calculate_kpr_general_internal(property, dp, rate, tenor, "annuity").unwrap();

        assert_eq!(res.principal, "450000000");
        assert_eq!(res.first_month_installment, "3664947");
        assert_eq!(res.last_month_installment, "3664947");
        assert_eq!(res.total_payment, "659690376");
        assert_eq!(res.total_interest_paid, "209690376");
        assert_eq!(res.schedule.last().unwrap().remaining_balance, "0");
    }

    #[test]
    fn test_golden_case_kpr_griya_bni() {
        let property = dec!(600000000);
        let dp = dec!(60000000); // 10% DP
        let rate = dec!(4.75); // 4.75% promo 5 thn
        let tenor = 240; // 20 years

        let res = calculate_kpr_general_internal(property, dp, rate, tenor, "annuity").unwrap();

        assert_eq!(res.principal, "540000000");
        assert_eq!(res.first_month_installment, "3489608");
        assert_eq!(res.last_month_installment, "3489608");
        assert_eq!(res.schedule.last().unwrap().remaining_balance, "0");
    }

    #[test]
    fn test_golden_case_kpr_cimb_niaga_xtra() {
        let property = dec!(800000000);
        let dp = dec!(120000000); // 15% DP
        let rate = dec!(4.50); // 4.50% promo 3 thn
        let tenor = 240; // 20 years

        let res = calculate_kpr_general_internal(property, dp, rate, tenor, "annuity").unwrap();

        assert_eq!(res.principal, "680000000");
        assert_eq!(res.first_month_installment, "4302016");
        assert_eq!(res.last_month_installment, "4302016");
        assert_eq!(res.schedule.last().unwrap().remaining_balance, "0");
    }

    #[test]
    fn test_golden_case_kpr_syariah_murabahah() {
        let property = dec!(500000000);
        let dp = dec!(100000000); // 20% DP
        let margin_rate = dec!(7.50); // 7.5% p.a. flat margin
        let tenor = 180; // 15 years

        let res = calculate_kpr_general_internal(property, dp, margin_rate, tenor, "flat").unwrap();

        assert_eq!(res.principal, "400000000");
        assert_eq!(res.first_month_installment, "4722222");
        assert_eq!(res.last_month_installment, "4722222");
        assert_eq!(res.total_interest_paid, "450000000"); // Total margin keuntungan bank
        assert_eq!(res.total_payment, "850000000"); // Total harga jual bank (pokok + margin)
        assert_eq!(res.schedule.last().unwrap().remaining_balance, "0");
    }

    #[test]
    fn test_golden_case_kpr_syariah_mmq() {
        let property = dec!(750000000);
        let dp = dec!(150000000); // 20% porsi modal nasabah
        let ujrah_rate = dec!(6.75); // 6.75% p.a. sewa ekuivalen
        let tenor = 180; // 15 years

        let res = calculate_kpr_general_internal(property, dp, ujrah_rate, tenor, "annuity").unwrap();

        assert_eq!(res.principal, "600000000");
        assert_eq!(res.first_month_installment, "5309457");
        assert_eq!(res.last_month_installment, "5309457");
        assert_eq!(res.schedule.last().unwrap().remaining_balance, "0");
    }
}













