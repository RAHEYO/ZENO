import { FC, useEffect, useState } from 'react';

import dummySpaces, { dummyUserSpaceId } from '../Dummies/Spaces';
import NavPrimary from './NavPrimary';
import NavSecondary from './NavSecondary';


// The key to get & set in the localStorage~
export const ROOT_NAV_ROUTE_KEY = "ROOT_NAV_ROUTE_KEY";

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
        if (localStorage.getItem(ROOT_NAV_ROUTE_KEY) == null) 
            localStorage.setItem(ROOT_NAV_ROUTE_KEY, dummyUserSpaceId);
        else {
            // If localStorage shows which space we're in, then update the state if different (scenario happens after navigated, new component with default state)
            if (currentSpaceId !== localStorage.getItem(ROOT_NAV_ROUTE_KEY)) setCurrentSpaceId(localStorage.getItem(ROOT_NAV_ROUTE_KEY)!);
        }
    }, [currentSpaceId]);

    // Callback updating states when navigating
    const updateSpaceId = (toId: string) => {
        // Prevent any duplicate actions:
        if (toId === currentSpaceId) return;
        
        setCurrentSpaceId(toId);
        localStorage.setItem(ROOT_NAV_ROUTE_KEY, toId);
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