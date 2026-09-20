use super::types::{
    BphtbCalculationResult, KprNotaryFeeResult, PropertySellerTaxResult,
    PropertyTitleTransferResult,
};
use rust_decimal::Decimal;
use rust_decimal_macros::dec;

/// Menghitung Rincian Biaya Notaris & PPAT Akad Kredit KPR
/// Berdasarkan Permen ATR/BPN No. 33/2021 (AJB), UUHT No. 4/1996 (APHT), dan PP No. 128/2015 (PNBP Hak Tanggungan).
pub fn calculate_kpr_notary_fee_internal(
    property_value: Decimal,
    loan_principal: Decimal,
) -> Result<KprNotaryFeeResult, String> {
    if property_value <= dec!(0) {
        return Err("Nilai properti/transaksi harus lebih besar dari 0".to_string());
    }
    if loan_principal <= dec!(0) {
        return Err("Plafon pinjaman KPR harus lebih besar dari 0".to_string());
    }
    if loan_principal > property_value {
        return Err("Plafon pinjaman KPR tidak boleh melebihi nilai transaksi properti".to_string());
    }

    // 1. Akta Jual Beli (AJB) PPAT (Permen ATR/BPN No. 33/2021)
    let (ajb_rate, ajb_rate_str) = if property_value <= dec!(500000000) {
        (dec!(0.0100), "1.00%")
    } else if property_value <= dec!(1000000000) {
        (dec!(0.0075), "0.75%")
    } else if property_value <= dec!(2500000000) {
        (dec!(0.0050), "0.50%")
    } else {
        (dec!(0.0025), "0.25%")
    };
    let ajb_fee = (property_value * ajb_rate).round_dp_with_strategy(
        0,
        rust_decimal::RoundingStrategy::MidpointAwayFromZero,
    );

    // 2. Akta Pemberian Hak Tanggungan (APHT) PPAT (0.50% dari plafon kredit)
    let apht_rate = dec!(0.0050);
    let apht_fee = (loan_principal * apht_rate).round_dp_with_strategy(
        0,
        rust_decimal::RoundingStrategy::MidpointAwayFromZero,
    );

    // 3. PNBP Hak Tanggungan BPN (Lampiran PP No. 128 Tahun 2015)
    let bpn_ht_fee = if loan_principal <= dec!(250000000) {
        dec!(50000)
    } else if loan_principal <= dec!(1000000000) {
        dec!(200000)
    } else if loan_principal <= dec!(10000000000) {
        dec!(2500000)
    } else {
        dec!(25000000)
    };

    // 4. Akta Perjanjian Kredit (PK) Notaris (0.25% dari plafon kredit, minimal Rp 500.000)
    let mut pk_fee = (loan_principal * dec!(0.0025)).round_dp_with_strategy(
        0,
        rust_decimal::RoundingStrategy::MidpointAwayFromZero,
    );
    if pk_fee < dec!(500000) {
        pk_fee = dec!(500000);
    }

    // 5. Pengecekan Sertifikat & Validasi BPN
    let cert_check_fee = dec!(100000);

    // 6. Administrasi & Validasi Berkas Notaris/PPAT
    let admin_fee = dec!(500000);

    let total_notary_fee = ajb_fee + apht_fee + bpn_ht_fee + pk_fee + cert_check_fee + admin_fee;

    Ok(KprNotaryFeeResult {
        property_value: property_value.to_string(),
        loan_principal: loan_principal.to_string(),
        ajb_fee: ajb_fee.to_string(),
        ajb_rate_percent: ajb_rate_str.to_string(),
        apht_fee: apht_fee.to_string(),
        apht_rate_percent: "0.50%".to_string(),
        bpn_ht_pnbp_fee: bpn_ht_fee.to_string(),
        credit_agreement_fee: pk_fee.to_string(),
        certificate_check_fee: cert_check_fee.to_string(),
        admin_validation_fee: admin_fee.to_string(),
        total_notary_fee: total_notary_fee.to_string(),
    })
}

/// Menghitung Pajak Penjual Properti (PPh Final Pengalihan Hak atas Tanah dan/atau Bangunan)
/// Berdasarkan Peraturan Pemerintah (PP) No. 34 Tahun 2016 jo. UU PPh Pasal 4 ayat (2).
pub fn calculate_property_seller_tax_internal(
    gross_value: Decimal,
    tax_rate_percent: Decimal,
) -> Result<PropertySellerTaxResult, String> {
    if gross_value < dec!(0) {
        return Err("Nilai bruto pengalihan tidak boleh negatif".to_string());
    }
    if tax_rate_percent < dec!(0) || tax_rate_percent > dec!(100) {
        return Err("Tarif PPh final harus antara 0% dan 100%".to_string());
    }

    let rate_fraction = tax_rate_percent / dec!(100);
    let pph_final = (gross_value * rate_fraction).round_dp_with_strategy(
        0,
        rust_decimal::RoundingStrategy::MidpointAwayFromZero,
    );
    let net_proceeds = gross_value - pph_final;

    Ok(PropertySellerTaxResult {
        gross_value: gross_value.to_string(),
        tax_rate_percent: format!("{:.2}%", tax_rate_percent),
        pph_final_amount: pph_final.to_string(),
        net_proceeds: net_proceeds.to_string(),
    })
}

/// Menghitung Pajak Pembeli Properti (BPHTB - Bea Perolehan Hak atas Tanah dan Bangunan)
/// Berdasarkan UU HKPD No. 1 Tahun 2022 Pasal 44 & 45.
pub fn calculate_bphtb_internal(
    property_value: Decimal,
    npoptkp: Decimal,
    tax_rate_percent: Decimal,
) -> Result<BphtbCalculationResult, String> {
    if property_value < dec!(0) {
        return Err("Nilai perolehan objek pajak (NPOP) tidak boleh negatif".to_string());
    }
    if npoptkp < dec!(0) {
        return Err("NPOPTKP tidak boleh negatif".to_string());
    }
    if tax_rate_percent < dec!(0) || tax_rate_percent > dec!(100) {
        return Err("Tarif BPHTB harus antara 0% dan 100%".to_string());
    }

    // NPOP Kena Pajak = max(0, NPOP - NPOPTKP)
    let taxable_value = if property_value > npoptkp {
        property_value - npoptkp
    } else {
        dec!(0)
    };

    let rate_fraction = tax_rate_percent / dec!(100);
    let bphtb_due = (taxable_value * rate_fraction).round_dp_with_strategy(
        0,
        rust_decimal::RoundingStrategy::MidpointAwayFromZero,
    );

    Ok(BphtbCalculationResult {
        property_value: property_value.to_string(),
        npoptkp: npoptkp.to_string(),
        taxable_value: taxable_value.to_string(),
        tax_rate_percent: format!("{:.2}%", tax_rate_percent),
        bphtb_due: bphtb_due.to_string(),
    })
}

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
    fn test_golden_case_bphtb_regular_600m() {
        let property_value = dec!(600000000);
        let npoptkp = dec!(80000000);
        let rate = dec!(5.0);

        let res = calculate_bphtb_internal(property_value, npoptkp, rate).unwrap();
        assert_eq!(res.property_value, "600000000");
        assert_eq!(res.npoptkp, "80000000");
        assert_eq!(res.taxable_value, "520000000");
        assert_eq!(res.tax_rate_percent, "5.00%");
        assert_eq!(res.bphtb_due, "26000000");
    }

    #[test]
    fn test_golden_case_bphtb_inheritance_800m() {
        let property_value = dec!(800000000);
        let npoptkp = dec!(300000000);
        let rate = dec!(5.0);

        let res = calculate_bphtb_internal(property_value, npoptkp, rate).unwrap();
        assert_eq!(res.property_value, "800000000");
        assert_eq!(res.npoptkp, "300000000");
        assert_eq!(res.taxable_value, "500000000");
        assert_eq!(res.tax_rate_percent, "5.00%");
        assert_eq!(res.bphtb_due, "25000000");
    }

    #[test]
    fn test_golden_case_bphtb_below_threshold() {
        let property_value = dec!(75000000);
        let npoptkp = dec!(80000000);
        let rate = dec!(5.0);

        let res = calculate_bphtb_internal(property_value, npoptkp, rate).unwrap();
        assert_eq!(res.taxable_value, "0");
        assert_eq!(res.bphtb_due, "0");
    }

    #[test]
    fn test_golden_case_seller_tax_regular_800m() {
        let gross_value = dec!(800000000);
        let rate = dec!(2.5);

        let res = calculate_property_seller_tax_internal(gross_value, rate).unwrap();
        assert_eq!(res.gross_value, "800000000");
        assert_eq!(res.tax_rate_percent, "2.50%");
        assert_eq!(res.pph_final_amount, "20000000");
        assert_eq!(res.net_proceeds, "780000000");
    }

    #[test]
    fn test_golden_case_seller_tax_regular_1500m() {
        let gross_value = dec!(1500000000);
        let rate = dec!(2.5);

        let res = calculate_property_seller_tax_internal(gross_value, rate).unwrap();
        assert_eq!(res.gross_value, "1500000000");
        assert_eq!(res.tax_rate_percent, "2.50%");
        assert_eq!(res.pph_final_amount, "37500000");
        assert_eq!(res.net_proceeds, "1462500000");
    }

    #[test]
    fn test_golden_case_seller_tax_subsidi_185m() {
        let gross_value = dec!(185000000);
        let rate = dec!(1.0);

        let res = calculate_property_seller_tax_internal(gross_value, rate).unwrap();
        assert_eq!(res.gross_value, "185000000");
        assert_eq!(res.tax_rate_percent, "1.00%");
        assert_eq!(res.pph_final_amount, "1850000");
        assert_eq!(res.net_proceeds, "183150000");
    }

    #[test]
    fn test_golden_case_seller_tax_exempt() {
        let gross_value = dec!(50000000);
        let rate = dec!(0.0);

        let res = calculate_property_seller_tax_internal(gross_value, rate).unwrap();
        assert_eq!(res.pph_final_amount, "0");
        assert_eq!(res.net_proceeds, "50000000");
    }

    #[test]
    fn test_golden_case_kpr_notary_fee_regular_750m() {
        let property_value = dec!(750000000);
        let loan_principal = dec!(600000000);

        let res = calculate_kpr_notary_fee_internal(property_value, loan_principal).unwrap();
        assert_eq!(res.property_value, "750000000");
        assert_eq!(res.loan_principal, "600000000");
        assert_eq!(res.ajb_fee, "5625000"); // 0.75%
        assert_eq!(res.ajb_rate_percent, "0.75%");
        assert_eq!(res.apht_fee, "3000000"); // 0.50%
        assert_eq!(res.bpn_ht_pnbp_fee, "200000"); // tier 250m-1b
        assert_eq!(res.credit_agreement_fee, "1500000"); // 0.25%
        assert_eq!(res.certificate_check_fee, "100000");
        assert_eq!(res.admin_validation_fee, "500000");
        assert_eq!(res.total_notary_fee, "10925000");
    }

    #[test]
    fn test_golden_case_kpr_notary_fee_high_1500m() {
        let property_value = dec!(1500000000);
        let loan_principal = dec!(1200000000);

        let res = calculate_kpr_notary_fee_internal(property_value, loan_principal).unwrap();
        assert_eq!(res.ajb_fee, "7500000"); // 0.50%
        assert_eq!(res.apht_fee, "6000000"); // 0.50%
        assert_eq!(res.bpn_ht_pnbp_fee, "2500000"); // tier 1b-10b
        assert_eq!(res.credit_agreement_fee, "3000000"); // 0.25%
        assert_eq!(res.total_notary_fee, "19600000");
    }

    #[test]
    fn test_golden_case_kpr_notary_fee_starter_300m() {
        let property_value = dec!(300000000);
        let loan_principal = dec!(240000000);

        let res = calculate_kpr_notary_fee_internal(property_value, loan_principal).unwrap();
        assert_eq!(res.ajb_fee, "3000000"); // 1.00%
        assert_eq!(res.apht_fee, "1200000"); // 0.50%
        assert_eq!(res.bpn_ht_pnbp_fee, "50000"); // tier <= 250m
        assert_eq!(res.credit_agreement_fee, "600000"); // 0.25%
        assert_eq!(res.total_notary_fee, "5450000");
    }

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

