import { NextPage } from 'next';
import { useRouter } from 'next/router'
import path from 'path';

import dummyChannels from '@/Dummies/Channels';
import RootLayout from '@/Components/Nav/RootLayout';
import TextChannel from '@/Components/Channel/TextChannel';
import WhiteboardChannel from '@/Components/Channel/WhiteboardChannel';

type SpacePageProps = {

}

const SpacePage: NextPage<SpacePageProps> = () => {
    const router = useRouter();
    const pagePath = router.asPath;
    const channelId = path.basename(pagePath);

    const fetchedChannel = dummyChannels.find(channel => channel.id === channelId);   

    if (!fetchedChannel) return null;

    // Idk if this is the best way to check for channel tpye
    // But i'm not sure how to bake channel type into the json
    // Also, iife baby
    const channelType = (() => {
        switch (fetchedChannel.category){
            case "Chat":
                return <TextChannel channel = {fetchedChannel} />
            case "Whiteboard":
                return <WhiteboardChannel channel = {fetchedChannel} />
        }
    })()


    return (
    <RootLayout>
        {channelType}
    </RootLayout>
    );
}

export default SpacePage;