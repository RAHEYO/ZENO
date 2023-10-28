import { NextApiRequest, NextApiResponse } from "next"

import { User } from '@/Utils/UserUtils';
import { establishConnection } from "@/Config"


export const fetchSendersInIds = (ids: number[]): string => {
    return `SELECT id, username, pic FROM users WHERE id IN (${ids.join(", ")});`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const dbConnection = await establishConnection();
    
    try {
        if (req.method === 'GET' && req.query["ids"] !== undefined) {
            const { ids } = req.query;
            const parsedIds = JSON.parse(`[${ids as string}]`) as number[];

            const query = fetchSendersInIds(parsedIds);
            const [rows] = await dbConnection.execute(query);
            const parsedSenders = JSON.parse(JSON.stringify(rows));
            const users: User[] = parsedSenders.map((row: any) => {
                return {
                    id: row.id,
                    username: row.username,
                    pic: row.pic,
                    email: "",
                    pass: "",
                    space: NaN,
                    settings: {}
                } as User;
            });

            res.status(200).json({ users });
        }

        res.status(200).json({ message: "Hello World!" });


    } catch (error) {
        console.warn(error);
        res.status(500).json({ error });
    }
}



