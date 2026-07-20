import type { FAQ } from "@/data/types";
import { generateFAQSchema } from "@/lib/seo/schema";

export default function FAQJsonLd({ faqs }: { faqs: FAQ[] }) {
  if (!faqs?.length) return null;
  const schema = generateFAQSchema(faqs);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
