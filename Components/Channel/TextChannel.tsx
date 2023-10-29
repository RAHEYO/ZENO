'use client'

import useSWR from 'swr';
import { FC, useState } from 'react';
import { BsSendFill } from 'react-icons/bs';

import { textChannelFetcher } from '@/Utils/General';
import { Channel } from '@/Utils/ChannelUtils';
import { Message } from '@/Utils/MessageUtils';
import { User } from '@/Utils/UserUtils';
import ChannelLayout from './ChannelLayout';
import MessageComponent from './Message';
import Spacebar from '../General/Spacebar';
import { channelMessagesAPI } from '@/Utils/General';

type TextChannelProps = {
    channel: Channel
}

const TextChannel: FC<TextChannelProps> = ({ channel }): JSX.Element => {
    const [message, editMessage] = useState("");

    const { data, isLoading, error } = useSWR(channelMessagesAPI(channel.id), textChannelFetcher, { refreshInterval: 1000 });
    const { messages, users: senders }: { messages: Message[], users: User[] } = data? data : { messages: [], users: [] };


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

    if (isLoading) {
        return <>Loading @_@...</>;
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