import { FC } from 'react';
import Image from 'next/image';

import Divider, { Direction } from './General/Divider';
import dummySpaces from '../Dummies/Spaces';
import Spacebar from './General/Spacebar';

type NavPrimaryProps = {
    currentPageId: number,
    navigate: () => void
}

const DEFAULT_SPACE_STYLE = 'rounded-md border-neutral overflow-clip object-cover aspect-square';

const NavPrimary: FC<NavPrimaryProps> = ({ currentPageId, navigate }): JSX.Element => {
    // Border is bolder if the user is in the this current space
    const getSpaceStyle = (id: number) => {
        const inCurrentSpace: boolean = currentPageId == id;

        if (inCurrentSpace) {
            return DEFAULT_SPACE_STYLE + ' border-2';
        } else {
            return DEFAULT_SPACE_STYLE + ' border'
        }
    }

    return (
    <div className="sticky flex flex-col h-full w-[70px] top-full start-0 bg-bar py-5 space-y-3 items-center">
        {/* TODO: Change to real profile picture */}
        <Image className='object-cover overflow-clip rounded-lg' src="https://tinyurl.com/Example-Profile-Pic" alt="Profile Pic" width={50} height={50} />
        <Divider direction={Direction.HORIZONTAL} thick={3} color='neutral' margin={1} />

        {
            dummySpaces.map((space) => {
                const { id, name, profilePic } = space;
                
                return (
                    <div key={id} onClick={navigate} className='hover:scale-105 transition'>
                        <Image className={getSpaceStyle(id)} src={profilePic} width={45} height={45} alt={`${name} Profile`} />
                    </div>
                );
            })
        }
    </div>
    );
};

export default NavPrimary;