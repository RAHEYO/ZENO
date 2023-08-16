import { FC, useEffect } from "react";
import Textbox from "./Textbox";

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
		</div>;
	</div>;
}; 


export default Toolbar;
