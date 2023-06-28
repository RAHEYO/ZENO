import { FC } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import Divider, { Direction } from './General/Divider';
import { Space } from '../Dummies/Spaces';
import { getSpaceRoute } from '@/pages/spaces/Utils';

type NavPrimaryProps = {
    currentSpaceId: string,
    spaces: Space[], 
    onNavigate: (toId: string) => void
}

const DEFAULT_SPACE_PROFILE_STYLE = 'rounded-xl border-neutral overflow-clip object-cover aspect-square';
const DEFAULT_MY_SPACE_PROFILE_STYLE = 'rounded-2xl border-neutral overflow-clip object-cover aspect-square';

const NavPrimary: FC<NavPrimaryProps> = ({ currentSpaceId, spaces, onNavigate }): JSX.Element => {
    // Border is bolder if the user is in the this current space
    const getSpaceProfileStyle = (id: string) => {
        const inCurrentSpace: boolean = currentSpaceId === id;

        if (inCurrentSpace) {
            // I made the Personal Space bigger to emphasize
            if (id === 'me') return DEFAULT_MY_SPACE_PROFILE_STYLE + ' border-[3px]';

            return DEFAULT_SPACE_PROFILE_STYLE + ' border-[3px]';
        } else {
            return DEFAULT_SPACE_PROFILE_STYLE + ' border';
        }
    }

    return (
    <div className="flex flex-col h-full w-[70px] bg-bar py-5 space-y-3 items-center">
        {/* TODO: Change to real profile picture */}
        <Link href='/' onMouseDown={() => onNavigate('me')}>
            <Image className={getSpaceProfileStyle('me')} src="https://tinyurl.com/Example-Profile-Pic" alt="Profile Pic" width={50} height={50} />
        </Link>
        <Divider direction={Direction.HORIZONTAL} thick={3} color='neutral' margin={1} />

        {
            spaces.map((space) => {
                const { id, name, profilePic } = space;
                
                return (
                    <Link key={id} href={getSpaceRoute(id)} onMouseDown={() => onNavigate(id)} className='hover:scale-105 transition'>
                        <Image className={getSpaceProfileStyle(id)} src={profilePic} width={45} height={45} alt={`${name} Profile`} />
                    </Link>
                );
            })
        }
    </div>
    );
};

export default NavPrimary;