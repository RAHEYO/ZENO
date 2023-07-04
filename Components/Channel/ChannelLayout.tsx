import { NextPage } from 'next';
import { ReactNode } from 'react';

import { Channel } from '@/Dummies/Channels';

type ChannelLayoutProps = {
    channel: Channel,
    children: ReactNode
}

const ChannelLayout: NextPage<ChannelLayoutProps> = ({ channel, children }) => {
    return (
    <div>
        { channel.name }
        
        { children }
    </div>
    );
}

export default ChannelLayout;