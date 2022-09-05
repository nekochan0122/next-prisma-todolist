import { prisma } from '@/lib/prisma'
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { title, description } = req.body

  try {
    const session = await prisma.session.findUnique({
      where: {
        sessionToken: req.cookies['next-auth.session-token'],
      },
      select: {
        userId: true,
      },
    })

    if (!session?.userId) throw new Error('User not found')

    const todo = await prisma.todo.create({
      data: {
        title,
        description,
        userId: session.userId,
      },
    })

    res.status(200).json(todo)
  } catch (error) {
    res.status(500).json({ error })
  }
}
