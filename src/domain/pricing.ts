export interface OrderLine {
  readonly product: string
  readonly qty: number
  readonly unitPrice: number
}

export function calculateLineTotal(qty: number, unitPrice: number): number {
  return qty * unitPrice
}

export function applyDiscount(total: number, threshold = 100.0, rate = 0.1): number {
  if (total > threshold) {
    return total * (1 - rate)
  }
  return total
}

export function calculateOrderTotal(lines: readonly OrderLine[]): number {
  const subtotal = lines.reduce((sum, line) => sum + calculateLineTotal(line.qty, line.unitPrice), 0)
  return applyDiscount(subtotal)
}
