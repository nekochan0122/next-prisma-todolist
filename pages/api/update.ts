import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id, title, description, status } = req.body

  try {
    const updatedTodo = await prisma.todo.update({
      where: {
        id: Number(id),
      },
      data: {
        title,
        description,
        status,
      },
    })

    res.status(200).json(updatedTodo)
  } catch (error) {
    res.status(500).json({ error })
  }
}
