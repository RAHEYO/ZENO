import { NextApiRequest, NextApiResponse } from "next";

import { establishConnection } from "@/Config";
import { Message } from "@/Utils/MessageUtils";
import { fetchUsersInIds } from "../users/User";
import { User } from "@/Utils/UserUtils";
/*
    Typescript Date Type Initialization:
    * Specifying the date-time
        new Date (year, month, date, hour, minute, second, millisecond);

    * Using a date string
        new Date(datestring);
    
    * Miliseconds since 1970 (UTC)
        new Date(milliseconds);
*/

export const fetchChannelMessages = (channelId: number): string => {
    return `SELECT * FROM messages WHERE channel_id = ${channelId} ORDER BY sent_time ASC`;
}

export const sendMessage = (channel_id: number, sender: number, content: string, sent_time: Date): string => {
    return `INSERT INTO messages (content, sender, channel_id, sent_time) VALUES ('${content}', ${sender}, ${channel_id}, '${sent_time}');`;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const channel_id = Number(req.query['channel_id']);
    
    try {
        const dbConnection = await establishConnection();

        if (req.method === 'GET') {
            const messagesQuery = fetchChannelMessages(Number(channel_id));
            const [msgsRows] = await dbConnection.execute(messagesQuery);
            const parsedMessages = JSON.parse(JSON.stringify(msgsRows));
            const messages: Message[] = parsedMessages.map((row: any) => {
                return {
                    id: row.id,
                    content: row.content,
                    sender: row.sender,
                    channel_id: row.channel_id,
                    sent_time: row.sent_time
                }
            });

            if (messages.length != 0) {
                const senderIds = [... new Set(messages.map(msg => msg.sender))];
                const senderQuery = fetchUsersInIds(senderIds);
                const [sendersRows] = await dbConnection.execute(senderQuery);
                const parsedSenders = JSON.parse(JSON.stringify(sendersRows));
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

                res.status(200).json({ messages, users });
            }


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

