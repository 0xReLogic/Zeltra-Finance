pub mod property;
pub mod types;

pub use property::{
    calculate_bphtb_internal, calculate_kpr_notary_fee_internal,
    calculate_property_seller_tax_internal, calculate_property_title_transfer_internal,
};
pub use types::{
    BphtbCalculationResult, KprNotaryFeeResult, Pph21CalculationResult,
    PropertySellerTaxResult, PropertyTitleTransferResult,
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


