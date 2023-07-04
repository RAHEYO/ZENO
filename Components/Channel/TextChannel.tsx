import { FC } from 'react';

import { Channel } from '@/Dummies/Channels';
import ChannelLayout from './ChannelLayout';

type TextChannelProps = {
    channel: Channel
}

const TextChannel: FC<TextChannelProps> = ({ channel }): JSX.Element => {
    return (
    <ChannelLayout channel={channel}>
        { channel.id }:
        Content
    </ChannelLayout>
    );
};

export default TextChannel;