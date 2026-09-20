use super::types::PropertyTitleTransferResult;
use rust_decimal::Decimal;
use rust_decimal_macros::dec;

/// Menghitung Biaya Balik Nama (BBN) Sertifikat Tanah/Rumah
/// Berdasarkan PP No. 128 Tahun 2015 dan Permen ATR/BPN No. 33 Tahun 2021.
pub fn calculate_property_title_transfer_internal(
    property_value: Decimal,
) -> Result<PropertyTitleTransferResult, String> {
    if property_value <= dec!(0) {
        return Err("Nilai properti/transaksi harus lebih besar dari 0".to_string());
    }

    // 1. PNBP BPN sesuai PP 128/2015: (Nilai Tanah / 1000)
    let bpn_pnbp = (property_value / dec!(1000)).round_dp_with_strategy(
        0,
        rust_decimal::RoundingStrategy::MidpointAwayFromZero,
    );
    let bpn_check = dec!(50000); // Biaya pengecekan keaslian sertifikat di BPN
    let total_bpn = bpn_pnbp + bpn_check;

    // 2. Jasa PPAT sesuai Permen ATR/BPN No. 33/2021 (Tiering Nilai Transaksi)
    let (ppat_rate, ppat_rate_str) = if property_value <= dec!(500000000) {
        (dec!(0.0100), "1.00%")
    } else if property_value <= dec!(1000000000) {
        (dec!(0.0075), "0.75%")
    } else if property_value <= dec!(2500000000) {
        (dec!(0.0050), "0.50%")
    } else {
        (dec!(0.0025), "0.25%")
    };

    let ppat_fee = (property_value * ppat_rate).round_dp_with_strategy(
        0,
        rust_decimal::RoundingStrategy::MidpointAwayFromZero,
    );

    let admin_validation = dec!(500000); // Biaya administrasi & validasi berkas PPAT
    let total_cost = total_bpn + ppat_fee + admin_validation;

    Ok(PropertyTitleTransferResult {
        property_value: property_value.to_string(),
        bpn_pnbp_fee: bpn_pnbp.to_string(),
        bpn_check_fee: bpn_check.to_string(),
        total_bpn_cost: total_bpn.to_string(),
        ppat_fee: ppat_fee.to_string(),
        ppat_rate_percent: ppat_rate_str.to_string(),
        admin_validation_fee: admin_validation.to_string(),
        total_title_transfer_cost: total_cost.to_string(),
    })
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_golden_case_title_transfer_750m() {
        let value = dec!(750000000);
        let res = calculate_property_title_transfer_internal(value).unwrap();

        assert_eq!(res.property_value, "750000000");
        assert_eq!(res.bpn_pnbp_fee, "750000");
        assert_eq!(res.bpn_check_fee, "50000");
        assert_eq!(res.total_bpn_cost, "800000");
        assert_eq!(res.ppat_fee, "5625000");
        assert_eq!(res.ppat_rate_percent, "0.75%");
        assert_eq!(res.admin_validation_fee, "500000");
        assert_eq!(res.total_title_transfer_cost, "6925000");
    }

    #[test]
    fn test_golden_case_title_transfer_400m() {
        let value = dec!(400000000);
        let res = calculate_property_title_transfer_internal(value).unwrap();

        assert_eq!(res.bpn_pnbp_fee, "400000");
        assert_eq!(res.ppat_fee, "4000000"); // 1%
        assert_eq!(res.ppat_rate_percent, "1.00%");
        assert_eq!(res.total_title_transfer_cost, "4950000");
    }
}
