import { FC, useCallback } from 'react';

export const enum Direction {
    HORIZONTAL,
    VERTICAL
}

type DividerProps = {
    direction: Direction,
    thick: number // The thickness of the divider in pixels (not rem)
    margin: number // Divider is max extended by default, and the padding provides the freedom to style it,
    color: string,
}

const DEFAULT_STYLE = 'rounded-full';
const Divider: FC<DividerProps> = ({ direction, thick, margin, color }): JSX.Element => {
    
    const getStyle = useCallback((): string => {
        let returnString = DEFAULT_STYLE;

        // Check Direction of the divider, whether a horizontal line or a vertical line, adjusts styles accordingly
        if (direction == Direction.HORIZONTAL) {
            // Width is max and height to 1
            returnString += ` w-full h-[${thick}px]`;

            // Add padding for the horizontal direction
            returnString += ` mx-${margin}`;
        } else {
            // Height is max, width to 1
            returnString += ` h-full w-[${thick}px]`;
            
            // Add padding for the vertical direction
            returnString += ` my-${margin}`;
        }

        // Set color
        returnString += ` bg-${color}`;

        return returnString;
    }, [direction, thick, margin, color]);

    return (
    <div className={getStyle()} />
    );
};

export default Divider;