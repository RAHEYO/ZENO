import { FC } from 'react';
import Image from 'next/image';

import { Message } from '@/pages/api/Message'
import { User } from '@/pages/api/User';
import Spacebar from '../General/Spacebar';

type MessageProps = {
    message: Message,
    sender: User
}

const Message: FC<MessageProps> = ({ message, sender }): JSX.Element => {
    // console.warn(sender);

    return (
    <div className="py-3 flex flex-row">
        <Image className="rounded-full" src={sender.pic} objectFit='cover' width={50} height={50} alt={`SenderID: ${sender.id}`} />
        
        <Spacebar className="w-5" />

        <div className="flex flex-col">
            {/* Meta info */}
            <div className='flex flex-row'>
                {sender.username}
                <Spacebar className="w-3" />
                {message.sent_time.toLocaleString()}
            </div>

            <Spacebar className='h-1' />

            {/* Message content */}
            <div>
                {message.content}
            </div>
        </div>

        
    </div>
    );
};

export default Message;