import { FC, useCallback, useEffect, useState } from 'react';

import dummySpaces, { Space } from '../Dummies/Spaces';
import NavPrimary from './NavPrimary';
import NavSecondary from './NavSecondary';

type RootNavbarProps = {
    
}


// The key to get & set in the localStorage~
export const ROOT_NAV_ROUTE_KEY = "ROOT_NAV_ROUTE_KEY";

const RootNavbar: FC<RootNavbarProps> = (props): JSX.Element => {
    // The Space we're currenlty on
    const [currentSpaceId, setCurrentSpaceId] = useState('me');
    
    // Update the localStorage whenever user click on a new Space
    // We need localStorage bc we're rendering this layout across all Spaces
    useEffect(() => {
        // If on the first render, set it to the Homespace on default
        if (localStorage.getItem(ROOT_NAV_ROUTE_KEY) == null) localStorage.setItem(ROOT_NAV_ROUTE_KEY, '0');
        else {
            if (currentSpaceId !== localStorage.getItem(ROOT_NAV_ROUTE_KEY)) {
                setCurrentSpaceId(localStorage.getItem(ROOT_NAV_ROUTE_KEY)!);
            }
        }
    }, [currentSpaceId]);

    const updateSpaceId = (toId: string) => {
        // Prevent any duplicate actions:
        if (toId === currentSpaceId) return;
        
        console.warn("To: ", toId);
        setCurrentSpaceId(toId);
        localStorage.setItem(ROOT_NAV_ROUTE_KEY, toId);
    }

    return (
    <div key="ONlY" className="fixed top-0 start-0 h-full flex flex-row">
        {/* The Primary Nav Bar (left-most bar) */}
        <NavPrimary spaces={dummySpaces} currentSpaceId={currentSpaceId} onNavigate={updateSpaceId} />

        {/* The secondary bar, space specific navigations between channels */}
        <NavSecondary />
    </div>
    );
};

export default RootNavbar;