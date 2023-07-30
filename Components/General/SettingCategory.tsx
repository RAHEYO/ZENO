import { FC } from 'react';

import Divider from './Divider';

type SettingCategoryProps = {
    category: string,
    index: number,
    focused: boolean,
    onNavigate: (newIndex: number) => void
}

const SettingCategory: FC<SettingCategoryProps> = ({ category, index, focused, onNavigate }): JSX.Element => {
    return (
    <button className='flex flex-row space-x-2 h-10 items-center p-1' onClick={() => onNavigate(index)}> 
        <div className='text-white'>{ category }</div>
        
        <Divider className={'w-1 h-full bg-primary rounded-full overflow-clip transition'  + (!focused && " opacity-0")} />
    </button>
    );
};

export default SettingCategory;