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

/** "Tuesday" for a YYYY-MM-DD date */
export function weekday(iso: string) {
  return new Date(iso + "T12:00:00").toLocaleDateString("en-US", { weekday: "long" });
}
