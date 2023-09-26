import { FC } from 'react';

import { ChannelConfigsType } from '@/Dummies/ChannelConfigs';

type ChannelGeneralConfigsProps = {
    channelSettings: ChannelConfigsType
}

const ChannelGeneralConfigs: FC<ChannelGeneralConfigsProps> = ({ channelSettings }): JSX.Element => {
    return (
    <div>Channel General Configurations with {JSON.stringify(channelSettings)}</div>
    );
};

export default ChannelGeneralConfigs;