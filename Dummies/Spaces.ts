// By default we assume the current user has the id of 0, which infers that the personal space matches the user's id as well
export const dummyUserSpaceId = 0;

export type Space = {
    id: number, // The unique id of the space, the User's personal space has a unique id same as its own user.id
    name: string,
    profilePic: string, // Like the url src of an img
    default_channel: number, // The default channel id of the space
    settings: {}
}

const spaces: Space[] = [
    { // This one is particularly the user's personal space, a dummy user space
        id: dummyUserSpaceId, // Dummy id to be changed
        name: 'me',
        profilePic: 'https://tinyurl.com/Example-Profile-Pic',
        default_channel: dummyUserSpaceId,
        settings: {}
    },
    { 
        id: 1,
        name: 'AI Club',
        profilePic: 'https://tinyurl.com/My-AI-Club',
        default_channel: 4,
        settings: {}
    },
    { 
        id: 2,
        name: 'Next.js Team',
        profilePic: 'https://tinyurl.com/Nextjs-13',
        default_channel: 7,
        settings: {}
    },
    { 
        id: 3,
        name: 'Robotics',
        profilePic: 'https://tinyurl.com/JAMIE-The-Bot',
        default_channel: 10,
        settings: {}
    },
    { 
        id: 4,
        name: 'Science Olympiad',
        profilePic: 'https://tinyurl.com/ApromMan',
        default_channel: 11,
        settings: {}
    },
    { 
        id: 5,
        name: 'Smartest History Support Group',
        profilePic: 'https://tinyurl.com/US-History-Study-Group',
        default_channel: 12,
        settings: {}
    },
];

export default spaces;