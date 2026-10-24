export function formatDate(iso: string, style: "long" | "short" = "long") {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", {
    weekday: style === "long" ? "long" : "short",
    month: style === "long" ? "long" : "short",
    day: "numeric",
    year: "numeric",
  });
}

export function donateUrl(goFundMe: string, amount?: number) {
  return amount ? `${goFundMe}?amount=${amount}` : goFundMe;
}

export function initials(name: string) {
  return name
    .replace(/^Sh\.?\s+/i, "")
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

/** "Tuesday" for a YYYY-MM-DD date */
export function weekday(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", { weekday: "long" });
}
