import { FC } from 'react';

export const enum Direction {
    HORIZONTAL,
    VERTICAL
}

type DividerProps = {
    direction: Direction,
    padding: number // Divider is max extended by default, and the padding provides the freedom to style it,
    color: string
}

const DEFAULT_STYLE = 'rounded-full';
const Divider: FC<DividerProps> = ({ direction, padding, color }): JSX.Element => {
    
    const getStyle = (): string => {
        let returnString = DEFAULT_STYLE;

        // Check Direction of the divider, whether a horizontal line or a vertical line, adjusts styles accordingly
        if (direction == Direction.HORIZONTAL) {
            // Width is max and height to 1
            returnString += ' w-full h-1';

            // Add padding for the horizontal direction
            returnString += ` padding-x-${padding}`;
        } else {
            // Height is max, width to 1
            returnString += ' h-full w-1';
            
            // Add padding for the vertical direction
            returnString += ` padding-y-${padding}`;
        }

        // Set color
        returnString += ` bg-${color}`;

        return returnString;
    }

    return (
    <div className={getStyle()} />
    );
};

export default Divider;