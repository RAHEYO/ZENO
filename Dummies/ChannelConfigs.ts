import { RoleRelation } from "./RoleRelation";

export const channelConfigCategories = [
    "General",
    "Permissions",
    "Members"
];

// The local state that a channel can configure
export type ChannelConfigsType = {
    channel_name: string, // Abilty to change the channel name
    
    // General Settings
    channel_description: string,
    
    // Permission settings
    roles: RoleRelation[],
    
    // Members settings
    members: number[] // List of user ids
};
