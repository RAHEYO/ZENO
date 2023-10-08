import { NextPage } from 'next';
import { useRouter } from 'next/router'

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
    const props = pagePath.split('spaces/')[pagePath.split('spaces/').length - 1];
    const spaceId = parseInt(props.split('/')[0]);

    if (spaceId == dummyUserSpaceId || Number.isNaN(spaceId)) {
        return <MeSpace />
    }

    const fetchedChannel = dummyChannels.find(channel => channel.space_id == spaceId);   

    return (
    <RootLayout>
        { fetchedChannel && <TextChannel channel={fetchedChannel} /> }
    </RootLayout>
    );
}

export default SpacePage;