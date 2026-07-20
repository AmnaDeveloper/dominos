import type { Metadata } from "next";
import Link from "next/link";
import LastUpdated from "@/components/LastUpdated";
import { generatePageSEO } from "@/lib/seo-config";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return generatePageSEO({
    title: "Accessibility Statement",
    description: "Our commitment to WCAG 2.1 AA accessibility on the Domino's Menu Guide, and how to report accessibility issues.",
    path: "/accessibility",
  });
}

export default function AccessibilityPage() {
  return (
    <div className="container-max py-12 max-w-3xl">
      <LastUpdated />
      <h1 className="post-article-title mt-3 mb-6">Accessibility Statement</h1>
      <div className="blog-content">
        <p>We are committed to making the Domino&apos;s Menu Guide accessible to everyone, including people with disabilities, and we aim to conform to the <strong>Web Content Accessibility Guidelines (WCAG) 2.1 Level AA</strong>.</p>
        <h2>What We Do</h2>
        <ul>
          <li>Use semantic HTML and clear heading structure for screen readers.</li>
          <li>Maintain color contrast that meets WCAG AA (4.5:1 for body text).</li>
          <li>Provide descriptive alt text for meaningful images.</li>
          <li>Ensure keyboard navigability and visible focus indicators.</li>
          <li>Use responsive layouts that work across devices and zoom levels.</li>
        </ul>
        <h2>Ongoing Effort</h2>
        <p>Accessibility is an ongoing process. We review new content and features for accessibility and welcome feedback that helps us improve.</p>
        <h2>Report an Issue</h2>
        <p>If you encounter an accessibility barrier, please <Link href="/contact">contact us</Link> with the page and a description of the problem, and we&apos;ll work to fix it promptly.</p>
      </div>
    </div>
  );
}
