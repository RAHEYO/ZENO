import { FC, useEffect, useState } from 'react';

import dummySpaces, { dummyUserSpaceId } from '../../Dummies/Spaces';
import NavPrimary from './NavPrimary';
import NavSecondary from './NavSecondary';

// The key to get & set in the localStorage~
export const NAV_SPACE_KEY = "NAV_SPACE_KEY";

const RootNavbar: FC = (): JSX.Element => {
    // The Space we're currenlty on
    const [currentSpaceId, setCurrentSpaceId] = useState(dummyUserSpaceId);
    
    // TODO: Replace with actual data in the back-end
    const fetchedSpaces = () => {
        return dummySpaces;
    }

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
        <NavPrimary spaces={fetchedSpaces()} currentSpaceId={currentSpaceId} onNavigate={updateSpaceId} />

        {/* The secondary bar, space specific navigations between channels */}
        <NavSecondary currentSpace={fetchedSpaces().find(space => space.id === currentSpaceId)!} />
    </div>
    );
};

export default RootNavbar;