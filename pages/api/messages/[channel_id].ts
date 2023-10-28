import { NextApiRequest, NextApiResponse } from "next";
import mysql, { ConnectionOptions }  from 'mysql2/promise';
require('dotenv').config() // Allows us to use .env files without running the entire application!

/*
    Typescript Date Type Initialization:
    * Specifying the date-time
        new Date (year, month, date, hour, minute, second, millisecond);

    * Using a date string
        new Date(datestring);
    
    * Miliseconds since 1970 (UTC)
        new Date(milliseconds);
*/

export type Message = {
    id: number,
    content: string,
    sender: number,
    channel_id: number,
    sent_time: Date
}

export const fetchChannelMessages = (channelId: number): string => {
    return `SELECT * FROM messages WHERE channel_id = ${channelId} ORDER BY sent_time ASC`;
}

export const sendMessage = (channel_id: number, sender: number, content: string, sent_time: Date): string => {
    return `INSERT INTO messages (content, sender, channel_id, sent_time) VALUES ('${content}', ${sender}, ${channel_id}, '${sent_time}');`;
}

const connectionOptions: ConnectionOptions = {
    host: "localhost",
    user: "root",
    database: "zeno",
    password: process.env['NEXT_PUBLIC_LOCAL_SERVER_PASS'],
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const dbConnection = await mysql.createConnection(connectionOptions);

    const channel_id = Number(req.query['channel_id']);
    console.warn(channel_id);

    try {
        if (req.method === 'GET') {
            const query = fetchChannelMessages(Number(channel_id));
            const [rows] = await dbConnection.execute(query);
            const parsedMessages = JSON.parse(JSON.stringify(rows));
            const messages: Message[] = parsedMessages.map((row: any) => {
                return {
                    id: row.id,
                    content: row.content,
                    sender: row.sender,
                    channel_id: row.channel_id,
                    sent_time: row.sent_time
                }
            });
            res.status(200).json({ messages });
        } else if (req.method === 'POST') {
            const { channel_id, sender, content, sent_time } = JSON.parse(req.body);
            const query = sendMessage(channel_id, sender, content, sent_time);

            await dbConnection.execute(query);

            res.status(200).json({ message: `Message sent successfully! ${req.body}` });
        } else if (req.method === 'DELETE') {


        }
        
    } catch(e) {
        console.warn(e as Error);
        res.status(500).json({ error: e });
    }
}

export const dummyMessages: Message[] = [
    {
        id: 0,
        content: "Quantum Computing is kinda cracked, my head's exploding~",
        sender: 0,
        channel_id: 4,
        sent_time: new Date(2023, 7, 14, 8, 42, 13, 983)
    },
    {
        id: 1,
        content: "Maybe check out this Quantum Physics Course on MIT OCW first! @_@",
        sender: 2,
        channel_id: 4,
        sent_time: new Date(2023, 7, 14, 9, 12, 13, 983)
    },
    {
        id: 2,
        content: "Cupid by Fifty-fifty is awesome!!! They'll be the best 4th generation Kpop group ever!!!",
        sender: 0,
        channel_id: 5,
        sent_time: new Date(2023, 7, 20, 18, 12, 13, 983)
    },
    {
        id: 3,
        content: "I don't know about that lol, I think Kpop is just kinda mid...",
        sender: 2,
        channel_id: 5,
        sent_time: new Date(2023, 7, 21, 10, 42, 13, 983)
    },
    {
        id: 4,
        content: "Y'all dumb, Classical Bangers for the win :)",
        sender: 3,
        channel_id: 5,
        sent_time: new Date(2023, 7, 21, 12, 2, 13, 983)
    },
    {
        id: 5,
        content: "Guys y'all are saying off-topic stuff, this is not the way this channel was designed for~ If you wanna talk abt those, consider using the #off-topic channel.",
        sender:2,
        channel_id: 5,
        sent_time: new Date(2023, 7, 21, 13, 11, 13, 983)
    },
    {
        id: 6,
        content: "Y'all dumb, Classical Bangers for the win :)",
        sender: 3,
        channel_id: 5,
        sent_time: new Date(2023, 7, 21, 12, 2, 13, 983)
    },
    {
        id: 7,
        content: "Guys y'all are saying off-topic stuff, this is not the way this channel was designed for~ If you wanna talk abt those, consider using the #off-topic channel.",
        sender:2,
        channel_id: 5,
        sent_time: new Date(2023, 7, 21, 13, 11, 13, 983)
    },
    {
        id: 8,
        content: "Y'all dumb, Classical Bangers for the win :)",
        sender: 3,
        channel_id: 5,
        sent_time: new Date(2023, 7, 21, 12, 2, 13, 983)
    },
    {
        id: 9,
        content: "Guys y'all are saying off-topic stuff, this is not the way this channel was designed for~ If you wanna talk abt those, consider using the #off-topic channel.",
        sender:2,
        channel_id: 5,
        sent_time: new Date(2023, 7, 21, 13, 11, 13, 983)
    },
    {
        id: 10,
        content: "Y'all dumb, Classical Bangers for the win :)",
        sender: 3,
        channel_id: 5,
        sent_time: new Date(2023, 7, 21, 12, 2, 13, 983)
    },
    {
        id: 11,
        content: "Guys y'all are saying off-topic stuff, this is not the way this channel was designed for~ If you wanna talk abt those, consider using the #off-topic channel.",
        sender:2,
        channel_id: 5,
        sent_time: new Date(2023, 7, 21, 13, 11, 13, 983)
    },
    {
        id: 12,
        content: "Y'all dumb, Classical Bangers for the win :)",
        sender: 3,
        channel_id: 5,
        sent_time: new Date(2023, 7, 21, 12, 2, 13, 983)
    },
    {
        id: 13,
        content: "Guys y'all are saying off-topic stuff, this is not the way this channel was designed for~ If you wanna talk abt those, consider using the #off-topic channel.",
        sender:2,
        channel_id: 5,
        sent_time: new Date(2023, 7, 21, 13, 11, 13, 983)
    },
    {
        id: 14,
        content: "Y'all dumb, Classical Bangers for the win :)",
        sender: 3,
        channel_id: 5,
        sent_time: new Date(2023, 7, 21, 12, 2, 13, 983)
    },
    {
        id: 15,
        content: "Guys y'all are saying off-topic stuff, this is not the way this channel was designed for~ If you wanna talk abt those, consider using the #off-topic channel.",
        sender:2,
        channel_id: 5,
        sent_time: new Date(2023, 7, 21, 13, 11, 13, 983)
    },
    {
        id: 16,
        content: "Y'all dumb, Classical Bangers for the win :)",
        sender: 3,
        channel_id: 5,
        sent_time: new Date(2023, 7, 21, 12, 2, 13, 983)
    },
    {
        id: 17,
        content: "Guys y'all are saying off-topic stuff, this is not the way this channel was designed for~ If you wanna talk abt those, consider using the #off-topic channel.",
        sender:2,
        channel_id: 5,
        sent_time: new Date(2023, 7, 21, 13, 11, 13, 983)
    },
];
