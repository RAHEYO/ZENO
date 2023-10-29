import { FC } from 'react';
import Link from 'next/link';

import { Space, dummyUserSpaceId } from '@/Utils/SpaceUtils';
import { Channel } from '@/Utils/ChannelUtils';
import ChannelItem from './ChannelItem';
import { getChannelRoute, getSpaceRoute } from '@/Utils/SpaceUtils';

type NavSecondaryProps = {
    space: Space,
    channels: Channel[]
}

const NavSecondary: FC<NavSecondaryProps> = ({ space, channels }): JSX.Element => {
    // The boolean determines if the user is on Me;
    const isOnMeSpace = space.id == dummyUserSpaceId;
    
    // Generates channel route for navigation on-pressed
    const generateChannelRoute = (channelId: number): string => {
        return getChannelRoute(getSpaceRoute(space.id), channelId);
    }

    // The default channel route of the current space
    const getDefaultChannelRoute = (): string => {
        // If we're on Me, the default space is the user's Personal Board, which by convention is set to the same as User.id
        if (isOnMeSpace) {
            return getSpaceRoute(dummyUserSpaceId);
        }

        // Otherwise, default navigate to the first channel of the space
        return generateChannelRoute(space.default_channel);
    }

    // If no channels fetched yet, still return just an empty name for UI consistency
    if (channels.length == 0) {
        return (
        <div className="flex flex-col w-[150px] h-full">
            <div className='h-[100px] flex bg-bar items-center justify-around'>
                { space.name }
            </div>
        </div>
        );
    }

    return (
    <div className="flex flex-col w-[150px] h-full">
        <Link href={getDefaultChannelRoute()}>
            <div className='h-[100px] flex bg-neutral items-center justify-around'>
                { space.name }
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