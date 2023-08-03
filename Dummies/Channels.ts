import { dummyUserSpaceId } from "./Spaces";

export type Channel = {
    id: string,
    space_id: string, // Which space does the channel belong to? 
    name: string,
    category: string, // Which category (type of channel) that it belongs to
    settings: {} // Settings for permissions and activities and stuff
}

const dummyChannels: Channel[] = [
    {
        id: dummyUserSpaceId,
        space_id: dummyUserSpaceId,
        name: 'Home',
        category: 'Chat',
        settings: {}
    },
    { 
        id: 'UserSpace0',
        space_id: dummyUserSpaceId,
        name: 'Chat with Brandon',
        category: 'Chat',
        settings: {}
    },
    { 
        id: 'UserSpace1',
        space_id: dummyUserSpaceId,
        name: 'Chat with Jayden',
        category: '',
        settings: {}
    },
    { 
        id: 'UserSpace2',
        space_id: dummyUserSpaceId,
        name: 'Chat with William',
        category: '',
        settings: {}
    },
    { 
        id: '0',
        space_id: '0',
            name: 'General',
        category: '',
        settings: {}
    },
    { 
        id: '1',
        space_id: '0',
        name: 'Dev Team',
        category: '',
        settings: {}
    },
    { 
        id: '2',
        space_id: '0',
        name: 'Front-end',
        category: '',
        settings: {}
    },
    { 
        id: '3',
        space_id: '0',
        name: 'Back-end',
        category: '',
        settings: {}
    },
    { 
        id: '4',
        space_id: '0',
        name: 'Research',
        category: '',
        settings: {}
    },
];

export default dummyChannels;
