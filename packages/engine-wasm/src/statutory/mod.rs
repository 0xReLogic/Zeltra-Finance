pub mod property;
pub mod types;

pub use property::{
    calculate_bphtb_internal, calculate_home_affordability_internal,
    calculate_kpr_notary_fee_internal, calculate_property_seller_tax_internal,
    calculate_property_title_transfer_internal, calculate_rent_vs_buy_internal,
};
pub use types::{
    BphtbCalculationResult, HomeAffordabilityResult, KprNotaryFeeResult,
    Pph21CalculationResult, PropertySellerTaxResult, PropertyTitleTransferResult,
    RentVsBuyResult,
};

use rust_decimal::Decimal;
use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub fn calculate_kpr_notary_fee(
    property_value_str: &str,
    loan_principal_str: &str,
) -> Result<JsValue, JsValue> {
    let property_value = Decimal::from_str_exact(property_value_str)
        .map_err(|e| JsValue::from_str(&format!("Nilai properti tidak valid: {}", e)))?;
    let loan_principal = Decimal::from_str_exact(loan_principal_str)
        .map_err(|e| JsValue::from_str(&format!("Plafon pinjaman KPR tidak valid: {}", e)))?;

    let result = calculate_kpr_notary_fee_internal(property_value, loan_principal)
        .map_err(|e| JsValue::from_str(&e))?;

    let json_str = serde_json::to_string(&result)
        .map_err(|e| JsValue::from_str(&format!("Serialization error: {}", e)))?;
    Ok(JsValue::from_str(&json_str))
}

#[wasm_bindgen]
pub fn calculate_property_seller_tax(
    gross_value_str: &str,
    rate_percent_str: &str,
) -> Result<JsValue, JsValue> {
    let gross_value = Decimal::from_str_exact(gross_value_str)
        .map_err(|e| JsValue::from_str(&format!("Nilai bruto properti tidak valid: {}", e)))?;
    let rate_percent = Decimal::from_str_exact(rate_percent_str)
        .map_err(|e| JsValue::from_str(&format!("Tarif PPh final tidak valid: {}", e)))?;

    let result = calculate_property_seller_tax_internal(gross_value, rate_percent)
        .map_err(|e| JsValue::from_str(&e))?;

    let json_str = serde_json::to_string(&result)
        .map_err(|e| JsValue::from_str(&format!("Serialization error: {}", e)))?;
    Ok(JsValue::from_str(&json_str))
}

#[wasm_bindgen]
pub fn calculate_bphtb(
    property_value_str: &str,
    npoptkp_str: &str,
    rate_percent_str: &str,
) -> Result<JsValue, JsValue> {
    let property_value = Decimal::from_str_exact(property_value_str)
        .map_err(|e| JsValue::from_str(&format!("Nilai properti tidak valid: {}", e)))?;
    let npoptkp = Decimal::from_str_exact(npoptkp_str)
        .map_err(|e| JsValue::from_str(&format!("Nilai NPOPTKP tidak valid: {}", e)))?;
    let rate_percent = Decimal::from_str_exact(rate_percent_str)
        .map_err(|e| JsValue::from_str(&format!("Tarif BPHTB tidak valid: {}", e)))?;

    let result = calculate_bphtb_internal(property_value, npoptkp, rate_percent)
        .map_err(|e| JsValue::from_str(&e))?;

    let json_str = serde_json::to_string(&result)
        .map_err(|e| JsValue::from_str(&format!("Serialization error: {}", e)))?;
    Ok(JsValue::from_str(&json_str))
}

#[wasm_bindgen]
pub fn calculate_property_title_transfer(property_value_str: &str) -> Result<JsValue, JsValue> {
    let property_value = Decimal::from_str_exact(property_value_str)
        .map_err(|e| JsValue::from_str(&format!("Nilai properti tidak valid: {}", e)))?;

    let result = calculate_property_title_transfer_internal(property_value)
        .map_err(|e| JsValue::from_str(&e))?;

    let json_str = serde_json::to_string(&result)
        .map_err(|e| JsValue::from_str(&format!("Serialization error: {}", e)))?;
    Ok(JsValue::from_str(&json_str))
}

#[wasm_bindgen]
pub fn calculate_home_affordability(
    monthly_income_str: &str,
    other_debts_str: &str,
    dsr_percent_str: &str,
    annual_rate_percent_str: &str,
    tenor_months: u32,
    down_payment_percent_str: &str,
) -> Result<JsValue, JsValue> {
    let monthly_income = Decimal::from_str_exact(monthly_income_str)
        .map_err(|e| JsValue::from_str(&format!("Penghasilan bulanan tidak valid: {}", e)))?;
    let other_debts = Decimal::from_str_exact(other_debts_str)
        .map_err(|e| JsValue::from_str(&format!("Cicilan utang lain tidak valid: {}", e)))?;
    let dsr_percent = Decimal::from_str_exact(dsr_percent_str)
        .map_err(|e| JsValue::from_str(&format!("Persentase DSR tidak valid: {}", e)))?;
    let annual_rate_percent = Decimal::from_str_exact(annual_rate_percent_str)
        .map_err(|e| JsValue::from_str(&format!("Suku bunga tidak valid: {}", e)))?;
    let down_payment_percent = Decimal::from_str_exact(down_payment_percent_str)
        .map_err(|e| JsValue::from_str(&format!("Uang muka tidak valid: {}", e)))?;

    let result = calculate_home_affordability_internal(
        monthly_income,
        other_debts,
        dsr_percent,
        annual_rate_percent,
        tenor_months,
        down_payment_percent,
    )
    .map_err(|e| JsValue::from_str(&e))?;

    let json_str = serde_json::to_string(&result)
        .map_err(|e| JsValue::from_str(&format!("Serialization error: {}", e)))?;
    Ok(JsValue::from_str(&json_str))
}

#[wasm_bindgen]
pub fn calculate_rent_vs_buy(
    property_price_str: &str,
    down_payment_percent_str: &str,
    annual_kpr_rate_percent_str: &str,
    kpr_tenor_years: u32,
    initial_monthly_rent_str: &str,
    rent_inflation_percent_str: &str,
    property_appreciation_percent_str: &str,
    investment_return_percent_str: &str,
    analysis_period_years: u32,
) -> Result<JsValue, JsValue> {
    let property_price = Decimal::from_str_exact(property_price_str)
        .map_err(|e| JsValue::from_str(&format!("Harga properti tidak valid: {}", e)))?;
    let down_payment_percent = Decimal::from_str_exact(down_payment_percent_str)
        .map_err(|e| JsValue::from_str(&format!("Persentase uang muka tidak valid: {}", e)))?;
    let annual_kpr_rate_percent = Decimal::from_str_exact(annual_kpr_rate_percent_str)
        .map_err(|e| JsValue::from_str(&format!("Suku bunga KPR tidak valid: {}", e)))?;
    let initial_monthly_rent = Decimal::from_str_exact(initial_monthly_rent_str)
        .map_err(|e| JsValue::from_str(&format!("Biaya sewa awal tidak valid: {}", e)))?;
    let rent_inflation_percent = Decimal::from_str_exact(rent_inflation_percent_str)
        .map_err(|e| JsValue::from_str(&format!("Kenaikan sewa tidak valid: {}", e)))?;
    let property_appreciation_percent = Decimal::from_str_exact(property_appreciation_percent_str)
        .map_err(|e| JsValue::from_str(&format!("Apresiasi properti tidak valid: {}", e)))?;
    let investment_return_percent = Decimal::from_str_exact(investment_return_percent_str)
        .map_err(|e| JsValue::from_str(&format!("Return investasi tidak valid: {}", e)))?;

    let result = calculate_rent_vs_buy_internal(
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
    .map_err(|e| JsValue::from_str(&e))?;

    let json_str = serde_json::to_string(&result)
        .map_err(|e| JsValue::from_str(&format!("Serialization error: {}", e)))?;
    Ok(JsValue::from_str(&json_str))
}


