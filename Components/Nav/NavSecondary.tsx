import { FC, useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

import { Space, dummyUserSpaceId } from '@/Dummies/Spaces';
import dummyChannels, { Channel } from '@/Dummies/Channels';
import ChannelItem from './ChannelItem';
import { dummyDefaultChannelId, getChannelRoute, getSpaceRoute } from '@/pages/spaces/Utils';

type NavSecondaryProps = {
    currentSpace: Space
}

const NavSecondary: FC<NavSecondaryProps> = ({ currentSpace }): JSX.Element => {
    // The boolean determines if the user is on Me;
    const isOnMeSpace = currentSpace.id == dummyUserSpaceId;

    const [channels, setChannels] = useState<Channel[]>([]);

    // Fetch channels
    const fetchChannels = useCallback(() => {
        const availableChannels = dummyChannels.filter(channel => channel.space_id === currentSpace.id);
        
        setChannels(availableChannels);
    }, [currentSpace]);

    
    useEffect(() => {
        fetchChannels();
    }, [fetchChannels]);    
        
    
    // Generates channel route for navigation on-pressed
    const generateChannelRoute = (channelId: string): string => {
        return getChannelRoute(getSpaceRoute(currentSpace.id), channelId);
    }

    // The default channel route of the current space
    const getDefaultChannelRoute = (): string => {
        // If we're on Me, the default space is the user's Personal Board, which by convention is set to the same as User.id
        if (isOnMeSpace) {
            return getSpaceRoute(dummyUserSpaceId);
        }

        // Otherwise, default navigate to the first channel of the space
        return generateChannelRoute(dummyDefaultChannelId);
    }

    // If no channels fetched yet, still return just an empty name for UI consistency
    if (channels.length == 0) {
        return (
        <div className="flex flex-col w-[150px] h-full">
            <div className='h-[100px] flex bg-bar items-center justify-around'>
                { currentSpace.name }
            </div>
        </div>
        );
    }

    return (
    <div className="flex flex-col w-[150px] h-full">
        <Link href={getDefaultChannelRoute()}>
            <div className='h-[100px] flex bg-bar items-center justify-around'>
                { currentSpace.name }
            </div>
        </Link>
        
        <div className='flex flex-col h-full bg-neutral space-y-2'>
            { channels.map(
                (channel) => {
                    return <ChannelItem key={channel.id} channel={channel} channelRoute={generateChannelRoute(channel.id)} />;
                }
            ) }
        </div>
    </div>
    );
};

export default NavSecondary;