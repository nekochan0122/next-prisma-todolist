import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { title, description } = req.body

  try {
    const todo = await prisma.todo.create({
      data: {
        title,
        description,
      },
    })

    res.status(200).json(todo)
  } catch (error) {
    res.status(500).json({ error })
  }
}
