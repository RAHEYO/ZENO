export const dummyUserSpaceId = '@me';

export type Space = {
    id: string, // The unique id of the space, the User's personal space has a unique id same as its own user.id
    name: string,
    profilePic: string, // Like the url src of an img
    settings: {}
}

const spaces: Space[] = [
    { // This one is particularly the user's personal space, a dummy user space
        id: dummyUserSpaceId, // Dummy id to be changed
        name: 'me',
        profilePic: 'https://tinyurl.com/Example-Profile-Pic',
        settings: {}
    },
    { 
        id: '0',
        name: 'AI Club',
        profilePic: 'https://tinyurl.com/My-AI-Club',
        settings: {}
    },
    { 
        id: '1',
        name: 'Next.js Team',
        profilePic: 'https://tinyurl.com/Nextjs-13',
        settings: {}
    },
    { 
        id: '2',
        name: 'Robotics',
        profilePic: 'https://tinyurl.com/JAMIE-The-Bot',
        settings: {}
    },
    { 
        id: '3',
        name: 'Science Olympiad',
        profilePic: 'https://tinyurl.com/Best-Science-Olympiad-Team',
        settings: {}
    },
    { 
        id: '4',
        name: 'Smartest History Support Group',
        profilePic: 'https://tinyurl.com/US-History-Study-Group',
        settings: {}
    },
];

export default spaces;