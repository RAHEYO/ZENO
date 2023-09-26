import { FC } from 'react';

import { ChannelConfigsType } from '@/Dummies/ChannelConfigs';

type ChannelPermissionConfigsProps = {
    channelSettings: ChannelConfigsType
}

const ChannelPermissionConfigs: FC<ChannelPermissionConfigsProps> = ({ channelSettings }): JSX.Element => {
    return (
    <div>Channel Permission Configurations with {JSON.stringify(channelSettings)}</div>
    );
};

export default ChannelPermissionConfigs;