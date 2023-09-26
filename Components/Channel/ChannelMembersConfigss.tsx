import { FC, useState, useEffect } from 'react';

import Spacebar from '../General/Spacebar';
import { ChannelConfigsType } from '@/Dummies/ChannelConfigs';
import dummyUsers, { User } from '@/Dummies/User';

type ChannelMembersConfigsProps = {
    channelSettings: ChannelConfigsType
}

const ChannelMembersConfigs: FC<ChannelMembersConfigsProps> = ({ channelSettings }) => {
    const [members, setMembers] = useState<User[]>([]);

    useEffect(() => {
        const fetchedMembers = channelSettings.members.map(memberId => dummyUsers.find(user => user.id === memberId)!);

        setMembers(fetchedMembers);
    }, [channelSettings.members]);

    if (members.length === 0) return null;
    
    return (
    <div className='w-full flex flex-col'>
        {JSON.stringify(channelSettings)}

        <ul className='space-y-5 w-full'>
            {
            members.map((member) => 
            <li key={member.id} className='w-full flex flex-row'>
                {member.username}
            </li>
            )
            }
        </ul>
    </div>
    );
};

export default ChannelMembersConfigs;