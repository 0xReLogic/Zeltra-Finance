use wasm_bindgen::prelude::*;

pub mod loan;

#[wasm_bindgen]
pub fn get_engine_version() -> String {
    "Zeltra Finance Engine Wasm v0.1.0 (Fixed-Point Precision)".to_string()
}
