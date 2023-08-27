import { FC, useCallback, useEffect, useState } from 'react';
import { CgClose } from 'react-icons/cg';

import dummyChannelSettings, { ChannelSettingsType, settingCategories } from '@/Dummies/ChannelSettings';
import { Channel } from '@/Dummies/Channels';
import Spacebar from '../General/Spacebar';
import SettingCategory from '../General/SettingCategory';
import ChannelGeneralSettings from './ChannelGeneralSettings';
import ChannelPermissionSettings from './ChannelPermissionSettings';
import ChannelMembersSettings from './ChannelMembersSettings';

type SettingsProps = {
    channel: Channel,
    isVisible: boolean,
    toggleWindow: (isVisible: boolean) => void
}

const ChannelSettings: FC<SettingsProps> = ({ channel, isVisible, toggleWindow }) => {
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [settings, setSettings] = useState<ChannelSettingsType|null>(null);

    // Extract the setting after matching the channel id with current the channel~
    const extractSettings = useCallback(() => {
        const fetchedSettings: ChannelSettingsType = dummyChannelSettings.find((channelSettings) => channelSettings.channelId == channel.id)!;
        
        setSettings(fetchedSettings);
    }, [channel])

    useEffect(() => {
        extractSettings();
    }, [extractSettings])


    if (!isVisible || !settings) return null;



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
            { 
                categoryIndex == 0 ? (<ChannelGeneralSettings channelSettings={settings} />) 
                : 
                categoryIndex == 1 ? (<ChannelPermissionSettings channelSettings={settings} />) 
                : 
                (<ChannelMembersSettings channelSettings={settings} />)
            }
        </div>
        
        <CgClose key="Close Settings" className='my-20 w-12 h-12 hover:cursor-pointer' color='white' onClick={() => toggleWindow(false)} />
    </div>
    );
};

export default ChannelSettings;
