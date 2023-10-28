// By default we assume the current user has the id of 0, which infers that the personal space matches the user's id as well
export const dummyUserSpaceId = 1;

export type Space = {
    id: number, // The unique id of the space, the User's personal space has a unique id same as its own user.id
    name: string,
    profile_pic: string, // Like the url src of an img
    default_channel: number, // The default channel id of the space
    roles: string[] // The roles of the space
};

export const fetchUserSpaces = (userId: number): string => {
    return `SELECT * FROM spaces;`;
}

const dummySpaces: Space[] = [
    { // This one is particularly the user's personal space, a dummy user space
        id: 1,
        name: 'me',
        profile_pic: 'https://tinyurl.com/Example-Profile-Pic',
        default_channel: 1,
        roles: ["moderator", "developer", "poker clowns"]
    },
    { // Another personal space
        id: 10, 
        name: 'me',
        profile_pic: 'https://tinyurl.com/Example-Profile-Pic',
        default_channel: dummyUserSpaceId,
        roles: []
    },
    { // Another personal space
        id: 11,
        name: 'me',
        profile_pic: 'https://tinyurl.com/Example-Profile-Pic',
        default_channel: dummyUserSpaceId,
        roles: []
    },
    { // Another personal space
        id: 12,
        name: 'me',
        profile_pic: 'https://tinyurl.com/Example-Profile-Pic',
        default_channel: dummyUserSpaceId,
        roles: []
    },
    { // Another personal space
        id: 13,
        name: 'me',
        profile_pic: 'https://tinyurl.com/Example-Profile-Pic',
        default_channel: dummyUserSpaceId,
        roles: []
    },
    { 
        id: 2,
        name: 'AI Club',
        profile_pic: 'https://tinyurl.com/My-AI-Club',
        default_channel: 4,
        roles: ["moderator", "designer"]
    },
    { 
        id: 3,
        name: 'Next.js Team',
        profile_pic: 'https://tinyurl.com/Nextjs-13',
        default_channel: 7,
        roles: ["admin"]
    },
    { 
        id: 4,
        name: 'Robotics',
        profile_pic: 'https://tinyurl.com/JAMIE-The-Bot',
        default_channel: 10,
        roles: ["daddy"]
    },
    { 
        id: 5,
        name: 'Science Olympiad',
        profile_pic: 'https://tinyurl.com/ApromMan',
        default_channel: 11,
        roles: ["instructor"]
    },
    { 
        id: 6,
        name: 'Smartest History Support Group',
        profile_pic: 'https://tinyurl.com/US-History-Study-Group',
        default_channel: 12,
        roles: []
    },
];

// spaces.forEach((space, index) => {
//     const rolesJSON = JSON.stringify(space.roles);

//     const queryString = `INSERT INTO spaces (id, name, profile_pic, default_channel, roles) VALUES (${space.id}, '${space.name}', '${space.profile_pic}', ${space.default_channel}, '${rolesJSON}');`;
//     console.log(queryString);
//     query(queryString);
// });

export default dummySpaces;