import { UserChannelPermission } from "./RoleRelation";

// The types of notificatin setting values a user decides to customizer, default to 0
export enum NotificationType {
    None=1,
    Pins=2,
    All=3,
}

// A singular relationship between an user and a channel
export type UserChannelBond = {
    user_id: number,
    channel_id: number,
    permissions: UserChannelPermission
    notification_type: NotificationType
}

const userSpaceBonds: UserChannelBond[] = [
    {
        user_id: 1,
        channel_id: 1,
        permissions: UserChannelPermission.admin,
        notification_type: NotificationType.All
    },
    {
        user_id: 1,
        channel_id: 2,
        permissions: UserChannelPermission.admin,
        notification_type: NotificationType.Pins
    },
    {
        user_id: 1,
        channel_id: 3,
        permissions: UserChannelPermission.write,
        notification_type: NotificationType.All
    },
    {
        user_id: 1,
        channel_id: 4,
        permissions: UserChannelPermission.read,
        notification_type: NotificationType.All
    },
    {
        user_id: 1,
        channel_id: 5,
        permissions: UserChannelPermission.admin,
        notification_type: NotificationType.None
    },
    {
        user_id: 1,
        channel_id: 6,
        permissions: UserChannelPermission.read,
        notification_type: NotificationType.None
    }
];

export default userSpaceBonds;