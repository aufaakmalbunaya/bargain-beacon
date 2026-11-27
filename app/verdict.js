// The "is it really a deal" signal. Every verdict comes from the discount
// against the usual price, so the numbers on the card always back the label.

export function discountPercent(deal) {
  return Math.round((1 - deal.price / deal.was) * 100);
}

export function saving(deal) {
  return Math.round((deal.was - deal.price) * 100) / 100;
}

// Four honest bands. A small cut on a new model is labelled a modest cut,
// never dressed up as a blowout.
export function verdict(deal) {
  const pct = discountPercent(deal);
  if (pct >= 55) return { label: "True low", tone: "low", blurb: `${pct}% off list — a genuine low, not a routine sale.` };
  if (pct >= 40) return { label: "Strong deal", tone: "strong", blurb: `${pct}% off list — a strong cut worth acting on.` };
  if (pct >= 25) return { label: "Solid deal", tone: "solid", blurb: `${pct}% off list — a real saving, not the year's best.` };
  return { label: "Modest cut", tone: "modest", blurb: `${pct}% off list — a real cut, but a small one; wait if you can.` };
}

export const usd = (n) =>
  "$" + Number(n).toLocaleString("en-US", { minimumFractionDigits: Number.isInteger(n) ? 0 : 2, maximumFractionDigits: 2 });

export const checkedLabel = (iso) =>
  new Date(iso).toLocaleString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "UTC" }) + " UTC";
