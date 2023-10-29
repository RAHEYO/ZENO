import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Divider from '../General/Divider';
import { Space, dummyUserSpaceId } from '@/Utils/SpaceUtils';
import { getChannelRoute, getSpaceRoute } from '@/Utils/SpaceUtils';

type NavPrimaryProps = {
    currentSpaceId: number,
    spaces: Space[], 
    onNavigate: (toId: number) => void
}

const DEFAULT_SPACE_PROFILE_STYLE = 'rounded-xl border-neutral overflow-clip object-cover aspect-square';
const DEFAULT_MY_SPACE_PROFILE_STYLE = 'rounded-2xl border-neutral overflow-clip object-cover aspect-square';

const NavPrimary: FC<NavPrimaryProps> = ({ currentSpaceId, spaces, onNavigate }): JSX.Element => {
    // Border is bolder if the user is in the this current space
    const getSpaceProfileStyle = (id: number) => {
        const inCurrentSpace: boolean = currentSpaceId == id;

        if (inCurrentSpace) {
            // I made the Personal Space bigger to emphasize
            if (id == dummyUserSpaceId) return DEFAULT_MY_SPACE_PROFILE_STYLE + ' border-[3px]';

            return DEFAULT_SPACE_PROFILE_STYLE + ' border-[3px]';
        } else {
            return DEFAULT_SPACE_PROFILE_STYLE + ' border';
        }
    }

    const personalSpace: Space = spaces.find(space => space.id == dummyUserSpaceId)!;
    const publicSpaces: Space[] = spaces.filter(space => space.id != dummyUserSpaceId);

    return (
    <div className="flex flex-col h-full w-[70px] bg-bar py-5 px-2 space-y-3 items-center">
        {/* 
        User's perosnal space specifically rendered at the top -
        TODO: Change to real profile picture 
        */}
        <Link href={getChannelRoute(getSpaceRoute(personalSpace.id), personalSpace.default_channel)} onMouseDown={() => onNavigate(personalSpace.id)}>
            <Image className={getSpaceProfileStyle(personalSpace.id)} src={personalSpace.profile_pic} alt="Profile Pic" width={50} height={50} />
        </Link>
        <Divider className='rounded-full w-full h-1 bg-neutral' />

        { // Normal spaces are rendered over here
            publicSpaces.map((space) => {
                const { id, name, profile_pic: profilePic } = space;
                
                return (
                    <Link key={id} href={getChannelRoute(getSpaceRoute(id), space.default_channel)} onMouseDown={() => onNavigate(id)} className='hover:scale-105 transition'>
                        <Image className={getSpaceProfileStyle(id)} src={profilePic} width={45} height={45} alt={`${name} Profile`} />
                    </Link>
                );
            })
        }
    </div>
    );
};

export default NavPrimary;