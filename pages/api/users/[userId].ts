import {NextApiRequest, NextApiResponse} from 'next'
import prisma from '@/libs/prismadb'

export default async function handler(req : NextApiRequest, res : NextApiResponse) {
    if (req.method != 'GET') {
        return res.status(405).end()
    }

    try {
        const {userId} = req.query

        if (!userId || typeof userId != 'string') {
            throw new Error('invalid id')
        }

        const existingUser = await prisma.user.findUnique({
            where : {
                id : userId
            }
        })

        if (!existingUser) {
            return res.status(404).json({
                message : 'not found'
            })
        }

        const followersCount = await prisma.user.count({
            where : {
                followingIds : {
                    has : userId
                }
            }
        })

        return res.status(200).json({
            data : {
                ...existingUser, followersCount
            }
        })
    } catch (error) {
        console.log(error)
        res.status(400).end()
    }
}