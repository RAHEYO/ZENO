import { myQuery } from '../../pages/api/mysql';
import { NextPage, GetServerSideProps } from 'next';

import { Channel, ChannelCategory, fetchSpaceChannels } from '../api/Channel';
import RootLayout from '@/Components/Nav/RootLayout';
import MeSpace from './@_@me';
import TextChannel from '@/Components/Channel/TextChannel';
import { Space, dummyUserSpaceId, fetchUserSpaces } from '../api/Space';
import { Message, fetchChannelMessages } from '../api/messages/[channel_id]';
import { getChannelIdFromRoute, getSpaceIdFromRoute } from '@/Utils/space';
import { User, fetchSendersInIds } from '../api/User';

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
    const resSpaces = await myQuery(fetchUserSpaces(dummyUserSpaceId));
    const parsedSpaces = JSON.parse(JSON.stringify(resSpaces))[0] as Space[];


    // Fetch all channels of the current space
    const spaceId = getSpaceIdFromRoute(context);
    const channelId = getChannelIdFromRoute(context);

    if (Number.isNaN(channelId) || Number.isNaN(spaceId)) {
        return { 
            notFound: true    
        };
    }

    const res = await myQuery(fetchSpaceChannels(spaceId));
    const parsed = JSON.parse(JSON.stringify(res))[0];

    // In case there are no channels in the space
    if (parsed.length == 0) {
        return {
            props: {
                spaces: parsedSpaces,
                channels: []
            }
        }
    }

    // Otherwise channels do exist
    const channels = (parsed as { id: number, space_id: number, name: string, "category+0": number }[]).map(channel => { return { id: channel.id, space_id: channel.space_id, name: channel.name, category: channel['category+0'], description: "" } as Channel; });

    // Filter to find the current channel
    const currentChannel = channels.find(channel => channel.id === channelId)!;

    // Fetch messages and their corresponding senders for the text channel
    if (currentChannel && currentChannel.category == ChannelCategory.Chat) {
        const fetchMsgs = await myQuery(fetchChannelMessages(channelId));
        const parsedMsgs = JSON.parse(JSON.stringify(fetchMsgs))[0];
        const messages = parsedMsgs.map((msg: any) => { return { id: msg.id as number, sender: msg.sender as number, content: msg.content as string, sent_time: msg.sent_time as Date } as Message }) as Message[];

        let senders: User[] = []
        if (messages.length != 0) {
            const senderIds = messages.map(msg => msg.sender);
            const fetchSenders = await myQuery(fetchSendersInIds(senderIds));
            const parsedSenders = JSON.parse(JSON.stringify(fetchSenders))[0];
            senders = parsedSenders.map((sender: any) => { return { id: sender.id as number, username: sender.username as string, pic: sender.pic as string } }) as User[];
        }

        return { 
            props: {
                spaces: parsedSpaces,
                channel: currentChannel,
                channels: channels,
                messages: messages,
                senders: senders
            }
        }
    }

    return { 
        props: {
            spaces: parsedSpaces,
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