import { FC } from 'react';
import Link from 'next/link';

import { Channel } from '@/pages/api/Channel';

type ChannelItemProps = {
    channel: Channel,
    channelRoute: string
}

const ChannelItem: FC<ChannelItemProps> = ({ channel, channelRoute }): JSX.Element => {
    return (
        <Link className='pl-2' href={channelRoute}>
            <span>/ { channel.name }</span>
        </Link>
    );
};

export default ChannelItem;