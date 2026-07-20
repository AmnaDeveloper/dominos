"use client";

import { useEffect } from "react";
import { getTodayFormatted } from "@/lib/utils/date";

/**
 * Walks the DOM after hydration and rewrites any text node containing
 * "LAST UPDATED:" / "UPDATED AT:" so the visible freshness date is always
 * today, even on statically cached (ISR) pages. Renders nothing.
 */
export default function AutoDateUpdater() {
  useEffect(() => {
    const today = getTodayFormatted();
    const patterns = [/LAST UPDATED:\s*.*/i, /UPDATED AT:\s*.*/i];

    const walker = document.createTreeWalker(
      document.body,
      NodeFilter.SHOW_TEXT,
      null
    );

    const nodes: Text[] = [];
    let current = walker.nextNode();
    while (current) {
      nodes.push(current as Text);
      current = walker.nextNode();
    }

    nodes.forEach((node) => {
      const text = node.textContent || "";
      for (const pattern of patterns) {
        if (pattern.test(text)) {
          const label = /UPDATED AT/i.test(text) ? "UPDATED AT" : "LAST UPDATED";
          node.textContent = `${label}: ${today}`;
          break;
        }
      }
    });
  }, []);

  return null;
}
