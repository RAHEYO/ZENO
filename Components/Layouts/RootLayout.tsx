import { NextPage } from 'next';
import { ReactNode } from 'react';

import RootNavbar from '../RootNavbar';

type RootLayoutProps = {
    children: ReactNode
}

// Basically a layout that wraps around the children and adds a navbar on the left side for navigation
const RootLayout: NextPage<RootLayoutProps> = ({ children }) => {
    return (
    <div className='w-screen h-screen flex-row bg-background text-foreground'>
        <RootNavbar />
        
        {children}
    </div>
    );
}

export default RootLayout;