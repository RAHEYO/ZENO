import { FC, ReactNode } from 'react';

type DashboardCardProps = {
    children: ReactNode
}

const DashboardCard: FC<DashboardCardProps> = ({ children }): JSX.Element => {
    return (
    <div className='p-10 w-[350px] h-[250px] bg-neutral flex flex-col items-center rounded-3xl drop-shadow-lg hover:scale-105 transition space-y-10'>
        {children}
    </div>
    );
};

export default DashboardCard;