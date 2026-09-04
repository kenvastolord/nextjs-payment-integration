export function formatPrice(minorUnits: number): string {
  return (minorUnits / 100).toFixed(2);
}
