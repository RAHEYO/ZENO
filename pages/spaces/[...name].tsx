import { NextPage, GetServerSideProps } from 'next';
import { SWRConfig } from 'swr';

import { fetcher } from '@/Utils/General';
import { Channel, ChannelCategory } from '@/Utils/ChannelUtils';
import RootLayout from '@/Components/Nav/RootLayout';
import MeSpace from './@_@me';
import TextChannel from '@/Components/Channel/TextChannel';
import { Space } from '@/Utils/SpaceUtils';
import { Message } from '@/Utils/MessageUtils';
import { getChannelIdFromRoute, getSpaceIdFromRoute } from '@/Utils/SpaceUtils';
import { User } from '@/Utils/UserUtils';
import { dummyUserSpaceId, channelMessagesAPI } from '@/Utils/General';

type SpacePageProps = {
    spaces: Space[],
    channel?: Channel | undefined,
    channels: Channel[],
    fallback?: {
        [key: string]: any
    }
}

export const getServerSideProps = (async (context) => {
    // Fetch all spaces of the user
    // TODO: TB CHANGED LATER, MAKE IT USER-SPECIFIC

    const { spaces }: { spaces: Space[] } = await fetcher(`http://localhost:3000/api/spaces/${dummyUserSpaceId}`, );

    // Fetch all channels of the current space
    const spaceId = getSpaceIdFromRoute(context);
    const channelId = getChannelIdFromRoute(context);

    if (Number.isNaN(channelId) || Number.isNaN(spaceId)) {
        return { 
            notFound: true    
        };
    }

    // Use the current space to fetch for the belonging channels~
    const { channels }: { channels: Channel[] } = await fetcher(`http://localhost:3000/api/channels/by_space/${spaceId}`);

    if (channels.length == 0) {
        return {
            props: {
                spaces: spaces,
                channels: []
            }
        };
    }

    // Filter to find the current channel
    const currentChannel = channels.find(channel => channel.id === channelId)!;

    // Fetch messages and their corresponding senders for the text channel
    if (currentChannel && currentChannel.category == ChannelCategory.Chat) {
        const msgsAPI = channelMessagesAPI(currentChannel.id)
        const data: { messages: Message[], users: User[] } = (await fetcher(msgsAPI));

        return { 
            props: {
                spaces: spaces,
                channel: currentChannel,
                channels: channels,
                fallback: {
                    [msgsAPI]: data,
                }
            }
        }
    }

    return { 
        props: {
            spaces: spaces,
            channel: currentChannel,
            channels: channels
        }
    }
    
}) satisfies GetServerSideProps<SpacePageProps>;  


const SpacePage: NextPage<SpacePageProps> = ({ spaces, channel, channels, fallback }) => {
    

    if (channels.length == 0 || channel == undefined) {
        return (
        <RootLayout spaces={spaces} channels={channels}>
            No Channels Exists    
        </RootLayout>
        )
    }

    return (
    <RootLayout spaces={spaces} channels={channels}>
        { channel.category == ChannelCategory.Chat ? 
        <SWRConfig value={{ fallback }} >
            <TextChannel channel={channel} /> 
        </SWRConfig>
        : <MeSpace spaces={spaces} channels={channels} /> }
    </RootLayout>
    );
}

export default SpacePage;