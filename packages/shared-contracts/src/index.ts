export type CalculatorCategory =
  | 'kredit-pembiayaan'
  | 'pajak-penghasilan'
  | 'investasi-pasar-uang'
  | 'perencanaan-pensiun'
  | 'keuangan-keluarga'
  | 'asuransi-manajemen-risiko'
  | 'bisnis-umkm'
  | 'fintech-kripto'
  | 'internasional-forex'
  | 'analisis-properti';

export interface FieldValidation {
  min?: number;
  max?: number;
  step?: number;
  required: boolean;
  errorMessage?: string;
}

export interface InputFieldSchema {
  id: string;
  label: string;
  description?: string;
  type: 'currency' | 'percentage' | 'number' | 'select' | 'slider';
  defaultValue: number | string;
  validation: FieldValidation;
  options?: Array<{ label: string; value: string | number }>;
  unit?: string;
}

export interface OutputFieldSchema {
  id: string;
  label: string;
  type: 'currency' | 'percentage' | 'number' | 'badge';
  highlight?: boolean;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface SimulationTableData {
  caption: string;
  columns: string[];
  rows: Array<Array<string | number>>;
}

export interface ChainedCalculator {
  title: string;
  slug: string;
  category: CalculatorCategory;
  description: string;
}

export interface SeoSchema {
  title: string;
  description: string;
  h1: string;
  directAnswerSnippet: string;
  faq: FaqItem[];
  simulationTableData: SimulationTableData;
  chainedCalculators: ChainedCalculator[];
}

export interface CalculatorSchema {
  id: string;
  slug: string;
  name: string;
  category: CalculatorCategory;
  engineFunction: string;
  inputs: InputFieldSchema[];
  outputs: OutputFieldSchema[];
  seo: SeoSchema;
}

export interface AmortizationRow {
  month: number;
  principal_payment: string;
  interest_payment: string;
  total_installment: string;
  remaining_balance: string;
}

export interface LoanCalculationResult {
  monthly_installment: string;
  total_interest_paid: string;
  total_payment: string;
  schedule: AmortizationRow[];
}

export interface GeneralLoanCalculationResult {
  property_price: string;
  down_payment: string;
  principal: string;
  calculation_type: string;
  first_month_installment: string;
  last_month_installment: string;
  total_interest_paid: string;
  total_payment: string;
  provision_fee: string;
  estimated_admin_fee: string;
  estimated_legal_notary_fee: string;
  total_upfront_cost: string;
  recommended_minimum_income: string;
  schedule: AmortizationRow[];
}

export interface PropertyTitleTransferResult {
  property_value: string;
  bpn_pnbp_fee: string;
  bpn_check_fee: string;
  total_bpn_cost: string;
  ppat_fee: string;
  ppat_rate_percent: string;
  admin_validation_fee: string;
  total_title_transfer_cost: string;
}

export interface BphtbCalculationResult {
  property_value: string;
  npoptkp: string;
  taxable_value: string;
  tax_rate_percent: string;
  bphtb_due: string;
}

export interface PropertySellerTaxResult {
  gross_value: string;
  tax_rate_percent: string;
  pph_final_amount: string;
  net_proceeds: string;
}

export interface KprNotaryFeeResult {
  property_value: string;
  loan_principal: string;
  ajb_fee: string;
  ajb_rate_percent: string;
  apht_fee: string;
  apht_rate_percent: string;
  bpn_ht_pnbp_fee: string;
  credit_agreement_fee: string;
  certificate_check_fee: string;
  admin_validation_fee: string;
  total_notary_fee: string;
}

export interface HomeAffordabilityResult {
  monthly_income: string;
  other_debts: string;
  dsr_percent: string;
  max_monthly_installment: string;
  max_loan_principal: string;
  down_payment_percent: string;
  required_down_payment: string;
  max_property_price: string;
  annual_rate_percent: string;
  tenor_months: number;
}

export interface RentVsBuyResult {
  property_price: string;
  initial_monthly_rent: string;
  analysis_period_years: number;
  total_buy_initial_cost: string;
  monthly_kpr_installment: string;
  buy_property_future_value: string;
  buy_remaining_loan: string;
  buy_net_wealth: string;
  rent_investment_future_value: string;
  rent_cashflow_investment_value: string;
  rent_total_net_wealth: string;
  net_difference: string;
  recommendation: string;
  break_even_year?: number;
}





