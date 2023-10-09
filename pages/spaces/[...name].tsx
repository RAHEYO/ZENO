import { myQuery } from '../../pages/api/mysql';
import { NextPage, GetServerSideProps } from 'next';
import { useRouter } from 'next/router'

import { Channel, fetchChannelById } from '../api/Channel';
import RootLayout from '@/Components/Nav/RootLayout';
import MeSpace from './@_@me';
import TextChannel from '@/Components/Channel/TextChannel';
import { dummyUserSpaceId } from '../api/Space';

type SpacePageProps = {
    channel: Channel
}

export const getServerSideProps = (async (context) => {
    const { resolvedUrl } = context;
    const props = resolvedUrl.split('spaces/')[resolvedUrl.split('spaces/').length - 1];
    const channelId = parseInt(props.split('/')[1]);
    
    if (Number.isNaN(channelId)) {
        return { 
            notFound: true    
        };
    }

    const res = await myQuery(fetchChannelById(channelId));
    const currentChannel = (JSON.parse(JSON.stringify(res)) as Channel[])[0];

    return { 
        props: {
            channel: currentChannel
        }
    }
}) satisfies GetServerSideProps<SpacePageProps>;  

const SpacePage: NextPage<SpacePageProps> = ({ channel }) => {
    const router = useRouter();
    const pagePath = router.asPath;
    const props = pagePath.split('spaces/')[pagePath.split('spaces/').length - 1];
    const spaceId = parseInt(props.split('/')[0]);

    if (spaceId == dummyUserSpaceId || Number.isNaN(spaceId)) {
        return <MeSpace />
    }

    return (
    <RootLayout>
        { channel && <TextChannel channel={channel} /> }
    </RootLayout>
    );
}

export default SpacePage;