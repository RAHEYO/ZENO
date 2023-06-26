import { FC } from 'react';

import Image from 'next/image';

import dummySpaces from '../Dummies/Spaces';
import Spacebar from './General/Spacebar';
import Divider, { Direction } from './General/Divider';

type RootNavbarProps = {

}

const RootNavbar: FC<RootNavbarProps> = (props): JSX.Element => {
    // TODO: Save this to the LocalStorage to remember which page we're on~
    const currentPageId = 0;

    const navigate = () => {
        console.log("Navigating to parralel page...")
    }

    return (
        <div className="sticky h-full w-16 top-full start-0 bg-bar p-3 space-y-3 items-center">
            {
                dummySpaces.map((space) => {
                    const { id, name, profilePic } = space;

                    return (
                        <div key={id} onClick={navigate} className='hover:scale-105 transition'>
                            <Image className="rounded-md border border-neutral overflow-clip object-cover aspect-square" src={profilePic} width={40} height={40} alt={`${name} Profile`} />
                            {
                                currentPageId == id && (
                                    <>
                                        <Spacebar className="h-1" />
                                        <Divider direction={Direction.HORIZONTAL} color="primary" padding={2} />
                                    </>
                                )
                            }
                        </div>
                    );
                })
            }
        </div>
    );
};

export default RootNavbar;