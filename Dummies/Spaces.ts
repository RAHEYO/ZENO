export type Space = {
    id: string,
    name: string,
    profilePic: string // Like the url src of an img
}

const spaces: Space[] = [
    { 
        id: '0',
        name: 'AI Club',
        profilePic: 'https://tinyurl.com/My-AI-Club'
    },
    { 
        id: '1',
        name: 'Next.js Team',
        profilePic: 'https://tinyurl.com/Nextjs-13'
    },
    { 
        id: '2',
        name: 'Robotics',
        profilePic: 'https://tinyurl.com/JAMIE-The-Bot'
    },
    { 
        id: '3',
        name: 'Science Olympiad',
        profilePic: 'https://tinyurl.com/Best-Science-Olympiad-Team'
    },
    { 
        id: '4',
        name: 'Smartest History Support Group',
        profilePic: 'https://tinyurl.com/US-History-Study-Group'
    },
];

export default spaces;