import React from 'react';
import { ExtendedCalculatorSchema } from '../schemas/kpr-bank-bca';

interface DualJsonLdSchemaProps {
  schema: ExtendedCalculatorSchema;
  canonicalUrl: string;
}

export function DualJsonLdSchema({ schema, canonicalUrl }: DualJsonLdSchemaProps) {
  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: schema.seo.h1,
    url: canonicalUrl,
    description: schema.seo.description,
    applicationCategory: 'FinanceApplication',
    operatingSystem: 'All',
    browserRequirements: 'Requires WebAssembly support',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'IDR',
    },
    featureList: schema.inputs.map((i) => i.label),
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: schema.seo.faq.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
