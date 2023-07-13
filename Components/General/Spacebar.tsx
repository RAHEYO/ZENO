import { FC } from 'react';

type SpacebarProps = {
    className: string
}

const Spacebar: FC<SpacebarProps> = ({ className }): JSX.Element => {
    return (
    <div className={className} />
    );
};

export default Spacebar;