import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId } = req.body

  try {
    const todolist = await prisma.todo.findMany({
      where: {
        userId,
      },
    })

    res.status(200).json(todolist)
  } catch (error) {
    res.status(500).json({ error })
  }
}
