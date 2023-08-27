import { FC } from 'react';

import { ChannelSettingsType } from '@/Dummies/ChannelSettings';

type ChannelMembersSettingsProps = {
    channelSettings: ChannelSettingsType
}

const ChannelMembersSettings: FC<ChannelMembersSettingsProps> = ({ channelSettings }): JSX.Element => {
    return (
    <div>ChannelMembersSettings with {JSON.stringify(channelSettings)}</div>
    );
};

export default ChannelMembersSettings;