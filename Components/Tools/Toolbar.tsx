import { FC, useEffect, useState } from "react";

import {IoShapesOutline} from "react-icons/io5"
import {FaPen} from "react-icons/fa";
import { PiCursorFill } from "react-icons/pi";
import { BiRectangle, BiCircle } from "react-icons/bi";
import { FiTriangle } from "react-icons/fi";

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
		subtype: false,
	}, 
	"shape": {
		style: toolStyle,
		type: "shape",
		subtype: true,
		rect: {
			style: toolStyle,
			type: "rect"
		},
		triangle: {
			style: toolStyle,
			type: "triangle"
		},
		circle: {
			style: toolStyle,
			type: "circle"
		},
	},
	"pen": {
		style: toolStyle,
		type: "pen",
		subtype: false,
	},
	"cursor": {
		style: toolStyle,
		type: "cursor",
		subtype: false,
	},
}



type ToolbarProps = {
	selectedTool: Tool
	setSelectedTool: Function
};


const toolbarStyles = "bg-primary min-w-[40vw] max-w-[60vw] max-h-[7.5vh] mx-auto flex justify-evenly z-10 absolute left-1/4"

const Toolbar: FC<ToolbarProps> = ({selectedTool, setSelectedTool}): JSX.Element => {

	const [currentSelectedSubtype, setSelectedSubtype] = useState<string | null>(null)

	const createSubBar = (subtype : string) => {
		switch (subtype){
			case "shape":

				return [
				<ToolButton
					type = {AllTools.shape.rect.type}
					style = {AllTools.shape.rect.style}
					setSelectedTool={setSelectedTool}
					setSelectedSubtype={setSelectedSubtype}
					currentSelectedSubtype= {currentSelectedSubtype}
				>
					<BiRectangle style = {{color: "black"}} className="w-full h-full"/>
				</ToolButton>,
				<ToolButton
					type = {AllTools.shape.circle.type}
					style = {AllTools.shape.circle.style}
					setSelectedTool={setSelectedTool}
					setSelectedSubtype={setSelectedSubtype}
					currentSelectedSubtype= {currentSelectedSubtype}
				>
					<BiCircle style = {{color: "black"}} className="w-full h-full" />
				</ToolButton>,
				<ToolButton
					type = {AllTools.shape.triangle.type}
					style = {AllTools.shape.triangle.style}
					setSelectedTool={setSelectedTool}
					setSelectedSubtype={setSelectedSubtype}
					currentSelectedSubtype= {currentSelectedSubtype}
				>
					<FiTriangle style = {{color: "black"}} className="w-full h-full" />
				</ToolButton>

					
				]

		}
	}

	return <div>
			<div className={`toolbar ${toolbarStyles}`}>
				<ToolButton
					type = {AllTools.cursor.type}
					style = {AllTools.cursor.style}
					setSelectedTool={setSelectedTool}
					setSelectedSubtype={setSelectedSubtype}
					currentSelectedSubtype= {currentSelectedSubtype}
				>
					<PiCursorFill style = {{color: "black"}} className="w-full h-full" />
				</ToolButton>

				<ToolButton 
					type = {AllTools.text.type} 
					style = {AllTools.text.style} 
					setSelectedTool={setSelectedTool} 
					icon = {TextIcon} 
					setSelectedSubtype={setSelectedSubtype}
					currentSelectedSubtype= {currentSelectedSubtype}
				/>

				<ToolButton
					type = {AllTools.shape.type}
					style = {AllTools.shape.style}
					setSelectedTool={setSelectedTool}
					setSelectedSubtype={setSelectedSubtype}
					currentSelectedSubtype= {currentSelectedSubtype}
				>
					<IoShapesOutline style = {{color: "black"}} className="w-full h-full" />
				</ToolButton>

				{/* <ToolButton
					type = {AllTools.pen.type}
					style = {AllTools.pen.style}
					setSelectedTool={setSelectedTool}
					setSelectedSubtype={setSelectedSubtype}
					currentSelectedSubtype= {currentSelectedSubtype}
				>
					<FaPen style = {{color: "black"}} className="w-full h-full" />
				</ToolButton> */}
			</div>
			{ currentSelectedSubtype &&
			<div className={`toolbar ${toolbarStyles}`}>
				{createSubBar(currentSelectedSubtype)}
			</div>
			}
	</div>
	
	
}; 


export default Toolbar;
