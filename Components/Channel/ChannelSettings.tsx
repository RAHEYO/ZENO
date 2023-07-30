import { FC, useState } from 'react';
import { CgClose } from 'react-icons/cg';
import Spacebar from '../General/Spacebar';
import SettingCategory from '../General/SettingCategory';

type SettingsProps = {
    isVisible: boolean,
    toggleWindow: (isVisible: boolean) => void
}

const settingCategories = [
    "General",
    "Roles",
    "Permissions"
];

type SettingOption = {
    name: string,
    value: string,
}

// A list of dummy data for the settings
// TODO: Fill in this JSON with SettingOptions, a bunch...
type ChannelSettings = {
    channel_name: SettingOption,
    channel_description: SettingOption
};

const Settings: FC<SettingsProps> = ({ isVisible, toggleWindow }) => {
    const [categoryIndex, setCategoryIndex] = useState(0);

    if (!isVisible) return null;

    // Navigate to the next setting category
    const navigateSettings = (nextIndex: number) => {
        setCategoryIndex(nextIndex);
    }

    return (
    <div className='fixed flex flex-row space-x-10 z-50 top-0 bottom-0 left-0 right-0 w-screen h-screen px-36 bg-neutral'>
        <div key="Setting List" className='py-20'>
            Settings

            <Spacebar className='h-10' />

            {
                settingCategories.map((category, index) => (
                <SettingCategory key={category} index={index} category={category} focused={categoryIndex == index} onNavigate={navigateSettings} />
                ))
            }
        </div>

        <div key="Setting Options" className='w-full h-full bg-background py-20'>
            
        </div>
        
        <CgClose key="Close Settings" className='my-20 w-12 h-12 hover:cursor-pointer' color='white' onClick={() => toggleWindow(false)} />
    </div>
    );
};

export default Settings;
