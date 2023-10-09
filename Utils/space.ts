// A utils file that basically contains a bunch of functions shared in multiple places,
// it is better to define them in a singular file so we only need to change 1 place whenever there is a need for a fix
import { dummyUserSpaceId } from "@/pages/api/Space";
import path from "path";

// Returns the route of current space
export const getSpaceRoute = (spaceId: number): string => {

    return path.join('/spaces', spaceId.toString());
}

// Returns the route of the current channel inside the space
export const getChannelRoute = (spaceRoute: string, channelId: number): string => {
    return path.join(spaceRoute, channelId.toString());
}


// Returns the default route of first-render => user's main personal board w/ no channel specified
export const DEFAULT_ROUTE = getSpaceRoute(dummyUserSpaceId);

// Dummy default channel id for all spaces => "0"
// TODO: Use the actual user-specified default_channel_id instead~
export const dummyDefaultChannelId = dummyUserSpaceId;