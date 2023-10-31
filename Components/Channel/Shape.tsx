import { FC } from "react";
import { WhiteBoardItemProps } from "./WhiteboardChannel";

export const Shape: FC<WhiteBoardItemProps> = ({xPosition, yPosition, center, width, height, type, opacity, id}): JSX.Element => {

	const styles = {
		width: width,
		height: height
	}

	const borderThickness = 0;

	const getSvg = () => {
		switch(type){
			case "rect":
				return <rect 
							id = {id}
							width={width} 
							height = {height} 
							style={{
								opacity: opacity
							}}
						className={opacity !== 1 ? "fill-emerald-200" : "fill-blue-500"}
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
								opacity: opacity,
							}}
							className="fill-rose-500"
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
								opacity: opacity,
							}}
							className="fill-green-400"
						/>
							
		}
	}

	return (
			<svg id = {id} {...styles}>
				{getSvg()}
			</svg>
	);

};