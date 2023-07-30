import { NextPage } from 'next';
import { ReactNode } from 'react';

import { Channel } from '@/Dummies/Channels';

type ChannelLayoutProps = {
    channel: Channel,
    children: ReactNode
}

const ChannelLayout: NextPage<ChannelLayoutProps> = ({ channel, children }) => {
    return (
    <>
        <div className="border-neutral border-b h-[70px]">
            / { channel.name } (id: {channel.id})
        </div>

        { children }
    </>
    );
}

export default ChannelLayout;