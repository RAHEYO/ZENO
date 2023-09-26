// The permission that the user has with the channel
export enum UserChannelPermission {
    invisible=0,
    admin=1,
    write=2,
    read=3
}

// Total number of RoleRelation objects in the Storage: O(rc)
// where:
// r - number of roles
// c - number of channels in the space

export type RoleRelation = {
    id: number, // unique bigint id
    space_id: number, // space id used for searching (indexing)
    role_name: string, // name of the role, E.X "moderator" or "poker jokers"
    channel_id: number, // specific channel id this role has relations with
    permissions: UserChannelPermission // the specific permissions configuration the role has with the channel
}

const roleRelations: RoleRelation[] = [
    {
        id: 0,
        space_id: 1,
        role_name: "moderator",
        channel_id: 0,
        permissions: UserChannelPermission.admin
    },
    {
        id: 1,
        space_id: 1,
        role_name: "developer",
        channel_id: 0,
        permissions: UserChannelPermission.admin
    },
    {
        id: 2,
        space_id: 1,
        role_name: "poker clowns",
        channel_id: 1,
        permissions: UserChannelPermission.admin
    },
    {
        id: 3,
        space_id: 2,
        role_name: "moderator",
        channel_id: 0,
        permissions: UserChannelPermission.admin
    },
    {
        id: 4,
        space_id: 2,
        role_name: "moderator",
        channel_id: 0,
        permissions: UserChannelPermission.admin
    },
    {
        id: 5,
        space_id: 2,
        role_name: "moderator",
        channel_id: 0,
        permissions: UserChannelPermission.admin
    },
    {
        id: 6,
        space_id: 2,
        role_name: "moderator",
        channel_id: 0,
        permissions: UserChannelPermission.admin
    },
    {
        id: 7,
        space_id: 3,
        role_name: "moderator",
        channel_id: 0,
        permissions: UserChannelPermission.admin
    },
    {
        id: 8,
        space_id: 4,
        role_name: "moderator",
        channel_id: 0,
        permissions: UserChannelPermission.admin
    },
];

export default roleRelations;