import { FC, useState } from 'react';
import { BsSendFill } from 'react-icons/bs';

import { Channel } from '@/pages/api/Channel';
import { Message } from '@/pages/api/messages/[channel_id]';
import { User } from '@/pages/api/users/User';
import ChannelLayout from './ChannelLayout';
import MessageComponent from './Message';
import Spacebar from '../General/Spacebar';

type TextChannelProps = {
    channel: Channel,
    messages: Message[],
    senders: User[]
}

const TextChannel: FC<TextChannelProps> = ({ channel, messages, senders }): JSX.Element => {
    const [message, editMessage] = useState("");

    const sendMessage = async (message: string) => {
        const fullMessage = {
            channel_id: channel.id,
            sender: 1,
            content: message,
            sent_time: new Date(Date.now()).toISOString().slice(0, 19).replace('T', ' ')
        };

        await fetch(`/api/messages/${channel.id}`, { 
            method: 'POST', 
            body: JSON.stringify(fullMessage)
        });

        // Reset the message
        editMessage("");
    }

    return (
    <ChannelLayout channel={channel}>
        <div className="px-5 pt-[70px] w-full flex flex-col bg-gradient-to-br from-neutral to-background">
            {
                messages.map((msg: Message) => {
                    const sender = senders.find(sender => sender.id == msg.sender)!;

                    return <MessageComponent key={msg.id} message={msg} sender={sender} />
                })
            }

            <Spacebar className="h-[75px]" />

            <div className="fixed bottom-10 w-3/5 flex flex-row bg-neutral/80 rounded-2xl p-2">
                <textarea
                className="w-full h-[50px] z-10 bottom-[20px] px-3 rounded-2xl bg-neutral/95 text-foreground" 
                value={message}
                placeholder='@_@' 
                onChange={(event) => editMessage(event.target.value)} />
                <Spacebar className="w-10" />
                <button className="w-10" onClick={() => sendMessage(message)}>
                    <BsSendFill className='hover:bg-background rounded-md w-10 h-10 p-2' />
                </button>
            </div>
        </div>
    </ChannelLayout>
    );
}

export default TextChannel;