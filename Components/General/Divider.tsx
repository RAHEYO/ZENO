import { FC, useCallback } from 'react';

type DividerProps = {
    className: string
}

const DEFAULT_STYLE = 'rounded-full';
const Divider: FC<DividerProps> = ({ className }): JSX.Element => {
    
    return (
        <div className={className} />
    );
};

export default Divider;