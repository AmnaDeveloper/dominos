import type { Metadata } from "next";
import InternalLinks from "@/components/seo/InternalLinks";
import LastUpdated from "@/components/LastUpdated";
import { generatePageSEO } from "@/lib/seo-config";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  return generatePageSEO({
    title: "Privacy Policy",
    description: "How the Domino's Menu Guide collects and uses data, including Google AdSense advertising cookies and your ad-personalization choices.",
    path: "/privacy-policy",
  });
}

export default function PrivacyPage() {
  return (
    <div className="container-max py-12 max-w-3xl">
      <LastUpdated />
      <h1 className="post-article-title mt-3 mb-6">Privacy Policy</h1>
      <div className="blog-content">
        <h2>1. Overview</h2>
        <p>This Privacy Policy explains what information the Domino&apos;s Menu Guide (&quot;we&quot;) collects and how we use it. We are an independent, unofficial informational website.</p>

        <h2>2. Information We Collect</h2>
        <p>We collect limited information automatically, such as your IP address, browser type, pages visited and referring URLs, through analytics and advertising tools. If you submit a comment or contact form, we collect the information you provide.</p>

        <h2>3. Cookies</h2>
        <p>We use cookies and similar technologies for essential site function, analytics, and advertising. You can control cookies through your browser settings. See our <a href="/cookies">Cookie Policy</a> for details.</p>

        <h2>4. Google AdSense & Third-Party Advertising</h2>
        <p>We use <strong>Google AdSense</strong> to display ads. Third-party vendors, including Google, use cookies to serve ads based on your prior visits to this and other websites. Google&apos;s use of advertising cookies enables it and its partners to serve ads to you based on your visits.</p>
        <ul>
          <li>You may opt out of personalized advertising by visiting <a href="https://www.google.com/settings/ads" target="_blank" rel="nofollow noopener">Google Ads Settings</a>.</li>
          <li>You can opt out of some third-party vendors&apos; use of cookies at <a href="https://www.aboutads.info/choices/" target="_blank" rel="nofollow noopener">aboutads.info/choices</a>.</li>
          <li>For more on how Google uses data, see <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="nofollow noopener">Google&apos;s partner policy</a>.</li>
        </ul>

        <h2>5. Analytics</h2>
        <p>We use analytics services (such as Google Analytics) to understand how visitors use the site. These tools may set cookies and collect usage data in aggregate.</p>

        <h2>6. How We Use Information</h2>
        <p>We use collected information to operate and improve the site, serve relevant advertising, respond to inquiries, and maintain security. We do not sell your personal information.</p>

        <h2>7. Your Choices</h2>
        <p>You can disable cookies in your browser, opt out of personalized ads via the links above, and request removal of comments you submitted by contacting us.</p>

        <h2>8. Contact & Updates</h2>
        <p>We may update this policy periodically. Questions can be sent via our <a href="/contact">contact page</a>.</p>
      </div>
      <InternalLinks />
    </div>
  );
}
