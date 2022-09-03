import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  try {
    const deletedTodo = await prisma.todo.delete({
      where: {
        id: Number(id),
      },
    })

    res.status(200).json(deletedTodo)
  } catch (error) {
    res.status(500).json({ error })
  }
}
