// import { query } from '../pages/api/mysql';

// The permission that the user has with the channel
export enum UserChannelPermission {
    admin=1,
    write=2,
    read=3,
    invisible=4
}

// Total number of RoleRelation objects in the Storage: O(rc)
// where:
// r - number of roles
// c - number of channels in the space
// u - number of users actually given a role in the space

export type RoleRelation = {
    space_id: number, // space id used for searching (indexing)
    role_name: string, // name of the role, E.X "moderator" or "poker jokers"
    channel_id: number, // specific channel id this role has relations with (indexing)
    user_id: number, // user id used for searching (indexing)
    permissions: UserChannelPermission // the specific permissions configuration the role has with the channel
}

const roleRelations: RoleRelation[] = [
    {
        space_id: 1,
        role_name: "moderator",
        channel_id: 2,
        user_id: 1,
        permissions: UserChannelPermission.admin
    },
    {
        space_id: 1,
        role_name: "developer",
        channel_id: 2,
        user_id: 1,
        permissions: UserChannelPermission.admin
    },
    {
        space_id: 1,
        role_name: "poker clowns",
        channel_id: 2,
        user_id: 1,
        permissions: UserChannelPermission.write
    },
    {
        space_id: 2,
        role_name: "moderator",
        channel_id: 9,
        user_id: 1,
        permissions: UserChannelPermission.admin
    },
    {
        space_id: 2,
        role_name: "programmer",
        channel_id: 9,
        user_id: 1,
        permissions: UserChannelPermission.read
    },
    {
        space_id: 2,
        role_name: "designer",
        channel_id: 9,
        user_id: 1,
        permissions: UserChannelPermission.write
    },
    {
        space_id: 2,
        role_name: "designer",
        channel_id: 10,
        user_id: 1,
        permissions: UserChannelPermission.read
    },
    {
        space_id: 3,
        role_name: "admin",
        channel_id: 11,
        user_id: 1,
        permissions: UserChannelPermission.admin
    },
    {
        space_id: 4,
        role_name: "daddy",
        channel_id: 12,
        user_id: 1,
        permissions: UserChannelPermission.read
    },
    {
        space_id: 5,
        role_name: "instructor",
        channel_id: 13,
        user_id: 1,
        permissions: UserChannelPermission.admin
    },
    {
        space_id: 6,
        role_name: "moderator",
        channel_id: 14,
        user_id: 1,
        permissions: UserChannelPermission.admin
    },
];

// roleRelations.forEach((roleRelation, _) => {
//     const queryString = `INSERT INTO role_relations (space_id, role_name, channel_id, user_id, permissions) VALUES (${roleRelation.space_id}, '${roleRelation.role_name}', ${roleRelation.channel_id}, ${roleRelation.user_id}, ${roleRelation.permissions});`;
//     console.log(queryString);
//     query(queryString);
// });

export default roleRelations;