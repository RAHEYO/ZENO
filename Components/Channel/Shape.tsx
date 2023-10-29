import { FC } from "react";
import { WhiteBoardItemProps } from "./WhiteboardChannel";

export const Shape: FC<WhiteBoardItemProps> = ({xPosition, yPosition, width, height, type, opacity}): JSX.Element => {

	const styles = {
		width: width,
		height: height
	}

	const borderThickness = 0;

	const color = opacity !== 1 ? `rgba(0,105,0,${opacity})` :`rgba(0,0,255,${opacity})`
	const getSvg = () => {
		switch(type){
			case "rect":
				return <rect 
							width={width} 
							height = {height} 
							style={{
								fill: color
							}}
						></rect>
			case "ellipse":
				styles.width = width + borderThickness + 5;
				styles.height = height + borderThickness + 5;
				return <ellipse
							cx = {width/2}
							cy = {height/2}
							rx = {width/2}
							ry = {height/2}>
						</ellipse>
			case "triangle":
							
		}
	}

	return (
			<svg {...styles}>
				{getSvg()}
			</svg>
	);

};