import { FC, useEffect } from "react";
import Textbox from "./Textbox";

import {IoShapesOutline} from "react-icons/io5"
import ToolButton from "./ToolButton";

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
	}
}



type ToolbarProps = {
	selectedTool: Tool
	setSelectedTool: Function
};


const toolbarStyles = "bg-primary max-w-[40vw] max-h-[7.5vh] mx-auto flex justify-evenly"

const Toolbar: FC<ToolbarProps> = ({selectedTool, setSelectedTool}): JSX.Element => {

	return <div className={`toolbar ${toolbarStyles}`}>
		<div className={`toolbar ${toolbarStyles}`}>
			<Textbox type = "text" style = "bg-[white] object-scale-down h-[7.5vh] w-[7.5vh]" setSelectedTool = {setSelectedTool}/>
			<ToolButton type = {AllTools.shape.type} style = {AllTools.shape.style + " bg-[black]"} setSelectedTool={setSelectedTool}>
				<IoShapesOutline></IoShapesOutline>
			</ToolButton>
			
		</div>;
	</div>;
}; 


export default Toolbar;
