import { FC } from 'react';

import { Channel } from '@/pages/api/Channel';
import { Message } from '@/pages/api/Message';
import ChannelLayout from './ChannelLayout';
import MessageComponent from './Message';
import Spacebar from '../General/Spacebar';
import { User } from '@/pages/api/User';

type TextChannelProps = {
    channel: Channel,
    messages: Message[],
    senders: User[]
}

const TextChannel: FC<TextChannelProps> = ({ channel, messages, senders }): JSX.Element => {
    return (
    <ChannelLayout channel={channel}>
        <div className="px-5 pt-[70px] flex flex-col bg-gradient-to-br from-neutral to-background">
            {
                messages.map((msg: Message) => {
                    const sender = senders.find(sender => sender.id == msg.sender)!;

                    return <MessageComponent key={msg.id} message={msg} sender={sender} />
                })
            }

            <Spacebar className="h-[75px]" />

            <input className="w-full h-[50px] fixed z-10 bottom-[20px] px-3  rounded-2xl bg-neutral/95 text-foreground" />
        </div>
    </ChannelLayout>
    );
}

export default TextChannel;