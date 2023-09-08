import { FC, useEffect } from "react";

import {IoShapesOutline} from "react-icons/io5"
import {FaPen} from "react-icons/fa";
import { PiCursorFill } from "react-icons/pi";

import ToolButton from "./ToolButton";

import TextIcon from "./Tool-Icons/textboxIcon.png";

export type Tool = {
	style: string,
	type: string
};

const toolStyle = "bg-[white] object-scale-down h-[7.5vh] w-[7.5vh]"

export const AllTools = {
	"text": {
		style: toolStyle,
		type: "text",
	}, 
	"shape": {
		style: toolStyle,
		type: "shape",
	},
	"pen": {
		style: toolStyle,
		type: "pen",
	},
	"cursor": {
		style: toolStyle,
		type: "cursor",
	},
}



type ToolbarProps = {
	selectedTool: Tool
	setSelectedTool: Function
};


const toolbarStyles = "bg-primary max-w-[40vw] max-h-[7.5vh] mx-auto flex justify-evenly"

const Toolbar: FC<ToolbarProps> = ({selectedTool, setSelectedTool}): JSX.Element => {

	return <div className={`toolbar ${toolbarStyles}`}>
	

				<ToolButton
					type = {AllTools.cursor.type}
					style = {AllTools.cursor.style}
					setSelectedTool={setSelectedTool}
				>
					<PiCursorFill style = {{color: "black"}} className="w-full h-full" />
				</ToolButton>

				<ToolButton 
					type = {AllTools.text.type} 
					style = {AllTools.text.style} 
					setSelectedTool={setSelectedTool} 
					icon = {TextIcon} 
				/>
			
				<ToolButton
					type = {AllTools.shape.type}
					style = {AllTools.shape.style}
					setSelectedTool={setSelectedTool}
				>
					<IoShapesOutline style = {{color: "black"}} className="w-full h-full" />
				</ToolButton>

				<ToolButton
					type = {AllTools.pen.type}
					style = {AllTools.pen.style}
					setSelectedTool={setSelectedTool}
				>
					<FaPen style = {{color: "black"}} className="w-full h-full" />
				</ToolButton>
			
			</div>;
}; 


export default Toolbar;
