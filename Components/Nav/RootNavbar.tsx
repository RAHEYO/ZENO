import { FC, useEffect, useState } from 'react';

import NavPrimary from './NavPrimary';
import NavSecondary from './NavSecondary';
import { Space, dummyUserSpaceId } from '@/Utils/SpaceUtils';
import { Channel } from '@/Utils/ChannelUtils';

// The key to get & set in the localStorage~
export const NAV_SPACE_KEY = "NAV_SPACE_KEY";

type RootNavbarProps = {
    spaces: Space[],
    channels: Channel[]
}

const RootNavbar: FC<RootNavbarProps> = ({ spaces, channels }): JSX.Element => {
    // The Space we're currenlty on
    const [currentSpaceId, setCurrentSpaceId] = useState(dummyUserSpaceId);

    // Update the localStorage whenever user click on a new Space
    // We need localStorage bc we're rendering this layout across all Spaces
    useEffect(() => {
        // If the first time visiting, set it to the Homespace on default
        if (localStorage.getItem(NAV_SPACE_KEY) == null) {
            localStorage.setItem(NAV_SPACE_KEY, dummyUserSpaceId.toString());
        } else {
            // If localStorage shows which space we're in, then update the state if different (scenario happens after navigated, new component with default state)
            
            let cachedNavSpaceId = parseInt(localStorage.getItem(NAV_SPACE_KEY)!);
            
            if (currentSpaceId != cachedNavSpaceId) setCurrentSpaceId(cachedNavSpaceId);
        }
    }, [currentSpaceId]);

    // Callback updating states when navigating
    const updateSpaceId = (toId: number) => {
        // Prevent any duplicate actions:
        if (toId == currentSpaceId) return;
        
        setCurrentSpaceId(toId);
        localStorage.setItem(NAV_SPACE_KEY, toId.toString());
    }

    return (
    <div key="ONlY" className="fixed top-0 start-0 h-full flex flex-row">
        {/* The Primary Nav Bar (left-most bar) */}
        <NavPrimary spaces={spaces} currentSpaceId={currentSpaceId} onNavigate={updateSpaceId} />

        {/* The secondary bar, space specific navigations between channels */}
        <NavSecondary space={spaces.find(space => space.id == currentSpaceId)!} channels={channels} />
    </div>
    );
};

export default RootNavbar;