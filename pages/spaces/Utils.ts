// This is a utils file that basically contains a bunch of functions shared in multiple places,
// it is better to define them in a singular file so we only need to change 1 place whenever there is a need for a fix


export const getSpaceRoute = (spaceId: string): string => {
    return '/spaces/' + spaceId;
}