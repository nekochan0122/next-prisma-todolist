import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handeler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { title, content, isDone } = req.body
    const todo = await prisma.todo.create({
      data: {
        title,
        content,
        isDone,
      },
    })
    res.status(200).json(todo)
  } catch (error) {
    res.status(500).json({ error })
  }
}
