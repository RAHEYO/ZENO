import { FC } from "react";
import { WhiteBoardItemProps } from "./WhiteboardChannel";

export const Shape: FC<WhiteBoardItemProps> = ({xPosition, yPosition, center, width, height, type, opacity, id}): JSX.Element => {

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
							id = {id}
							width={width} 
							height = {height} 
							style={{
								fill: color
							}}
						/>
			case "circle":
				styles.width = width + borderThickness + 5;
				styles.height = height + borderThickness + 5;
				return <circle
							id = {id}
							cx = {width/2}
							cy = {height/2}
							r = {width/2}
							style={{
								fill: "red",
								opacity: opacity,
							}}
						/>
			case "triangle":
				// Relative to svg container
				const bottomLeft = 0 + "," + height
				const bottomRight = width + "," + height
				const top = width/2 + "," + 0

				const points = [bottomLeft, bottomRight, top]
				return <polygon 
							id = {id}
							points={points.join(" ")} 
							style={{
								fill: "lime",
								opacity: opacity,
							}}
						/>
							
		}
	}

	return (
			<svg id = {id} {...styles}>
				{getSvg()}
			</svg>
	);

};