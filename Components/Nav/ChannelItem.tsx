import { FC } from 'react';
import Link from 'next/link';

import { Channel } from '@/Dummies/Channels';

type ChannelItemProps = {
    channel: Channel,
    channelRoute: string
}

const ChannelItem: FC<ChannelItemProps> = ({ channel, channelRoute }): JSX.Element => {
    return (
        <Link href={channelRoute}>
            <span>{ channel.name }</span>
        </Link>
    );
};

export default ChannelItem;