export type User = {
    id: number,
    username: string,
    pic: string,
    settings: {}
}

const dummyUsers: User[] = [
    {
        id: 0,
        username: "RAHEYO",
        pic: "https://tinyurl.com/MediocrityPic",
        settings: {}
    },
    {
        id: 1,
        username: "Diptanshu",
        pic: "https://tinyurl.com/BlockSpherePic",
        settings: {}
    },
    {
        id: 2,
        username: "Brandon The Beaver",
        pic: "https://tinyurl.com/CuteBeaverPic",
        settings: {}
    },
    {
        id: 3,
        username: "Literally No One",
        pic: "https://tinyurl.com/NobodyPic",
        settings: {}
    },
    {
        id: 4,
        username: "prajmahal",
        pic: "https://tinyurl.com/MessiPic",
        settings: {}
    },
];

export default dummyUsers;