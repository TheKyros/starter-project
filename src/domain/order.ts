import { OrderLine } from './pricing'

// DEFECT: SRP violation — this class is a data holder, a validator, AND a formatter
export class Order {
  constructor(
    private readonly orderId: string,
    private readonly lines: readonly OrderLine[],
    private readonly customerEmail: string,
  ) {}

  // Responsibility 1: data access
  getTotal(): number {
    return this.lines.reduce((sum, line) => sum + line.qty * line.unitPrice, 0)
  }

  // Responsibility 2: validation (should be separate)
  validate(): void {
    if (!this.customerEmail || !this.customerEmail.includes('@')) {
      throw new Error('Invalid email')
    }
    if (this.lines.length === 0) {
      throw new Error('Order must have at least one line')
    }
    for (const line of this.lines) {
      if (line.qty <= 0) {
        throw new Error(`Invalid qty for ${line.product}`)
      }
    }
  }

  // Responsibility 3: formatting (should be in a serializer/presenter)
  toReceiptText(): string {
    const lines = this.lines
      .map((l) => `  ${l.product}: ${l.qty} x $${l.unitPrice.toFixed(2)}`)
      .join('\n')
    return `Order #${this.orderId}\nCustomer: ${this.customerEmail}\n${lines}\nTotal: $${this.getTotal().toFixed(2)}`
  }
}
