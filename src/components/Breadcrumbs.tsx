import Link from "next/link";
import { ChevronRight } from "lucide-react";

export interface Crumb {
  name: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="text-sm">
      <ol className="flex flex-wrap items-center gap-1.5 text-slate-500">
        {items.map((c, i) => {
          const last = i === items.length - 1;
          return (
            <li key={i} className="flex items-center gap-1.5">
              {c.href && !last ? (
                <Link href={c.href} className="hover:text-[#006491] transition-colors">
                  {c.name}
                </Link>
              ) : (
                <span className={last ? "text-slate-700 font-semibold" : ""} aria-current={last ? "page" : undefined}>
                  {c.name}
                </span>
              )}
              {!last && <ChevronRight size={14} className="text-slate-300 shrink-0" />}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
