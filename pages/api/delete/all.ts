import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const deletedTodos = await prisma.todo.deleteMany()

    res.status(200).json(deletedTodos)
  } catch (error) {
    res.status(500).json({ error })
  }
}
