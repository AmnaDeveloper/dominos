import type { Metadata } from "next";
import RestaurantHoursSection from "@/components/RestaurantHoursSection";
import FAQJsonLd from "@/components/FAQJsonLd";
import FaqAccordion from "@/components/FaqAccordion";
import InternalLinks from "@/components/seo/InternalLinks";
import LastUpdated from "@/components/LastUpdated";
import { generatePageSEO } from "@/lib/seo-config";
import { getMonthYear } from "@/lib/utils/date";
import type { FAQ } from "@/data/types";

export const revalidate = 86400;

export function generateMetadata(): Metadata {
  const month = getMonthYear();
  return generatePageSEO({
    title: `Domino's Hours (${month}): Opening, Closing & Late-Night Times`,
    description:
      "What time does Domino's open and close? Typical hours by day, late-night delivery times, holiday hours and how to check your local store. Hours vary by location — verify on the official app.",
    path: "/hours",
    keywords: ["Domino's hours", "Domino's late night", "what time does Domino's close", "what time does Domino's open"],
  });
}

const faqs: FAQ[] = [
  { question: "What time does Domino's open?", answer: "Most stores open around 10:00 AM, though it varies by location. A few open earlier for lunch traffic, so check your local store if you want an early order." },
  { question: "What time does Domino's close?", answer: "Many stores close around midnight, with extended hours until 1:00 AM on Fridays and Saturdays. Plenty of metro locations stay open late every single night." },
  { question: "Does Domino's deliver late at night?", answer: "Yes. A lot of locations deliver until midnight or 1:00 AM, which makes Domino's one of the most reliable late-night food options when almost nothing else is open." },
  { question: "Are Domino's hours the same everywhere?", answer: "No. Each franchise sets its own hours, so a store two towns over may close earlier or later than yours. Always confirm on the official Domino's app or locator." },
  { question: "Is Domino's open on holidays?", answer: "Many locations open on major holidays but often with reduced hours, and some close entirely on days like Thanksgiving or Christmas. Check the official app for holiday hours near you before you head out." },
  { question: "How do I check my exact store's hours?", answer: "Enter your address in the official Domino's app or website. It shows your assigned store's live hours and whether it's currently open for delivery or carryout." },
];

export default function HoursPage() {
  const month = getMonthYear();
  return (
    <>
      <FAQJsonLd faqs={faqs} />
      <div style={{ background: "linear-gradient(135deg,#006491,#003F5C)" }} className="text-white">
        <div className="container-max py-14">
          <LastUpdated />
          <h1 className="post-hero-title mt-3">Domino&apos;s Hours ({month})</h1>
          <p className="mt-4 max-w-2xl text-white/85 leading-relaxed">
            Wondering what time Domino&apos;s opens or closes near you? Here are
            the typical opening, closing and late-night hours, plus how holidays
            work and how to check your exact store. Individual locations set
            their own hours, so always confirm on the official app.
          </p>
        </div>
      </div>

      <div className="container-max pt-14">
        {/* Typical hours */}
        <section className="mb-12 max-w-3xl">
          <h2 className="section-mini-heading mb-4">Typical Domino&apos;s Hours by Day</h2>
          <p className="text-slate-700 leading-relaxed mb-5">
            Most Domino&apos;s stores follow a similar rhythm: open late morning,
            close around midnight, and stretch a bit later on weekends when the
            orders keep coming. Here&apos;s the pattern you&apos;ll usually find.
          </p>
          <div className="blog-content">
            <table>
              <thead><tr><th>Day</th><th>Typical Open</th><th>Typical Close</th></tr></thead>
              <tbody>
                <tr><td>Monday</td><td>10:00 AM</td><td>12:00 AM</td></tr>
                <tr><td>Tuesday</td><td>10:00 AM</td><td>12:00 AM</td></tr>
                <tr><td>Wednesday</td><td>10:00 AM</td><td>12:00 AM</td></tr>
                <tr><td>Thursday</td><td>10:00 AM</td><td>12:00 AM</td></tr>
                <tr><td>Friday</td><td>10:00 AM</td><td>1:00 AM</td></tr>
                <tr><td>Saturday</td><td>10:00 AM</td><td>1:00 AM</td></tr>
                <tr><td>Sunday</td><td>10:00 AM</td><td>12:00 AM</td></tr>
              </tbody>
            </table>
          </div>
          <p className="price-disclaimer">Example hours — metro and campus stores often run later. Verify your store on the official app.</p>
        </section>
      </div>

      <RestaurantHoursSection />

      <div className="container-max">
        {/* Late-night */}
        <section className="mb-12 rounded-2xl p-8" style={{ backgroundColor: "#E6F2F7" }}>
          <h2 className="section-mini-heading mb-4">Late-Night Ordering</h2>
          <p className="text-slate-700 leading-relaxed max-w-3xl">
            This is one of Domino&apos;s genuine strengths. When the kitchen&apos;s
            closed at home and every other place has shut for the night,
            there&apos;s a good chance your local Domino&apos;s is still taking
            orders. Many stores deliver until midnight, and in cities and near
            campuses, one in the morning isn&apos;t unusual. If you&apos;re a
            night owl, it&apos;s worth knowing exactly how late your store runs —
            because there&apos;s nothing worse than a late-night craving and a
            store that closed twenty minutes ago.
          </p>
        </section>

        {/* Holiday hours */}
        <section className="mb-12 max-w-3xl">
          <h2 className="section-mini-heading mb-4">Holiday Hours</h2>
          <p className="text-slate-700 leading-relaxed">
            Holidays are the one time the usual pattern goes out the window. Many
            Domino&apos;s locations open on major holidays but trim their hours,
            while some close entirely on the big ones like Thanksgiving and
            Christmas Day. Days like New Year&apos;s Eve and the Super Bowl, on
            the other hand, are among the busiest of the year, so expect longer
            waits rather than early closures. The only reliable way to know is to
            check the official app on the day itself, since it reflects each
            store&apos;s real holiday schedule.
          </p>
        </section>

        {/* How to check */}
        <section className="mb-12 max-w-3xl">
          <h2 className="section-mini-heading mb-4">How to Check Your Store&apos;s Exact Hours</h2>
          <p className="text-slate-700 leading-relaxed">
            Because every store sets its own schedule, the numbers on this page
            are a guide, not a guarantee. To get your exact hours, open the
            Domino&apos;s app or site and enter your address — it shows your
            assigned store&apos;s live hours and whether it&apos;s open right now
            for delivery or carryout. Planning a late or holiday order? Check
            before you build your cart, and you&apos;ll never be caught out.
          </p>
        </section>

        <FaqAccordion faqs={faqs} title="Domino's Hours FAQ" />
        <InternalLinks />
      </div>
    </>
  );
}
