import { NextPage, GetServerSideProps } from 'next';

import { Space, dummyUserSpaceId } from '@/Utils/SpaceUtils';
import { Channel } from '@/Utils/ChannelUtils';
import RootLayout from '@/Components/Nav/RootLayout';


type MePageProps = {
    spaces: Space[],
    channels: Channel[]
}

export const getServerSideProps = (async (context) => {
    // Fetch all spaces of the user
    // TODO: TB CHANGED LATER, MAKE IT USER-SPECIFIC
    const fetchedSpaces = await fetch(`http://localhost:3000/api/spaces/8`, { method: 'GET' });
    const { spaces }: { spaces: Space[] } = await fetchedSpaces.json();

    // Use the current space to fetch for the belonging channels~
    const fetchedChannels = await fetch(`http://localhost:3000/api/channels/by_space/${dummyUserSpaceId}`, { method: 'GET' });
    const { channels }: { channels: Channel[] } = await fetchedChannels.json();
    
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