import { User } from "./UserUtils";
import { Message } from "./MessageUtils";

// Constants
// By default we assume the current user has the id of 0, which infers that the personal space matches the user's id as well
export const dummyUserSpaceId = 1;

// Fetchers for SWR
export const fetcher = (url: string) => fetch(url, { method: 'GET' }).then(res => res.json()); // General one

export const textChannelFetcher = (url: string) => fetch(url, { method: 'GET' })
.then(res => res.json() as Promise<{ messages: Message[], users: User[] }>); // This one is typed!

// API endpoints
export const channelMessagesAPI = (channel_id: number): string => `http://localhost:3000/api/messages/${channel_id}`; // For text channel messages