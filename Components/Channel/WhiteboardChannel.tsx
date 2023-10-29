import React, { FC, useRef, useState, useEffect, MouseEvent} from "react";

import Toolbar, { Tool, AllTools } from "../Tools/Toolbar";


import useWindowDimensions from "../Hooks/UseWindow";

import Draggable, { DraggableCore } from "react-draggable";

import { Channel } from '@/Dummies/Channels';
import ChannelLayout from "./ChannelLayout";
import Spacebar from "../General/Spacebar";

import { Shape } from "./Shape";
import { Note } from "./Note";

type WhiteboardChannelProps = {
    channel: Channel
	
}

export type WhiteBoardItemProps = {
	xPosition: number,
	yPosition: number, 
	width: number,
	height: number,
	type: string
	opacity: number
	timestamp: number,
}


type CanvasDimensions = {
	width: number, 
	height:number, 
	rows: number,
	columns: number,
	offset: number,
}

type MouseClickedProps = {
	x: number,
	y: number,
	className: string | object,
}

const WhiteboardChannel: FC<WhiteboardChannelProps> = ({channel}): JSX.Element => {

	const INITIAL_BOX_DIMENSIONS = {width: 1920, height: 1080}

	const GRID_SQUARE_DIMENSIONS = {width: 5, height: 5};

	const canvasRef = useRef<HTMLCanvasElement | null>(null);

	const [selectedTool, setSelectedTool] = useState <Tool> (AllTools.shape);

	const [items, setItems] = useState <WhiteBoardItemProps[]> ([]); 

	const whiteboardRef = useRef<HTMLInputElement | null>(null);

	const defaultMousePos = {
		x: 0,
		y: 0,
		className: "" as string | object,
	}

	const [currentMouseDownPos, setCurrentMouseDownPos] = useState<MouseClickedProps>({...defaultMousePos})
	const [currentMouseUpPos, setCurrentMouseUpPos] = useState<MouseClickedProps>({...defaultMousePos})
	const [currentMousePos, setCurrentMousePos] = useState({x: 0, y: 0})
	const [mouseIsPressed, setMouseIsPressed] = useState(false)
	
	const [shadedPosition, setShadedPosition] = useState<WhiteBoardItemProps | null> (null)

	const { width: windowWidth, height: windowHeight } = useWindowDimensions();

	const [canvasDimensions, setCanvasDimensions] = useState<CanvasDimensions>({

		width: INITIAL_BOX_DIMENSIONS.width, 
		height: INITIAL_BOX_DIMENSIONS.height, 
		rows: Math.floor(INITIAL_BOX_DIMENSIONS.height / GRID_SQUARE_DIMENSIONS.width),
		columns: Math.floor(INITIAL_BOX_DIMENSIONS.width / GRID_SQUARE_DIMENSIONS.height),
		offset: 0,
	})



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
		setCurrentMouseDownPos({
			x: event.clientX,
			y: event.clientY,
			// why does ts do this T-T
			className: (event.target as Element).className
		})
	
		setMouseIsPressed(true)
		console.log(event)
	}

	const handleMouseUp = (event : MouseEvent) => {
		setCurrentMouseUpPos({
			x: event.clientX,
			y: event.clientY,
			className: (event.target as Element).className
		})
		setMouseIsPressed(false)

		console.log(event)
	}

	
	const handleMouseMove = (event: MouseEvent) => {
		setCurrentMousePos({
			x: event.clientX, y: event.clientY
		})
	}


	// Takes in the class name of the target element and determines if it's a whiteboard element
	const clickInWhiteboardElement = (className: string | object) => {
					
		if((typeof className) === "string"){

			const possibleClassNames = (className as string).split(" ")

			const classesOfNote = ["react-draggable", "react-draggable-dragged", "note"]

			for(const possibleClassName of possibleClassNames){
				if(classesOfNote.includes(possibleClassName)) return true;
			}

			
		} else if ((typeof className) === "object"){
			const objectName = Object.getPrototypeOf((className as object))?.constructor.name
			if(objectName == "SVGAnimatedString") return true;
		}
		

		console.log(currentMouseDownPos.className)
		return false
	}

	const calculateItemDimensions = (mouseDown : {x: number, y: number}, 
		mouseUp : {x: number, y: number}, whiteboard: React.MutableRefObject<HTMLInputElement | null>) => {
										
		// console.log("mouseUp.x: " + mouseUp.x)
		// console.log("mouseDown.x: " + mouseDown.x)
		// console.log("mouseUp.y: " + mouseUp.y)
		// console.log("mouseDown.y: " + mouseDown.y)


		const width = mouseUp.x - mouseDown.x
		const height = mouseUp.y - mouseDown.y
		

		// console.log("width: " + width)
		// console.log("height: " + height)


		let boardXOffset = 0;
		let boardYOffset = 0;
		if(whiteboard.current){
			const boundingBox = whiteboard.current.getBoundingClientRect();
			boardXOffset = boundingBox.left;
			boardYOffset = boundingBox.top;
		}

		let topLeftX = mouseDown.x - boardXOffset;
		let topLeftY = mouseDown.y - boardYOffset; 

		// If the width is x units, and is less than zero, then the left most corner 
		// of the bounding box will be x units to the left
		if(width < 0){
			topLeftX += width;
			console.log("Setting top left x: " + topLeftX)
		}

		
		// If the height is y units, and is less than zero, then the top most corner
		// of the bounding box will be be y units UP, because y grows as you go down the page
		// Thus, we should add the negative height in order to go up
		if(height < 0){
			topLeftY += height;
			console.log("Setting top left y: " + topLeftY)
		}

		return {
			topLeftX: topLeftX,
			topLeftY: topLeftY,
			width: Math.abs(width),
			height: Math.abs(height),
		}
	}

	// const createShape = (shapeProps : WhiteBoardItemProps) => {
	// 	return <Shape {shapeProps}></Shape>
	// }

	useEffect(() => {
		if(!mouseIsPressed || clickInWhiteboardElement(currentMouseDownPos.className)) {
			setShadedPosition(null)
			return;
		}

		const newShape = calculateItemDimensions(currentMouseDownPos, currentMousePos, whiteboardRef)

		setShadedPosition({
			xPosition: newShape.topLeftX,
			yPosition: newShape.topLeftY, 
			width: newShape.width,
			height: newShape.height,
			type: "rect",
			opacity: 0.3,
			timestamp: Date.now()
		})
	

	}, [currentMousePos.x, currentMousePos.y, mouseIsPressed])
	
	// Handle creation of dragging, and (for now), creation of new elements
	useEffect(() => {

		// Making sure we don't add new shapes when we don't want to
		// Checking if the initial click was on a whiteboard element
		if(clickInWhiteboardElement(currentMouseDownPos.className)) return;

		const newShape = calculateItemDimensions(currentMouseDownPos, currentMouseUpPos, whiteboardRef)
		if(items && newShape.width != 0 && newShape.height !=0){

			setItems([...items, {
				xPosition: newShape.topLeftX,
				yPosition: newShape.topLeftY, 
				width: newShape.width,
				height: newShape.height,
				type: "rect",
				opacity: 1,
				timestamp: Date.now()
			}])
		}

	
	}, [currentMouseUpPos.x, currentMouseUpPos.y])


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



	const renderItems = () => {
		const whiteboardItems: Array<React.ReactNode> = []

		let badKey = 0

		items?.forEach(item => {
		
			badKey++ 

			const styles: { [key: string]: string | number } = {
				"width": item.width,
				"height": item.height, 
				"zIndex": badKey,
				"position": "absolute",
			}

			whiteboardItems.push(
				<Draggable 
					bounds = "parent" 
					key = {badKey} 
					defaultPosition={{x:item.xPosition, y: item.yPosition}}>
					<div style = {styles} className = "text-black">
						<Shape {...item}></Shape>
					</div>
				</Draggable>
			)
		})

		return whiteboardItems
	}
	
	return (
		<ChannelLayout channel={channel}>
			<Spacebar className="h-[75px]" />
			<div id = "blank-whiteboard-space" 
				 className="h-[calc(100vh-145px)] bg-white relative" 
				 ref = {whiteboardRef} 
				 onMouseDown={e => handleMouseDown(e)}
				 onMouseUp = {e => handleMouseUp(e)}
				 onMouseMove={e => handleMouseMove(e)}
			>	
				
				
				<Toolbar selectedTool = {selectedTool} setSelectedTool={setSelectedTool}/>
				
				<Note xPosition = {0} yPosition = {100} width = {50} height = {100} type = "note" opacity = {1} timestamp={Date.now()}/>
				
				{shadedPosition && <div className={`absolute w-[${shadedPosition.width}px] h-[${shadedPosition.height}px] z-[10000]`}
									style = {{transform: `translateX(${shadedPosition.xPosition}px) translateY(${shadedPosition.yPosition}px)`}}>
										<Shape {...shadedPosition}></Shape>
									</div>
				}
				{renderItems()}
				
			</div>
		</ChannelLayout>
		);
	
};

export default WhiteboardChannel;
