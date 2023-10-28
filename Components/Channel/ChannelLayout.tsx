import { NextPage } from 'next';
import { ReactNode, useState } from 'react';

import { Channel } from '@/pages/api/Channel';
import ChannelSettings from './ChannelConfigs';

type ChannelLayoutProps = {
    channel: Channel,
    children: ReactNode
}

const ChannelLayout: NextPage<ChannelLayoutProps> = ({ channel, children }) => {
    const [isSettingVisible, setIsSettingVisible] = useState(false);

    // Open a modal on top of this page, this modal should get us to the settings modal component
    const toggleSettingsModal = (state: boolean) => setIsSettingVisible(state);

    return (
    <>
        <div className={isSettingVisible ? `hidden` : undefined}>
            <div className="fixed w-full top-0 z-10 p-5 h-[70px] bg-gradient-to-br from-bar to-neutral border-b">
                <button onClick={() => toggleSettingsModal(true)}>
                / { channel.name } (id: {channel.id})
                </button>
            </div>

            { children }
        </div>

        <ChannelSettings isVisible={isSettingVisible} channel={channel} toggleWindow={toggleSettingsModal} />

    </>
    );
}

export default ChannelLayout;