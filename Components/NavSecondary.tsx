import { FC } from 'react';

import { Space } from '@/Dummies/Spaces';
import dummyChannels, { Channel } from '@/Dummies/Channels';

type NavSecondaryProps = {
    currentSpace: Space
}

const NavSecondary: FC<NavSecondaryProps> = ({ currentSpace }): JSX.Element => {
    const fetchedChannels = (): Channel[] => {
        const availableChannels = dummyChannels.filter(channel => channel.space_id === currentSpace.id);
        
        return availableChannels;
    }
    
    return (
    <div className="flex flex-col w-[150px] h-full">
        <div className='h-[100px] flex bg-bar items-center justify-around'>
            { currentSpace.name }
        </div>
        <div className='h-full bg-neutral'>
            { fetchedChannels().map(
                (channel, index) => {
                    return <span key={channel.id}>{ channel.name }</span>;
                }
            ) }
        </div>
    </div>
    );
};

export default NavSecondary;