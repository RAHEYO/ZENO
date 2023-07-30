import { FC } from 'react';

import { Channel } from '@/Dummies/Channels';
import dummyMessages, { Message } from '@/Dummies/Messages';
import ChannelLayout from './ChannelLayout';
import MessageComponent from './Message';
import Spacebar from '../General/Spacebar';

type TextChannelProps = {
    channel: Channel
}

const TextChannel: FC<TextChannelProps> = ({ channel }): JSX.Element => {
    const messages = dummyMessages.filter(msg => msg.channel_id === channel.id).sort((a, b) => a.time.getTime() - b.time.getTime());

    return (
    <ChannelLayout channel={channel}>
        <div className="px-5 pt-[70px] flex flex-col bg-gradient-to-br from-neutral to-background">
            {
                messages.map((msg: Message) => <MessageComponent key={msg.id} message={msg} />)
            }

            <Spacebar className="h-[75px]" />

            <input className="w-full h-[50px] fixed z-10 bottom-[20px] px-3  rounded-2xl bg-neutral/95 text-foreground" />
        </div>
    </ChannelLayout>
    );
}

export default TextChannel;