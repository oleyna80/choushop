export function formatMoney(amount: number, currency = "EUR") {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency
  }).format(amount / 100);
}

export function taxFromTtc(amountTtc: number, taxRateBps: number) {
  const rate = taxRateBps / 10000;
  return Math.round(amountTtc - amountTtc / (1 + rate));
}
