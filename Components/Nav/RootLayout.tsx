import { NextPage } from 'next';
import { ReactNode } from 'react';

import { Space } from '@/Utils/SpaceUtils';
import { Channel } from '@/Utils/ChannelUtils';
import RootNavbar from './RootNavbar';

type RootLayoutProps = {
    children: ReactNode,
    spaces: Space[],
    channels: Channel[]
}

// Basically a layout that wraps around the children and adds a navbar on the left side for navigation
const RootLayout: NextPage<RootLayoutProps> = ({ children, spaces, channels }) => {
    return (
    <div className='w-screen h-screen flex flex-row bg-background text-foreground'>
        <RootNavbar spaces={spaces} channels={channels}/>
        
        <div className="w-full h-full ml-[220px] bg-background">
            {children}
        </div>
    </div>
    );
}

export default RootLayout;