// A utils file that basically contains a bunch of functions shared in multiple places,
// it is better to define them in a singular file so we only need to change 1 place whenever there is a need for a fix
import path from "path";

// Returns the route of current space
export const getSpaceRoute = (spaceName?: string): string => {
    // If spaceName parameter is passed a value, means in a defined space;
    if (spaceName) {
        return path.join('/spaces', spaceName);
    }

    // Otherwise no space selected, space route is the root (me space)
    return '/';
}

// Returns the route of the current channel inside the space
export const getChannelRoute = (spaceRoute: string, channelName: string): string => {
    return path.join(spaceRoute, channelName);
}
