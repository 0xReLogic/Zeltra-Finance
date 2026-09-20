use wasm_bindgen::prelude::*;

pub mod buffer;
pub mod loan;
pub mod statutory;
pub mod tvm;

#[wasm_bindgen]
pub fn get_engine_version() -> String {
    "Zeltra Finance Engine Wasm v0.1.0 (Fixed-Point Precision)".to_string()
}
