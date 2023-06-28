import { FC } from 'react';

type NavSecondaryProps = {

}

const NavSecondary: FC<NavSecondaryProps> = (props): JSX.Element => {
    return (
    <div className="flex flex-col w-[150px] h-full">
        <div className='h-[100px] flex bg-bar items-center justify-around'>
            Your Space
        </div>
        <div className='h-full bg-neutral'>
            
        </div>
    </div>
    );
};

export default NavSecondary;