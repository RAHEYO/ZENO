import { dummyUserSpaceId } from "./Space";

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

export const fetchSpaceChannels = (space_id: number): string => {
    return `SELECT id, space_id, name, category+0 FROM channels WHERE space_id = ${space_id};`;
}

export const fetchChannelByIdGeneral = (channel_id: number): string => {
    return `SELECT id, space_id, name, category+0 FROM channels WHERE id = ${channel_id}`;
}

const dummyChannels: Channel[] = [
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

export default dummyChannels;