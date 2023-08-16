import { NextPage } from 'next';

import RootLayout from '@/Components/Nav/RootLayout';
import WhiteboardChannel from '@/Components/Channel/WhiteboardChannel';
import dummyChannels from '@/Dummies/Channels';

type MePageProps = {

}

const MePage: NextPage<MePageProps> = () => {
    return (
    <RootLayout>
        Here should have a board;
        adding on the option to view statistics;
        also a way to profile and settings
        <WhiteboardChannel channel = {dummyChannels[0]}></WhiteboardChannel>
    </RootLayout>
    );
}

export default MePage;