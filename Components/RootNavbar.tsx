import { FC } from 'react';

import Image from 'next/image';

import dummySpaces from '../Dummies/Spaces';
import Spacebar from './General/Spacebar';
import Divider, { Direction } from './General/Divider';
import NavPrimary from './NavPrimary';
import NavSecondary from './NavSecondary';

type RootNavbarProps = {

}

const RootNavbar: FC<RootNavbarProps> = (props): JSX.Element => {
    // TODO: Save this to the LocalStorage to remember which page we're on~
    const currentPageId = 0;

    const navigate = () => {
        console.log("Navigating to parralel page...")
    }

    return (
    <div className="fixed top-0 start-0 h-full flex flex-row">
        {/* The Primary Nav Bar (left-most bar) */}
        <NavPrimary currentPageId={currentPageId} navigate={navigate} />

        {/* The secondary bar, space specific navigations between channels */}
        <NavSecondary />
    </div>
    );
};

export default RootNavbar;