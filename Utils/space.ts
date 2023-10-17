// A utils file that basically contains a bunch of functions shared in multiple places,
// it is better to define them in a singular file so we only need to change 1 place whenever there is a need for a fix
import { GetServerSidePropsContext } from "next";
import path from "path";

import { dummyUserSpaceId } from "@/pages/api/Space";

// Returns the route of current space
export const getSpaceRoute = (spaceId: number): string => {

    return path.join('/spaces', spaceId.toString());
}

// Returns the route of the current channel inside the space
export const getChannelRoute = (spaceRoute: string, channelId: number): string => {
    return path.join(spaceRoute, channelId.toString());
}

// Returns the current space id from the route
export const getSpaceIdFromRoute = (context: GetServerSidePropsContext): number => {
    const { resolvedUrl } = context;
    const props = resolvedUrl.split('spaces/')[resolvedUrl.split('spaces/').length - 1];
    const spaceId = props.split('/')[0];
    
    if (spaceId === "@_@me") {
        return dummyUserSpaceId;
    }

    return parseInt(spaceId);
}

export const getChannelIdFromRoute = (context: GetServerSidePropsContext): number => {
    const { resolvedUrl } = context;
    const props = resolvedUrl.split('spaces/')[resolvedUrl.split('spaces/').length - 1];
    const channelId = parseInt(props.split('/')[1]);

    return channelId;
}


// Returns the default route of first-render => user's main personal board w/ no channel specified
export const DEFAULT_ROUTE = getSpaceRoute(dummyUserSpaceId);

// Dummy default channel id for all spaces => "0"
// TODO: Use the actual user-specified default_channel_id instead~
export const dummyDefaultChannelId = dummyUserSpaceId;