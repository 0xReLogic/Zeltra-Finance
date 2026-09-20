import { kprBankBcaSchema, ExtendedCalculatorSchema } from './kpr-bank-bca';

export const allCalculatorSchemas: ExtendedCalculatorSchema[] = [
  kprBankBcaSchema,
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
