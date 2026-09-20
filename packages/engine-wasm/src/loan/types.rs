use serde::{Deserialize, Serialize};

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

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct GeneralLoanCalculationResult {
    pub property_price: String,
    pub down_payment: String,
    pub principal: String,
    pub calculation_type: String,
    pub first_month_installment: String,
    pub last_month_installment: String,
    pub total_interest_paid: String,
    pub total_payment: String,
    pub provision_fee: String,
    pub estimated_admin_fee: String,
    pub estimated_legal_notary_fee: String,
    pub total_upfront_cost: String,
    pub recommended_minimum_income: String,
    pub schedule: Vec<AmortizationRow>,
}
