import { FC, useRef, useState, useEffect} from "react";
import Image from "next/image";
import Toolbar, { Tool, AllTools } from "../Tools/Toolbar";
import Icon from "./Tool-Icons/whiteboardIcon.svg";

import { Channel } from '@/Dummies/Channels';
import ChannelLayout from "./ChannelLayout";
import Spacebar from "../General/Spacebar";

type WhiteboardChannelProps = {
    channel: Channel
	
}

export type WhiteBoardItem = {
	xPosition: Number,
	yPosition: Number, 
	type: string
}

type Rect = {
	width: Number,
	height: Number
}


const WhiteboardChannel: FC<WhiteboardChannelProps> = ({channel}): JSX.Element => {

	const initialBox = {width: 1920, height: 1080}

	const canvasRef = useRef(null);

	const [selectedTool, setSelectedTool] = useState <Tool> (AllTools.shape);

	const [items, setItems] = useState <WhiteBoardItem[]> (); 

	const whiteboardRef = useRef<HTMLInputElement | null>(null);

	const [currentMouseDownPos, setCurrentMouseDownPos] = useState({x: 0, y: 0})
	const [currentMouseUpPos, setCurrentMouseUpPos] = useState({x: 0, y: 0})

	const [clientBox, setClientBox] = useState<Rect> (initialBox);
		

	const [widthToHeightRatio, setWidthToHeightRatio] = useState(1);

	useEffect(() => {
		alert(selectedTool.type)

		switch (selectedTool.type){ 
			case AllTools.shape.type:

			// onclick, add new component
			// If you split the grid, and mouse still within like 5 blocks of original cursor
			// Spawn default one
			// otherwise, 


			// Above function somehow has to map canvas onto their screen...

		}
	}, [selectedTool])



	// I think client is what we want
	// https://stackoverflow.com/a/21452887
	const handleMouseDown = (event : MouseEvent) => {

		setCurrentMouseDownPos({x: event.clientX, y: event.clientY})
		console.log(event)
	}

	const handleMouseUp = (event : MouseEvent) => {
		console.log(event)
	}

	

	useEffect(() => {
		window.addEventListener('mousedown', (event) => handleMouseDown(event));
		window.addEventListener('mouseup', (event) => handleMouseUp(event));

		return () => {
			window.removeEventListener('mousedown', (event) => handleMouseDown(event));
			window.removeEventListener('mouseup', (event) => handleMouseUp(event));
		};
	}, [])

	useEffect(() => {

		const xOffset = currentMouseUpPos.x - currentMouseDownPos.x
		const yOffset = currentMouseUpPos.y - currentMouseDownPos.y
		
		if(whiteboardRef.current){
			const widthDifference = initialBox.width - whiteboardRef.current.clientWidth;
			const heightDifference =  initialBox.height - whiteboardRef.current.clientHeight;

			const pixelAddition = Math.abs(widthDifference) > Math.abs(heightDifference) ? heightDifference : widthDifference;

			setClientBox({width: whiteboardRef.current.clientWidth + pixelAddition, height: whiteboardRef.current.clientHeight + pixelAddition })


			setWidthToHeightRatio(widthDifference/heightDifference)
		}



	}, [currentMouseUpPos])

	return (
		<ChannelLayout channel={channel}>
			<div id = "blank-whiteboard-space" className="h-[calc(100vh-70px)] bg-white" ref = {whiteboardRef}>	
					
				{/* I fudging understand what this does now lol, it pushes the components below
				the title lol */}
				<Spacebar className="h-[75px]" />
				
				<Toolbar selectedTool = {selectedTool} setSelectedTool={setSelectedTool}/>

				<canvas ref = {canvasRef} />

	
			</div>
		</ChannelLayout>
		);
	
		// <div className = "wrapper max-w-[7.5vh] max-h[7.5vh]">
			// <Image
			// 	className = "bg-[white] object-scale-down h-[7.5vh] w-[7.5vh]"
			// 	src={Icon}
			// 	alt="whiteboard"
			// />
		// </div>

};

export default WhiteboardChannel;
