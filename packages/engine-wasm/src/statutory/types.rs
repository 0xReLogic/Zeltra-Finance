use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct Pph21CalculationResult {
    pub gross_salary: String,
    pub ptkp_status: String,
    pub ter_category: String,
    pub ter_rate_percent: String,
    pub pph21_monthly: String,
    pub bpjs_kesehatan: String,
    pub bpjs_ketenagakerjaan: String,
    pub take_home_pay: String,
}
