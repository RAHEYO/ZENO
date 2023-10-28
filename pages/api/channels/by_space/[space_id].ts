import { NextApiRequest, NextApiResponse } from "next";

import { dummyUserSpaceId } from "../../Space";
import { establishConnection } from "@/Config";

export const enum ChannelCategory {
    Chat=1,
    Board=2
};

export type Channel = {
    id: number, // The unique number id of the channel
    space_id: number, // Which space does the channel belong to? 
    name: string,
    description: string,
    category: ChannelCategory, // Which category (type of channel) that it belongs to
}

const fetchSpaceChannels = (space_id: number): string => {
    return `SELECT id, space_id, name, category+0 FROM channels WHERE space_id = ${space_id};`;
}

const fetchChannelByIdGeneral = (channel_id: number): string => {
    return `SELECT id, space_id, name, category+0 FROM channels WHERE id = ${channel_id}`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const space_id = Number(req.query['space_id']);

    try {
        if (req.method === 'GET') {
            const dbConnection = await establishConnection();
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
            const dbConnection = await establishConnection();
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

export const dummyChannels: Channel[] = [
    {
        id: dummyUserSpaceId,
        space_id: dummyUserSpaceId,
        name: 'Home',
        description: '',
        category: ChannelCategory.Board
    },
    { 
        id: 2,
        space_id: dummyUserSpaceId,
        name: 'Chat with Brandon',
        description: '',
        category: ChannelCategory.Chat
    },
    { 
        id: 3,
        space_id: dummyUserSpaceId,
        name: 'Chat with Jayden',
        description: '',
        category: ChannelCategory.Chat
    },
    { 
        id: 4,
        space_id: dummyUserSpaceId,
        name: 'Chat with William',
        description: '',
        category: ChannelCategory.Chat
    },
    { 
        id: 5,
        space_id: 1,
        name: 'General',
        description: '',
        category: ChannelCategory.Chat
    },
    { 
        id: 6,
        space_id: 1,
        name: 'Dev Team',
        description: '',
        category: ChannelCategory.Chat
    },
    { 
        id: 7,
        space_id: 1,
        name: 'Research',
        description: '',
        category: ChannelCategory.Chat
    },
    {
        id: 8,
        space_id: 2,
        name: 'Product',
        description: '',
        category: ChannelCategory.Chat
    },
    { 
        id: 9,
        space_id: 2,
        name: 'Front-end',
        description: '',
        category: ChannelCategory.Chat
    },
    { 
        id: 10,
        space_id: 2,
        name: 'Back-end',
        description: '',
        category: ChannelCategory.Chat
    },
    { 
        id: 11,
        space_id: 3,
        name: 'Team',
        description: '',
        category: ChannelCategory.Chat
    },
    { 
        id: 12,
        space_id: 4,
        name: 'General',
        description: '',
        category: ChannelCategory.Chat
    },
    { 
        id: 13,
        space_id: 5,
        name: 'Course',
        description: '',
        category: ChannelCategory.Chat
    },
    { 
        id: 14,
        space_id: 6,
        name: 'Get Help',
        description: '',
        category: ChannelCategory.Chat
    },
];

// dummyChannels.forEach((channel, _) => {
//     const queryString = `INSERT INTO channels (id, space_id, name, description, category) VALUES (${channel.id}, ${channel.space_id}, '${channel.name}', '${channel.description}', ${channel.category});`;
//     console.log(queryString);
//     query(queryString);
// });

