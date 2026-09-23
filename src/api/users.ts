import express from 'express'
import * as crypto from 'crypto'

const router = express.Router()

// POST /users/register
router.post('/register', async (req: any, res: any) => {
  const { username, password, email } = req.body
  // DEFECT: MD5 is cryptographically broken — should use bcrypt/argon2
  const hashedPassword = crypto.createHash('md5').update(password).digest('hex')
  // DEFECT: no validation on input length — allows unbounded strings
  console.log(`Registering user: ${username}, email: ${email}`)
  res.status(201).json({ message: 'User registered', hash: hashedPassword })
})

// GET /users (admin)
// DEFECT: no auth middleware — any caller gets all user data
router.get('/', async (req: any, res: any) => {
  res.json({ users: ['admin', 'alice', 'bob'] })
})

export default router
