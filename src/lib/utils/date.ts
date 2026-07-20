/**
 * Date helpers — used for ISR freshness (month/date injected into titles,
 * meta, and "Last Updated" labels).
 */

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];

/** e.g. "July 19, 2026" */
export function getTodayFormatted(date: Date = new Date()): string {
  return `${MONTHS[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
}

/** e.g. "July 2026" */
export function getMonthYear(date: Date = new Date()): string {
  return `${MONTHS[date.getMonth()]} ${date.getFullYear()}`;
}

/** e.g. { month: "July", year: 2026, date: "July 19, 2026" } */
export function getLastUpdated(date: Date = new Date()) {
  return {
    month: MONTHS[date.getMonth()],
    year: date.getFullYear(),
    monthYear: getMonthYear(date),
    date: getTodayFormatted(date),
    iso: date.toISOString(),
    isoDate: date.toISOString().split("T")[0],
  };
}

/** Current year, e.g. 2026 */
export function getYear(date: Date = new Date()): number {
  return date.getFullYear();
}
