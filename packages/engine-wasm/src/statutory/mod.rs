pub mod property;
pub mod types;

pub use property::calculate_property_title_transfer_internal;
pub use types::{Pph21CalculationResult, PropertyTitleTransferResult};

use rust_decimal::Decimal;
use wasm_bindgen::prelude::*;


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


