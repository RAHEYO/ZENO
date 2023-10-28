import { FC } from "react";
import { WhiteBoardItemProps } from "./WhiteboardChannel";

export const Shape: FC<WhiteBoardItemProps> = ({xPosition, yPosition, width, height, type}): JSX.Element => {


	const getSvg = () => {
		switch(type){
			case "rect":
				return <rect 
							width={width} 
							height = {height} 
							style={{
								fill:"rgb(0,0,255)"
							}}
						></rect>

		}
	}

	return (
			<svg width = {width} height= {height}>
				{getSvg()}
			</svg>
	);

};