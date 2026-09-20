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

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct PropertyTitleTransferResult {
    pub property_value: String,
    pub bpn_pnbp_fee: String,
    pub bpn_check_fee: String,
    pub total_bpn_cost: String,
    pub ppat_fee: String,
    pub ppat_rate_percent: String,
    pub admin_validation_fee: String,
    pub total_title_transfer_cost: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct BphtbCalculationResult {
    pub property_value: String,
    pub npoptkp: String,
    pub taxable_value: String,
    pub tax_rate_percent: String,
    pub bphtb_due: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct PropertySellerTaxResult {
    pub gross_value: String,
    pub tax_rate_percent: String,
    pub pph_final_amount: String,
    pub net_proceeds: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct KprNotaryFeeResult {
    pub property_value: String,
    pub loan_principal: String,
    pub ajb_fee: String,
    pub ajb_rate_percent: String,
    pub apht_fee: String,
    pub apht_rate_percent: String,
    pub bpn_ht_pnbp_fee: String,
    pub credit_agreement_fee: String,
    pub certificate_check_fee: String,
    pub admin_validation_fee: String,
    pub total_notary_fee: String,
}



