import { NextPage, GetServerSideProps } from 'next';

import { Channel, ChannelCategory } from '../api/Channel';
import RootLayout from '@/Components/Nav/RootLayout';
import MeSpace from './@_@me';
import TextChannel from '@/Components/Channel/TextChannel';
import { Space } from '../api/spaces/[user_id]';
import { Message } from '../api/messages/[channel_id]';
import { getChannelIdFromRoute, getSpaceIdFromRoute } from '@/Utils/space';
import { User } from '@/Utils/UserUtils';
import { dummyUserSpaceId } from '../api/Space';

type SpacePageProps = {
    spaces: Space[],
    channel?: Channel | undefined,
    channels: Channel[],
    messages?: Message[],
    senders?: User[]
}

export const getServerSideProps = (async (context) => {
    // Fetch all spaces of the user
    // TODO: TB CHANGED LATER, MAKE IT USER-SPECIFIC
    
    const fetchedSpaces = await fetch(`http://localhost:3000/api/spaces/${dummyUserSpaceId}`, { method: 'GET' });
    const { spaces }: { spaces: Space[] } = await fetchedSpaces.json();

    // Fetch all channels of the current space
    const spaceId = getSpaceIdFromRoute(context);
    const channelId = getChannelIdFromRoute(context);

    if (Number.isNaN(channelId) || Number.isNaN(spaceId)) {
        return { 
            notFound: true    
        };
    }

    // Use the current space to fetch for the belonging channels~
    const fetchedChannels = await fetch(`http://localhost:3000/api/channels/by_space/${spaceId}`, { method: 'GET' });
    const { channels }: { channels: Channel[] } = await fetchedChannels.json();
    
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
        const fetchMsgs = await fetch(`http://localhost:3000/api/messages/${currentChannel.id}`, { method: 'GET' });
        const { messages }: { messages: Message[] } = await fetchMsgs.json();

        var senders: User[] = []
        if (messages.length != 0) {
            const senderIds = [... new Set(messages.map(msg => msg.sender))];
            const sendySenders = await fetch(`http://localhost:3000/api/users/User?ids=${senderIds}`, { method: 'GET' });
            senders = (await sendySenders.json()).users as User[];
        }

        return { 
            props: {
                spaces: spaces,
                channel: currentChannel,
                channels: channels,
                messages: messages,
                senders: senders
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


const SpacePage: NextPage<SpacePageProps> = ({ spaces, channel, channels, messages, senders }) => {
    if (channels.length == 0 || channel == undefined) {
        return (
        <RootLayout spaces={spaces} channels={channels}>
            No Channels Exists    
        </RootLayout>
        )
    }


    return (
    <RootLayout spaces={spaces} channels={channels}>
        { channel.category == ChannelCategory.Chat ? <TextChannel channel={channel} messages={messages!} senders={senders!} /> : <MeSpace spaces={spaces} channels={channels} /> }
    </RootLayout>
    );
}

export default SpacePage;