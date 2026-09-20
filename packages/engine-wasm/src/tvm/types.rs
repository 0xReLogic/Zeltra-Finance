use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct CompoundGrowthPoint {
    pub year: u32,
    pub total_deposit: String,
    pub interest_earned: String,
    pub end_balance: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct CompoundInterestResult {
    pub initial_deposit: String,
    pub regular_deposit: String,
    pub total_contributed: String,
    pub total_interest_earned: String,
    pub final_balance: String,
    pub timeline: Vec<CompoundGrowthPoint>,
}
