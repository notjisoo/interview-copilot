export function formatMoney(amount: number): string {
  if (amount < 0) return "0.00";
  return amount.toFixed(2);
}
