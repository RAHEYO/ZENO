import { FC } from 'react';

import { ChannelSettingsType } from '@/Dummies/ChannelSettings';

type ChannelGeneralSettingsProps = {
    channelSettings: ChannelSettingsType
}

const ChannelGeneralSettings: FC<ChannelGeneralSettingsProps> = ({ channelSettings }): JSX.Element => {
    return (
    <div>GeneralSettings with {JSON.stringify(channelSettings)}</div>
    );
};

export default ChannelGeneralSettings;