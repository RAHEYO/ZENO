import { NextPage, GetServerSideProps } from 'next';
import Image from 'next/image';

import { dummyUserSpaceId, fetcher } from '@/Utils/General';
import { Space } from '@/Utils/SpaceUtils';
import { Channel } from '@/Utils/ChannelUtils';
import { FaUserFriends } from 'react-icons/fa';
import { IoIosNotifications } from 'react-icons/io';
import Spacebar from '@/Components/General/Spacebar';
import DashboardCard from '@/Components/Channel/DashboardCard';


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
    // TODO: CHANGE THE DUMNY FOCUS TIME!
    const focusTime: number = 73;
    const avgFocusTime: number = 108;

    const timeConversion = (time: number): string => {
        if (time < 60) {
            return `${time} minutes`;
        }

        const hrs = Math.floor(time / 60);
        const mins = time % 60;
        return `${hrs} hours ${mins} minutes`;
    }

    return (
            <div className='py-14 px-10'>
                <div className='flex flex-row justify-between items-center'>
                    <h1 className='text-primary'>Welcome Back Ryan! @_@</h1>
                    <Image className='rounded-2xl border-neutral hover:border-foreground overflow-clip object-cover aspect-square border-[3px]' src='https://tinyurl.com/Example-Profile-Pic' alt="Profile Pic" width={55} height={55} />
                </div>

                <Spacebar className="h-10" />

                <div className='w-full flex flex-row items-center'>
                    <h2 className='text-gray-100'>You have focused for </h2>
                    <Spacebar className="w-3" />
                    <h1 className='text-accent'>{timeConversion(focusTime)}</h1>
                    <Spacebar className="w-3" />
                    <h2 className='text-gray-100'>today! Keep going~</h2>
                </div>

                <Spacebar className="h-40" />

                <div className='flex flex-row items-center justify-around'>
                    <DashboardCard>
                        <h3>Avg Focus Time (Last 7 Days)</h3>
                        <h1 className='text-secondary'>{timeConversion(avgFocusTime)}</h1>
                    </DashboardCard>

                    <DashboardCard>
                        <h3>My Social Sphere</h3>
                        <FaUserFriends className='text-7xl text-secondary' />
                    </DashboardCard>
                    
                    <DashboardCard>
                        <h3>Nofitications</h3>
                        <IoIosNotifications className='text-7xl text-secondary' />
                    </DashboardCard>
                </div>
            </div>
    );
}

export default MePage;