import { query } from "../pages/api/mysql";

export type User = {
    id: number,
    space: number,
    email: string,
    pass: string
    username: string,
    pic: string,
    settings: {}
}

const dummyUsers: User[] = [
    {
        id: 1,
        space: 0, 
        username: "RAHEYO",
        email: "ryanwhaoyu@gmail.com",
        pass: "111222333",
        pic: "https://tinyurl.com/MediocrityPic",
        settings: {}
    },
    {
        id: 2,
        space: 10,
        username: "Diptanshu",
        email: "ryanwhaoyu@gmail.com",
        pass: "111222333",
        pic: "https://tinyurl.com/BlockSpherePic",
        settings: {}
    },
    {
        id: 3,
        space: 11, 
        username: "Brandon The Beaver",
        email: "25nguyenb26@stu.smuhsd.org",
        pass: "111222333",
        pic: "https://tinyurl.com/CuteBeaverPic",
        settings: {}
    },
    {
        id: 4,
        space: 12, 
        username: "Literally No One",
        email: "rahaoyu@mit.edu",
        pass: "111222333",
        pic: "https://tinyurl.com/NobodyPic",
        settings: {}
    },
    {
        id: 5,
        space: 13, 
        username: "prajmahal",
        email: "prajal@gmail.com",
        pass: "111222333",
        pic: "https://tinyurl.com/MessiPic",
        settings: {}
    },
];

dummyUsers.forEach((user, index) => {
    const queryString = `INSERT INTO users (id, space, username, email, pass, pic) VALUES (${user.id}, ${user.space}, "${user.username}", "${user.email}", "${user.pass}", "${user.pic}");`;
    console.log(queryString);
    query(
        queryString
        );
});

export default dummyUsers;