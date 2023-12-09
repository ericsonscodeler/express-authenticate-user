import { Request, Response } from 'express'
import { z } from 'zod'
import prisma from '../configs/prisma'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const key = process.env.SECRET_KEY

const authenticateSchema = z.object({
  email: z.string(),
  password: z.string(),
})

export const authenticateUser = async (req: Request, res: Response) => {
  const { email, password } = authenticateSchema.parse(req.body)

  const user = await prisma.user.findUnique({
    where: { email },
  })

  if (!user) {
    return res.status(409).json({ error: 'User not found.' })
  }

  const isValidPassword = await bcrypt.compare(password, user.password)
  console.log(isValidPassword)

  if (!isValidPassword) {
    return res.status(409).json({ error: 'User not found.' })
  }

  if (!key) {
    return res.status(500).json({ error: 'Internal Error' })
  }

  const token = jwt.sign(
    {
      payload: user.id,
    },
    key,
    {
      expiresIn: 86400, // 24 horas
    },
  )

  return res.status(200).json({
    access_token: token,
  })
}
