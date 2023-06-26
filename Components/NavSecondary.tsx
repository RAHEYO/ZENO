import { FC } from 'react';

type NavSecondaryProps = {

}

const NavSecondary: FC<NavSecondaryProps> = (props): JSX.Element => {
    return (
    <div className="w-[150px] h-full">
        <div className='h-[100px] flex flex-row bg-bar items-center justify-around'>
            Your Space
        </div>
        <div className='h-full bg-neutral'>
            
        </div>
    </div>
    );
};

export default NavSecondary;