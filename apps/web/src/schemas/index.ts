import { kprBankBcaSchema, ExtendedCalculatorSchema } from './kpr-bank-bca';
import { kprSimulasiUmumSchema } from './kpr-simulasi-umum';
import { kprBankMandiriSchema } from './kpr-bank-mandiri';
import { kprBankBtnSchema } from './kpr-bank-btn';
import { kprBankBriSchema } from './kpr-bank-bri';
import { kprBankBniSchema } from './kpr-bank-bni';
import { kprCimbNiagaSchema } from './kpr-cimb-niaga';
import { kprSyariahMurabahahSchema } from './kpr-syariah-murabahah';
import { kprSyariahMmqSchema } from './kpr-syariah-mmq';
import { biayaBalikNamaSertifikatSchema } from './biaya-balik-nama-sertifikat';
import { pajakBphtbSchema } from './pajak-bphtb';
import { pajakPenjualPphSchema } from './pajak-penjual-pph';
import { biayaNotarisKprSchema } from './biaya-notaris-kpr';
import { kemampuanBeliRumahSchema } from './kemampuan-beli-rumah';

export { type ExtendedCalculatorSchema };

export const allCalculatorSchemas: ExtendedCalculatorSchema[] = [
  kprSimulasiUmumSchema,
  kprBankBcaSchema,
  kprBankMandiriSchema,
  kprBankBtnSchema,
  kprBankBriSchema,
  kprBankBniSchema,
  kprCimbNiagaSchema,
  kprSyariahMurabahahSchema,
  kprSyariahMmqSchema,
  biayaBalikNamaSertifikatSchema,
  pajakBphtbSchema,
  pajakPenjualPphSchema,
  biayaNotarisKprSchema,
  kemampuanBeliRumahSchema,
];











export function getCalculatorBySiloAndSlug(
  silo: string,
  slug: string
): ExtendedCalculatorSchema | undefined {
  return allCalculatorSchemas.find(
    (calc) => calc.silo === silo && calc.slug === slug
  );
}

export function getAllStaticRoutes(): Array<{ silo: string; slug: string }> {
  return allCalculatorSchemas.map((calc) => ({
    silo: calc.silo,
    slug: calc.slug,
  }));
}
