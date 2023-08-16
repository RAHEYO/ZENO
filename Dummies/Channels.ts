import { dummyUserSpaceId } from "./Spaces";

export type Channel = {
    id: number, // The unique number id of the channel
    space_id: number, // Which space does the channel belong to? 
    name: string,
    category: string, // Which category (type of channel) that it belongs to
    settings: {} // Settings for permissions and activities and stuff
}

const dummyChannels: Channel[] = [
    {
        id: dummyUserSpaceId,
        space_id: dummyUserSpaceId,
        name: 'Home',
        category: 'Whiteboard',
        settings: {}
    },
    { 
        id: 1,
        space_id: dummyUserSpaceId,
        name: 'Chat with Brandon',
        category: 'Chat',
        settings: {}
    },
    { 
        id: 2,
        space_id: dummyUserSpaceId,
        name: 'Chat with Jayden',
        category: '',
        settings: {}
    },
    { 
        id: 3,
        space_id: dummyUserSpaceId,
        name: 'Chat with William',
        category: '',
        settings: {}
    },
    { 
        id: 4,
        space_id: 1,
        name: 'General',
        category: '',
        settings: {}
    },
    { 
        id: 5,
        space_id: 1,
        name: 'Dev Team',
        category: '',
        settings: {}
    },
    { 
        id: 6,
        space_id: 1,
        name: 'Research',
        category: '',
        settings: {}
    },
    {
        id: 7,
        space_id: 2,
        name: 'Product',
        category: '',
        settings: {}
    },
    { 
        id: 8,
        space_id: 2,
        name: 'Front-end',
        category: '',
        settings: {}
    },
    { 
        id: 9,
        space_id: 2,
        name: 'Back-end',
        category: '',
        settings: {}
    },
    { 
        id: 10,
        space_id: 3,
        name: 'Team',
        category: '',
        settings: {}
    },
    { 
        id: 11,
        space_id: 4,
        name: 'General',
        category: '',
        settings: {}
    },
    { 
        id: 12,
        space_id: 5,
        name: 'Course',
        category: '',
        settings: {}
    },
];

export default dummyChannels;
