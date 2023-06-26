import { NextPage } from 'next';
import { ReactNode } from 'react';

import RootNavbar from '../RootNavbar';

type RootLayoutProps = {
    children: ReactNode
}

const RootLayout: NextPage<RootLayoutProps> = ({ children }) => {
    return (
    <div className='w-screen h-screen flex flex-row'>
        <RootNavbar />
        
        {children}
    </div>
    );
}

export default RootLayout;