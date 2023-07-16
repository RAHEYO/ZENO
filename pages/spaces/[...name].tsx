import { NextPage } from 'next';
import { useRouter } from 'next/router'
import path from 'path';

import RootLayout from '@/Components/Nav/RootLayout';

type SpacePageProps = {

}

const SpacePage: NextPage<SpacePageProps> = () => {
    const router = useRouter();
    const pagePath = router.asPath;
    const dirName = path.dirname(pagePath);
    
    const channelId = path.basename(pagePath);

    return (
    <RootLayout>
        @_@ TO SpaceId: {channelId}
    </RootLayout>
    );
}

export default SpacePage;