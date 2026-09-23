import { Database } from '../db'

// DEFECT: SRP violation — this class handles persistence, business logic, AND formatting
export class OrderService {
  private db: Database

  constructor() {
    // DEFECT: DIP violation — hardcoded dependency, not injected
    this.db = new Database()
  }

  async getOrderSummary(orderId: string): Promise<any> {
    // Layer 1: DB query (should be in a repository)
    const order = await this.db.query(`SELECT * FROM orders WHERE id = ${orderId}`)

    // Layer 2: Business / pricing logic (should be in a domain service)
    const lines = order.lines || []
    let total = 0
    for (const line of lines) {
      const price = line.qty * line.unitPrice
      const discount = price > 100 ? price * 0.1 : 0
      total += price - discount
    }

    // Layer 3: Response formatting (should be in the controller)
    return {
      orderId: order.id,
      customerName: order.user?.name ?? 'Unknown',
      totalFormatted: `$${total.toFixed(2)}`,
      lineCount: lines.length,
      status: total > 500 ? 'HIGH_VALUE' : 'STANDARD',
    }
  }
}
