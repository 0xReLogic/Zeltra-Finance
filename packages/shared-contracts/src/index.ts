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

