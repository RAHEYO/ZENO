import { FC , useEffect, useState } from 'react';

import { ChannelConfigsType } from '@/pages/api/ChannelConfig';
import Spacebar from '../General/Spacebar';

type ChannelGeneralConfigsProps = {
    channelSettings: ChannelConfigsType
}

const ChannelGeneralConfigs: FC<ChannelGeneralConfigsProps> = ({ channelSettings }): JSX.Element => {
    const [changesPresent, setChangesPresent] = useState(false);

    const [channelName, setChannelName] = useState(channelSettings.channel_name);
    const [channelDesc, setChannelDesc] = useState(channelSettings.channel_description);

    const commitChanges = async () => {
        console.log('Committing changes...');
        console.warn(channelName);
        console.warn(channelDesc);
        console.log('Changes committed!');
    }

    const revertChanges = () => {
        setChannelName(channelSettings.channel_name);
        setChannelDesc(channelSettings.channel_description);
    }

    useEffect(() => {
        if (channelName !== channelSettings.channel_name || channelDesc !== channelSettings.channel_description) {
            setChangesPresent(true);
        } else {
            setChangesPresent(false);
        }
    }, [channelName, channelDesc, channelSettings.channel_name, channelSettings.channel_description]);
    
    return (
    <div className='w-full flex flex-col'>
        {JSON.stringify(channelSettings)}

        <div className='flex flex-row'>
            <label>Channel Name</label>
            <Spacebar className='w-10' />
            <input 
            style={{ color: 'black', width: '200px' }} 
            type='text' 
            placeholder='Channel Name' 
            value={channelName}
            onChange={({target}) => setChannelName(target.value)}
            />
        </div>

        <Spacebar className='h-10' />

        <div className='flex flex-col'>
            <label>Channel Description</label>
            <textarea 
            style={{ color: 'black' }} 
            placeholder='Channel Description' 
            value={channelDesc} 
            onChange={({target}) => setChannelDesc(target.value)}
            />
        </div>

        <Spacebar className='h-20' />

        {
            changesPresent && 
            <div className='w-full h-20 flex flex-row justify-evenly align-center'>
                <button className='bg-red-400 w-40' onClick={revertChanges}>Discard</button>
                <button className='bg-teal-400 w-40' onClick={commitChanges}>Save</button>
            </div>
        }
    </div>
    );
};

export default ChannelGeneralConfigs;