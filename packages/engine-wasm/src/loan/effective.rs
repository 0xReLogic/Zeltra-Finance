use super::types::{AmortizationRow, LoanCalculationResult};
use rust_decimal::Decimal;
use rust_decimal_macros::dec;

/// Menghitung pinjaman dengan bunga Efektif (Sliding Rate).
/// Pokok per bulan konstan, beban bunga menurun setiap bulan.
pub fn calculate_effective_internal(
    principal: Decimal,
    annual_rate_percent: Decimal,
    tenor_months: u32,
) -> Result<(LoanCalculationResult, Decimal, Decimal), String> {
    if principal <= dec!(0) {
        return Err("Pokok pinjaman harus lebih besar dari 0".to_string());
    }
    if tenor_months == 0 {
        return Err("Tenor pinjaman minimal 1 bulan".to_string());
    }

    let monthly_rate = (annual_rate_percent / dec!(100)) / dec!(12);
    let monthly_principal = (principal / Decimal::from(tenor_months)).round_dp_with_strategy(
        0,
        rust_decimal::RoundingStrategy::MidpointAwayFromZero,
    );

    let mut remaining = principal;
    let mut total_interest = dec!(0);
    let mut first_installment = dec!(0);
    let mut last_installment = dec!(0);
    let mut schedule = Vec::with_capacity(tenor_months as usize);

    for m in 1..=tenor_months {
        let interest_part = if monthly_rate > dec!(0) {
            (remaining * monthly_rate).round_dp_with_strategy(
                0,
                rust_decimal::RoundingStrategy::MidpointAwayFromZero,
            )
        } else {
            dec!(0)
        };

        let principal_part = if m == tenor_months {
            remaining
        } else {
            monthly_principal
        };

        remaining -= principal_part;
        if remaining < dec!(0) {
            remaining = dec!(0);
        }
        total_interest += interest_part;

        let actual_installment = principal_part + interest_part;
        if m == 1 {
            first_installment = actual_installment;
        }
        if m == tenor_months {
            last_installment = actual_installment;
        }

        schedule.push(AmortizationRow {
            month: m,
            principal_payment: principal_part.to_string(),
            interest_payment: interest_part.to_string(),
            total_installment: actual_installment.to_string(),
            remaining_balance: remaining.to_string(),
        });
    }

    let total_payment = principal + total_interest;

    Ok((
        LoanCalculationResult {
            monthly_installment: first_installment.to_string(),
            total_interest_paid: total_interest.to_string(),
            total_payment: total_payment.to_string(),
            schedule,
        },
        first_installment,
        last_installment,
    ))
}
