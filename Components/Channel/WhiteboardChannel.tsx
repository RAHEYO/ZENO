import { FC, useRef, useState, useEffect, MouseEvent} from "react";
import Image from "next/image";
import Toolbar, { Tool, AllTools } from "../Tools/Toolbar";
import Icon from "./Tool-Icons/whiteboardIcon.svg";

import useWindowDimensions from "../Hooks/UseWindow";

import Draggable, { DraggableCore } from "react-draggable";

import { Channel } from '@/Dummies/Channels';
import ChannelLayout from "./ChannelLayout";
import Spacebar from "../General/Spacebar";

type WhiteboardChannelProps = {
    channel: Channel
	
}

export type WhiteBoardItem = {
	xPosition: number,
	yPosition: number, 
	type: string
}


type CanvasDimensions = {
	width: number, 
	height:number, 
	rows: number,
	columns: number,
	offset: number,
}

const WhiteboardChannel: FC<WhiteboardChannelProps> = ({channel}): JSX.Element => {

	const INITIAL_BOX_DIMENSIONS = {width: 1920, height: 1080}

	const GRID_SQUARE_DIMENSIONS = {width: 5, height: 5};

	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const [selectedTool, setSelectedTool] = useState <Tool> (AllTools.shape);

	const [items, setItems] = useState <WhiteBoardItem[]> (); 

	const whiteboardRef = useRef<HTMLInputElement | null>(null);

	const [currentMouseDownPos, setCurrentMouseDownPos] = useState({x: 0, y: 0})
	const [currentMouseUpPos, setCurrentMouseUpPos] = useState({x: 0, y: 0})

	const { width: windowWidth, height: windowHeight } = useWindowDimensions();

	const [canvasDimensions, setCanvasDimensions] = useState<CanvasDimensions>({

		width: INITIAL_BOX_DIMENSIONS.width, 
		height: INITIAL_BOX_DIMENSIONS.height, 
		rows: Math.floor(INITIAL_BOX_DIMENSIONS.height / GRID_SQUARE_DIMENSIONS.width),
		columns: Math.floor(INITIAL_BOX_DIMENSIONS.width / GRID_SQUARE_DIMENSIONS.height),
		offset: 0,
	})
		

	const [widthToHeightRatio, setWidthToHeightRatio] = useState(1);

	useEffect(() => {
		console.log(selectedTool.type)

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
		setCurrentMouseUpPos({x: event.clientX, y: event.clientY})
	}

	

	useEffect(() => {


		console.log("currentMouseUpPos.x: " + currentMouseUpPos.x)
		console.log("currentMouseDownPos.x: " + currentMouseDownPos.x)
		console.log("currentMouseUpPos.y: " + currentMouseUpPos.y)
		console.log("currentMouseDownPos.y: " + currentMouseDownPos.y)


		const xOffset = currentMouseUpPos.x - currentMouseDownPos.x
		const yOffset = currentMouseUpPos.y - currentMouseDownPos.y
		
		if(whiteboardRef.current && canvasRef.current){
			const ctx = canvasRef.current.getContext('2d');
			if (ctx != null){
				ctx.beginPath();
				ctx.rect( currentMouseDownPos.x, currentMouseDownPos.y, xOffset, yOffset);
				ctx.stroke();
			}
		}

		console.log("woo")

	}, [currentMouseUpPos])


	useEffect(() => {
		console.log(canvasDimensions)
	}, [canvasDimensions])


	// Creating bounds
	useEffect(() => {

		if(whiteboardRef.current){

			// Gets angry if I use whiteboardRef.current directly T-T
			const currentDimensions = whiteboardRef.current

			setCanvasDimensions((prevDimensions) => {
				return {
					...prevDimensions,
					width: currentDimensions.clientWidth, 
					height: currentDimensions.clientHeight, 
					rows: Math.floor(currentDimensions.clientHeight / GRID_SQUARE_DIMENSIONS.width),
					columns: Math.floor(currentDimensions.clientWidth / GRID_SQUARE_DIMENSIONS.height),
				}

			})

		}
	}, [whiteboardRef.current?.clientWidth, whiteboardRef.current?.clientHeight])


	return (
		<ChannelLayout channel={channel}>
			<Spacebar className="h-[75px]" />
			<div id = "blank-whiteboard-space" className="h-[calc(100vh-145px)] bg-white relative" ref = {whiteboardRef}  >	
				
				
				<Toolbar selectedTool = {selectedTool} setSelectedTool={setSelectedTool}/>

				<Draggable bounds = "parent">
				{/* <Draggable bounds = {{left:220, top:145, right: windowWidth, bottom: windowHeight}}>*/}
					
					<h1 className = "w-[50px] h-[50px] bg-black">HIII</h1>
				</Draggable>
			
				{/* <canvas 
					width = {`${whiteboardRef.current?.offsetWidth}`} 
					height = {`${whiteboardRef.current?.offsetHeight}`} 
					ref = {canvasRef} 
					onMouseDown = {event => handleMouseDown(event)} 
					onMouseUp = {event => handleMouseUp(event) }
				>

		
				

				</canvas>
	 */}
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
