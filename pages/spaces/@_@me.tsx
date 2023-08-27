import { NextPage } from 'next';

import RootLayout from '@/Components/Nav/RootLayout';

type MePageProps = {

}

const MePage: NextPage<MePageProps> = () => {
    return (
    <RootLayout>
        Here should have a board;
        adding on the option to view statistics;
        also a way to profile and settings
    </RootLayout>
    );
}

export default MePage;