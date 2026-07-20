import { getTodayFormatted } from "@/lib/utils/date";

export default function LastUpdated({ prefix = "Last Updated" }: { prefix?: string }) {
  return (
    <span
      className="inline-flex items-center gap-1 text-xs font-semibold px-3 py-1 rounded-full"
      style={{ backgroundColor: "#E6F2F7", color: "#006491" }}
    >
      {prefix.toUpperCase()}: {getTodayFormatted()}
    </span>
  );
}
