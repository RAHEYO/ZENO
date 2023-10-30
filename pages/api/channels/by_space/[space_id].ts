import { NextApiRequest, NextApiResponse } from "next";

import { establishConnection } from "@/Config";
import { Channel } from '@/Utils/ChannelUtils';

const fetchSpaceChannels = (space_id: number): string => {
    return `SELECT id, space_id, name, category+0 FROM channels WHERE space_id = ${space_id};`;
}

const fetchChannelByIdGeneral = (channel_id: number): string => {
    return `SELECT id, space_id, name, category+0 FROM channels WHERE id = ${channel_id}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const space_id = Number(req.query['space_id']);

    try {
        const dbConnection = await establishConnection();

        if (req.method === 'GET') {
            const query = fetchSpaceChannels(space_id);

            const [rows] = await dbConnection.execute(query);
            const parsedChannels = JSON.parse(JSON.stringify(rows));
            const channels: Channel[] = parsedChannels.map((row: any) => {
                return { 
                    id: row.id, 
                    space_id: row.space_id, 
                    name: row.name, 
                    category: row['category+0'], 
                    description: ""
                } as Channel;
            });
            
            res.status(200).json({ channels });
        } else if (req.method === 'POST') {
            const { space_id, name, category } = JSON.parse(req.body);
            const query = `INSERT INTO channels (space_id, name, category) VALUES (${space_id}, '${name}', ${category});`;
            console.warn(query);
            await dbConnection.execute(query);
            res.status(200).json({ message: `Channel created successfully!` });
        }
    } catch (error) {
        console.warn(error);
        res.status(500).json({ error });
    }
}

// dummyChannels.forEach((channel, _) => {
//     const queryString = `INSERT INTO channels (id, space_id, name, description, category) VALUES (${channel.id}, ${channel.space_id}, '${channel.name}', '${channel.description}', ${channel.category});`;
//     console.log(queryString);
//     query(queryString);
// });

