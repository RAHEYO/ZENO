import { dummyUserSpaceId } from "./Spaces";

export type Channel = {
    id: number, // The unique number id of the channel
    space_id: number, // Which space does the channel belong to? 
    name: string,
    desc: string,
    category: string, // Which category (type of channel) that it belongs to
    settings: {} // Settings for permissions and activities and stuff
}

const dummyChannels: Channel[] = [
    {
        id: dummyUserSpaceId,
        space_id: dummyUserSpaceId,
        name: 'Home',
        desc: '',
        category: 'Chat',
        settings: {}
    },
    { 
        id: 1,
        space_id: dummyUserSpaceId,
        name: 'Chat with Brandon',
        desc: '',
        category: 'Chat',
        settings: {}
    },
    { 
        id: 2,
        space_id: dummyUserSpaceId,
        name: 'Chat with Jayden',
        desc: '',
        category: '',
        settings: {}
    },
    { 
        id: 3,
        space_id: dummyUserSpaceId,
        name: 'Chat with William',
        desc: '',
        category: '',
        settings: {}
    },
    { 
        id: 4,
        space_id: 1,
        name: 'General',
        desc: '',
        category: '',
        settings: {}
    },
    { 
        id: 5,
        space_id: 1,
        name: 'Dev Team',
        desc: '',
        category: '',
        settings: {}
    },
    { 
        id: 6,
        space_id: 1,
        name: 'Research',
        desc: '',
        category: '',
        settings: {}
    },
    {
        id: 7,
        space_id: 2,
        name: 'Product',
        desc: '',
        category: '',
        settings: {}
    },
    { 
        id: 8,
        space_id: 2,
        name: 'Front-end',
        desc: '',
        category: '',
        settings: {}
    },
    { 
        id: 9,
        space_id: 2,
        name: 'Back-end',
        desc: '',
        category: '',
        settings: {}
    },
    { 
        id: 10,
        space_id: 3,
        name: 'Team',
        desc: '',
        category: '',
        settings: {}
    },
    { 
        id: 11,
        space_id: 4,
        name: 'General',
        desc: '',
        category: '',
        settings: {}
    },
    { 
        id: 12,
        space_id: 5,
        name: 'Course',
        desc: '',
        category: '',
        settings: {}
    },
];

export default dummyChannels;
