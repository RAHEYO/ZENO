import { FC } from 'react';

import { ChannelConfigsType } from '@/Dummies/ChannelConfigs';

type ChannelMembersConfigsProps = {
    channelSettings: ChannelConfigsType
}

const ChannelMembersConfigs: FC<ChannelMembersConfigsProps> = ({ channelSettings }): JSX.Element => {
    return (
    <div>Channel Members Configurations with {JSON.stringify(channelSettings)}</div>
    );
};

export default ChannelMembersConfigs;