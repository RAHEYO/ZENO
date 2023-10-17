import { NextPage, GetServerSideProps } from 'next';

import { Space, dummyUserSpaceId, fetchUserSpaces } from '@/pages/api/Space';
import { Channel, fetchSpaceChannels } from '@/pages/api/Channel';
import RootLayout from '@/Components/Nav/RootLayout';
import { myQuery } from '@/pages/api/mysql';
import { getSpaceIdFromRoute, getChannelIdFromRoute } from '@/Utils/space';

type MePageProps = {
    spaces: Space[],
    channels: Channel[]
}

export const getServerSideProps = (async (context) => {
    // Fetch all spaces of the user
    // TODO: TB CHANGED LATER, MAKE IT USER-SPECIFIC
    const resSpaces = await myQuery(fetchUserSpaces(dummyUserSpaceId));
    const parsedSpaces = JSON.parse(JSON.stringify(resSpaces))[0] as Space[];


    // Fetch all channels of the current space
    const spaceId = getSpaceIdFromRoute(context);

    const res = await myQuery(fetchSpaceChannels(spaceId));
    const parsed = JSON.parse(JSON.stringify(res))[0] as { id: number, space_id: number, name: string, 'category+0': number }[];
    const channels = parsed.map(channel => { return { ...channel, category: channel['category+0'], description: "" } as Channel; });

    return { 
        props: {
            spaces: parsedSpaces,
            channels: channels
        }
    }
    
}) satisfies GetServerSideProps<MePageProps>;  

const MePage: NextPage<MePageProps> = ({ spaces, channels }) => {
    return (
    <RootLayout spaces={spaces} channels={channels}>
        Here should have a board;
        adding on the option to view statistics;
        also a way to profile and settings
    </RootLayout>
    );
}

export default MePage;