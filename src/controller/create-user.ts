import { Request, Response } from 'express'
import prisma from '../configs/prisma'

import bcrypt from 'bcrypt'
import { z } from 'zod'

const userSchema = z.object({
  email: z.string(),
  password: z.string(),
  name: z.string(),
})

export const createUser = async (req: Request, res: Response) => {
  const { email, password, name } = userSchema.parse(req.body)

  const userExists = await prisma.user.findUnique({
    where: {
      email,
    },
  })

  if (userExists) {
    return res.status(409).json({ error: 'User already exists.' })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      password: hashedPassword,
      name,
    },
  })

  return res.status(200).json(user)
}
