import { NextPage } from 'next';
import { ReactNode } from 'react';

import RootNavbar from './RootNavbar';
import Spacebar from '../General/Spacebar';

type RootLayoutProps = {
    children: ReactNode
}

// Basically a layout that wraps around the children and adds a navbar on the left side for navigation
const RootLayout: NextPage<RootLayoutProps> = ({ children }) => {
    return (
    <div className='w-screen h-screen flex-row bg-background border-neutral text-foreground'>
        <RootNavbar />

        {/* This is a margin for the children */}
        <Spacebar className='w-220' />
        
        {children}
    </div>
    );
}

export default RootLayout;