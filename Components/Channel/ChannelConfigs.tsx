import { FC, useCallback, useEffect, useState } from 'react';
import { CgClose } from 'react-icons/cg';

import  { ChannelConfigsType, channelConfigCategories } from '@/Dummies/ChannelConfigs';
import dummyUserChannelBonds from '@/Dummies/UserChannelBond';
import dummyRoleRelations from '@/Dummies/RoleRelation';
import { Channel } from '@/Dummies/Channels';
import Spacebar from '../General/Spacebar';
import SettingCategory from '../General/SettingCategory';
import ChannelGeneralConfigs from './ChannelGeneralConfigs';
import ChannelPermissionConfigs from './ChannelPermissionConfigs';
import ChannelMembersConfigs from './ChannelMembersConfigss';

type ChannelConfigProps = {
    channel: Channel,
    isVisible: boolean,
    toggleWindow: (isVisible: boolean) => void
}

const ChannelSettings: FC<ChannelConfigProps> = ({ channel, isVisible, toggleWindow }) => {
    const [categoryIndex, setCategoryIndex] = useState(0);
    const [configs, setConfigs] = useState<ChannelConfigsType|null>(null);

    // Extract the setting after matching the channel id with current the channel~
    const extractSettings = useCallback(() => {
        // TODO: Implement the interface to fetch the settings from the server to the client configuration of the channel
        let members = dummyUserChannelBonds.filter(bond => bond.channel_id == channel.id).map(bond => bond.user_id).sort(member => member);
        let roles = dummyRoleRelations.filter(role => role.channel_id == channel.id).sort(role => role.id);

        const fetchedConfigs = {
            channel_name: channel.name,
            channel_description: channel.description,
            roles: roles,
            members: members
        };
        
        setConfigs(fetchedConfigs);
    }, [channel])

    useEffect(() => {
        extractSettings();
    }, [extractSettings])


    if (!isVisible || !configs) return null;


    // Navigate to the next setting category
    const navigateSettings = (nextIndex: number) => {
        setCategoryIndex(nextIndex);
    }

    console.warn(configs);

    return (
    <div className='fixed flex flex-row space-x-10 z-50 top-0 bottom-0 left-0 right-0 w-screen h-screen px-36 bg-neutral'>
        <div key="Setting List" className='py-20'>
            Settings

            <Spacebar className='h-10' />

            {
                channelConfigCategories.map((category, index) => (
                <SettingCategory key={category} index={index} category={category} focused={categoryIndex == index} onNavigate={navigateSettings} />
                ))
            }
        </div>

        <div key="Setting Options" className='w-full h-full bg-background py-20'>
            { 
                categoryIndex == 0 ? (<ChannelGeneralConfigs channelSettings={configs} />) 
                : 
                categoryIndex == 1 ? (<ChannelPermissionConfigs channelSettings={configs} />) 
                : 
                (<ChannelMembersConfigs channelSettings={configs} />)
            }
        </div>
        
        <CgClose key="Close Settings" className='my-20 w-12 h-12 hover:cursor-pointer' color='white' onClick={() => toggleWindow(false)} />
    </div>
    );
};

export default ChannelSettings;
