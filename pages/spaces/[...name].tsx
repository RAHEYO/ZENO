import { NextPage } from 'next';
import { useRouter } from 'next/router'
import path from 'path';

import dummyChannels from '@/Dummies/Channels';
import RootLayout from '@/Components/Nav/RootLayout';
import MeSpace from './@_@me';
import TextChannel from '@/Components/Channel/TextChannel';
import { dummyUserSpaceId } from '@/Dummies/Spaces';

type SpacePageProps = {

}

const SpacePage: NextPage<SpacePageProps> = () => {
    const router = useRouter();
    const pagePath = router.asPath;
    const channelId = parseInt(path.basename(pagePath));

    const fetchedChannel = dummyChannels.find(channel => channel.id == channelId);   

    if (!fetchedChannel) return null;

    if (fetchedChannel.id == dummyUserSpaceId) {
        return <MeSpace />
    }

    return (
    <RootLayout>
        <TextChannel channel={fetchedChannel} />
    </RootLayout>
    );
}

export default SpacePage;