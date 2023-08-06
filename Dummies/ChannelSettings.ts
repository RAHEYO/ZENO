export const settingCategories = [
    "General",
    "Permissions",
    "Members"
];

export type SettingOption = string | AccessibilityType | NotificationType;

// The types of notificatin setting values a user decides to customizer, default to 0
export enum NotificationType {
    None=0,
    Pins=1,
    All=2,
}

// The type of accessibility for accounts in a channel, default to 2 (participate in both read and write)
export enum AccessibilityType {
    Invisible=0,
    Read=1,
    Write=2,
    Admin=3
}

export type RolePermisionType = {
    role: string,
    permission: AccessibilityType
}

// A list of dummy data for the settings
export type ChannelSettingsType = {
    channelId: number, // Same as channel id
    // General Settings
    channel_description: SettingOption
    
    // Permission settings
    roles: RolePermisionType[],
    
    // Members settings
    members: number[] // List of user ids
};

// TODO: Add dummy data for channel settings
const channelSettings: ChannelSettingsType[] = [
    {
        channelId: 1,
        channel_description: "This is the channel for general chats abt AI!",
        roles: [
            {
                role: "Admin",
                permission: AccessibilityType.Admin
            },
            {
                role: "Moderator",
                permission: AccessibilityType.Write
            },
            {
                role: "Member",
                permission: AccessibilityType.Read
            }
        ],
        members: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    {
        channelId: 2,
        channel_description: "Everything about the develompent of product!",
        roles: [
            {
                role: "Admin",
                permission: AccessibilityType.Admin
            },
            {
                role: "Moderator",
                permission: AccessibilityType.Write
            },
            {
                role: "Member",
                permission: AccessibilityType.Read
            }
        ],
        members: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    {
        channelId: 3,
        channel_description: "Front-end developments!",
        roles: [
            {
                role: "Admin",
                permission: AccessibilityType.Admin
            },
            {
                role: "Moderator",
                permission: AccessibilityType.Write
            },
            {
                role: "Member",
                permission: AccessibilityType.Read
            }
        ],
        members: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    {
        channelId: 4,
        channel_description: "Back-end!",
        roles: [
            {
                role: "Admin",
                permission: AccessibilityType.Admin
            },
            {
                role: "Moderator",
                permission: AccessibilityType.Write
            },
            {
                role: "Member",
                permission: AccessibilityType.Read
            }
        ],
        members: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    },
    {
        channelId: 5,
        channel_description: "Research!",
        roles: [
            {
                role: "Admin",
                permission: AccessibilityType.Admin
            },
            {
                role: "Moderator",
                permission: AccessibilityType.Write
            },
            {
                role: "Member",
                permission: AccessibilityType.Read
            }
        ],
        members: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
    }
];


export default channelSettings;