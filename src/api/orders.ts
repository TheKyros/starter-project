import express from 'express'
import { Database } from '../db'

const router = express.Router()

// GET /orders/:id
router.get('/:id', async (req: any, res: any) => {
  const id = req.params.id
  // DEFECT: SQL injection — string concatenation instead of parameterized query
  const query = "SELECT * FROM orders WHERE id = " + id
  const result = await Database.query(query)
  res.json(result)
})

// POST /orders
router.post('/', async (req: any, res: any) => {
  // DEFECT: req.body typed as any — no validation, no typing
  const body: any = req.body
  const query = "INSERT INTO orders (user_id, product, qty) VALUES ('"
    + body.userId + "', '" + body.product + "', " + body.qty + ")"
  await Database.query(query)
  res.status(201).json({ message: 'Order created' })
})

export default router
