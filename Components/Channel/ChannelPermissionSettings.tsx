import { FC } from 'react';

import { ChannelSettingsType } from '@/Dummies/ChannelSettings';

type ChannelPermissionSettingsProps = {
    channelSettings: ChannelSettingsType
}

const ChannelPermissionSettings: FC<ChannelPermissionSettingsProps> = ({ channelSettings }): JSX.Element => {
    return (
    <div>ChannelPermissionSettings with {JSON.stringify(channelSettings)}</div>
    );
};

export default ChannelPermissionSettings;