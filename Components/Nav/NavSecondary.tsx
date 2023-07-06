import { FC } from 'react';

import { Space, dummyUserSpaceId } from '@/Dummies/Spaces';
import dummyChannels, { Channel } from '@/Dummies/Channels';
import ChannelItem from './ChannelItem';
import { getChannelRoute, getSpaceRoute } from '@/pages/spaces/Utils';

type NavSecondaryProps = {
    currentSpace: Space
}

const NavSecondary: FC<NavSecondaryProps> = ({ currentSpace }): JSX.Element => {
    const fetchedChannels = (): Channel[] => {
        const availableChannels = dummyChannels.filter(channel => channel.space_id === currentSpace.id);
        
        return availableChannels;
    }
    
    const generateChannelRoute = (channelName: string): string => {
        if (currentSpace.id === dummyUserSpaceId) return getChannelRoute('/', channelName);

        return getChannelRoute(getSpaceRoute(currentSpace.name), channelName);
    }

    return (
    <div className="flex flex-col w-[150px] h-full">
        <div className='h-[100px] flex bg-bar items-center justify-around'>
            { currentSpace.name }
        </div>
        <div className='h-full bg-neutral space-y-10'>
            { fetchedChannels().map(
                (channel, index) => {
                    return <ChannelItem key={channel.id} channel={channel} channelRoute={generateChannelRoute(channel.id)} />;
                }
            ) }
        </div>
    </div>
    );
};

export default NavSecondary;