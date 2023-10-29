import { NextPage, GetServerSideProps } from 'next';

import { dummyUserSpaceId, fetcher } from '@/Utils/General';
import { Space } from '@/Utils/SpaceUtils';
import { Channel } from '@/Utils/ChannelUtils';
import RootLayout from '@/Components/Nav/RootLayout';


type MePageProps = {
    spaces: Space[],
    channels: Channel[]
}

export const getServerSideProps = (async (context) => {
    // Fetch all spaces of the user
    // TODO: TB CHANGED LATER, MAKE IT USER-SPECIFIC
    const spaces = (await fetcher(`http://localhost:3000/api/spaces/${dummyUserSpaceId}`)).spaces as Space[];

    // Use the current space to fetch for the belonging channels~
    const channels = (await fetcher(`http://localhost:3000/api/channels/by_space/${dummyUserSpaceId}`)).channels as Channel[];

    if (channels.length == 0) {
        return {
            props: {
                spaces: spaces,
                channels: []
            }
        };
    }

    return { 
        props: {
            spaces: spaces,
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