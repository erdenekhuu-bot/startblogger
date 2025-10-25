import type { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    switch (req.method) {
        case 'POST':
            const { firstname, lastname, about, jobposition, userId } = req.body;

            const checkout = await prisma.profile.findFirst({
                where: {
                    firstname,
                },
            });

            if (checkout) {
                return res.status(403).json({ success:false, data: 'Profile already exists' });
            }


            const profile = await prisma.profile.create({
                data: {
                    firstname,
                    lastname,
                    about,
                    jobposition,
                    userId,
                },
            });

            return res.status(200).json({success: true,data: profile});

        default:
            return res.status(405).json({ error: 'Method not allowed' });
    }
}