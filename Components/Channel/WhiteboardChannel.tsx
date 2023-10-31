import React, { FC, useRef, useState, useEffect, MouseEvent, useCallback} from "react";

import Toolbar, { Tool, AllTools } from "../Tools/Toolbar";


import useWindowDimensions from "../Hooks/UseWindow";

import Draggable, { DraggableCore, DraggableData, DraggableEvent } from "react-draggable";

import { Channel } from '@/Dummies/Channels';
import ChannelLayout from "./ChannelLayout";
import Spacebar from "../General/Spacebar";

import { Shape } from "./Shape";
import { Note } from "./Note";

import uuid from 'react-uuid';

var SAT = require(`sat`);

type WhiteboardChannelProps = {
    channel: Channel
	
}

export type WhiteBoardItemProps = {
	xPosition: number,
	yPosition: number, 
	center?: number,
	width: number,
	height: number,
	type: string
	opacity: number
	timestamp: number,
	id: string,
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

	const [selectedTool, setSelectedTool] = useState <Tool> (AllTools.shape);

	const [items, setItems] = useState <Map<string, WhiteBoardItemProps>> (new Map()); 
	const [elementOffset, setElementOffset] = useState({
		x: 0,
		y: 0,
		id: "",
	})

	const [selectedElementIds, setSelectedElementIds] = useState<string[]>([])
	const [disabled, setDisabled] = useState(false)

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

	
	  
	

	const handleKeydown = useCallback((event : any) => {

		//alert(selectedElementIds)

		const unique = [...new Set(selectedElementIds)]

		console.log(unique)

		if((unique.length )=== 0) return;
		const {key} = event; 
		if (key === "Backspace" || key === "Delete") {

			console.log(items)

			const itemsCopy = new Map(items)

			console.log(unique)

			unique.forEach(id => {
				console.log(itemsCopy.delete(id))
				//alert("awesome")
			})
			

			console.log(itemsCopy)
			console.log(itemsCopy.keys())
			setItems(new Map(itemsCopy))
			
			
			//setSelectedElementIds([])
		}
	}, [selectedElementIds])

	useEffect(() => {
		document.addEventListener("keydown", (e) => handleKeydown(e))
		return () => {
			document.removeEventListener("keydown", (e) => handleKeydown(e))
		}
	}, [handleKeydown])


	useEffect(() => {
		//alert(selectedTool.type)

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

		const id = (event.target as Element).id		
		let classNames = [""]

		if(typeof (event.target as Element).className === "string"){
			classNames = ((event.target as Element)?.className)?.split(" ")
		}

		setMouseIsPressed(true)
		console.log(event)
		console.log(id)

		if(items.has(id) && !classNames.includes("nodelete")){
			setSelectedElementIds([id])
		} else {
			console.log("clear!!")
			setSelectedElementIds([])
		}
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

	const handleStart = (event: any, position : DraggableData) => {
		const element = items.get(event.target.id)
		if(element){
			setDisabled(true)
			setElementOffset({
				x: currentMousePos.x - element.xPosition, 
				y: currentMousePos.y - element.yPosition,
				id: event.target.id
			})
		}
	}

	const handleEnd = () => {
		setElementOffset({
			x: 0, 
			y: 0,
			id: ""
		})

		setDisabled(false)
	}

	const handleDrag = (event: any, position : DraggableData) => {

		// console.log(event)
		// console.log(event.target)
		console.log(event.target.id)
	

		const newX = currentMousePos.x - elementOffset.x
		const newY = currentMousePos.y - elementOffset.y

		const mapCopy = new Map(items)

		const element = mapCopy.get(event.target.id)

		if(element){
			element.xPosition = newX
			element.yPosition = newY
			
			mapCopy.set(event.id, element)
		}		
		
		setItems(mapCopy)
		
	  };


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


		let width = mouseUp.x - mouseDown.x
		let height = mouseUp.y - mouseDown.y

		if(selectedTool.type === "circle"){
			width = Math.abs(width) > Math.abs(height) ? width : Math.sign(width) * Math.abs(height)
			height = Math.abs(width) > Math.abs(height) ?  Math.sign(height) * Math.abs(width) : height
		}

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


	useEffect(() => {
		if(!mouseIsPressed || clickInWhiteboardElement(currentMouseDownPos.className)) {
			setShadedPosition(null)
			return;
		}

		const newShape = calculateItemDimensions(currentMouseDownPos, currentMousePos, whiteboardRef)

		const possibleShapes = ["rect", "circle", "triangle"]

		// If I don't know how to handle the shape, it's gonna be a rect
		const currentShadedShape = possibleShapes.includes(selectedTool.type) ? selectedTool.type : "rect"

		setShadedPosition({
			xPosition: newShape.topLeftX,
			yPosition: newShape.topLeftY, 
			width: newShape.width,
			height: newShape.height,
			type: currentShadedShape,
			opacity: 0.3,
			timestamp: Date.now(),
			id: "shaded"
		})
	
		if(selectedTool.type !== "cursor") return;

		var selectionBox = (new SAT.Box(new SAT.Vector(newShape.topLeftX,newShape.topLeftY), newShape.width, newShape.height)).toPolygon();

		const elements: Map<string, any[]> = new Map()

		items.forEach((item) => {
			switch(item.type){
				case "circle":
					const xCenter = item.xPosition + item.width/2
					const yCenter = item.yPosition + item.height/2
					elements.set(item.id, (new SAT.Circle(new SAT.Vector(xCenter, yCenter), item.width/2)))
					break;
				case "triangle":
					const bottomLeftX = item.xPosition
					const bottomLeftY = item.yPosition + item.height
					const bottomRightX = item.xPosition + item.width
					const bottomRightY = item.yPosition + item.height
					const topX = item.xPosition + item.width/2
					const topY = item.yPosition

					const triangle = new SAT.Polygon(new SAT.Vector(), [
						new SAT.Vector(topX,topY),
						new SAT.Vector(bottomLeftX, bottomLeftY),
						new SAT.Vector(bottomRightX,bottomRightY)
					  ]);
					elements.set(item.id, triangle)
					  break;
				case "rect":
				default:
					elements.set(item.id, ((new SAT.Box(new SAT.Vector(item.xPosition,item.yPosition), item.width, item.height)).toPolygon()))
					break;
					  
			}
		})

		elements.forEach((element, id) => {
			let collided = false;
			if(element instanceof SAT.Circle) {
				console.log("circle")
				collided = SAT.testPolygonCircle(selectionBox, element);
			} else {
				console.log("polygon")
				collided = SAT.testPolygonPolygon(selectionBox, element);
			}

			if(collided) selectedElementIds.push(id)

		})

		console.log(elements)
		console.log(selectedElementIds)


	}, [currentMousePos.x, currentMousePos.y, mouseIsPressed])
	
	// Handle creation of dragging, and (for now), creation of new elements
	useEffect(() => {

		// Making sure we don't add new shapes when we don't want to
		// Checking if the initial click was on a whiteboard element
		if(clickInWhiteboardElement(currentMouseDownPos.className)) return;

		const newShape = calculateItemDimensions(currentMouseDownPos, currentMouseUpPos, whiteboardRef)

		//const timestamp = 

		const itemsCopy = new Map(items)

		const randomId = uuid()

		if(items && newShape.width != 0 && newShape.height !=0){
			console.log(selectedTool.type)
			setItems(itemsCopy.set(randomId, 
				{
					xPosition: newShape.topLeftX,
					yPosition: newShape.topLeftY, 
					width: newShape.width,
					height: newShape.height,
					type: selectedTool.type,
					opacity: 1,
					timestamp: Date.now(),
					id: randomId,
				}
			))
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

		let zIndex = 0

	
		items?.forEach((item, key) => {
		
			zIndex++ 

			const styles: { [key: string]: string | number } = {
				"width": item.width,
				"height": item.height, 
				"zIndex": zIndex,
				"position": "absolute",
			}

			const chooseElement = (props: WhiteBoardItemProps) => {
				switch(props.type){
					case "rect":
					case "circle":
					case "triangle":
						return <Shape {...props}></Shape>
					case AllTools.text.type:
						return <Note {...props}></Note>
					default:
						 return <div></div>
				}
			}

			whiteboardItems.push(
				<Draggable 
					bounds = "parent" 
					key = {key} 
					defaultPosition={{x:item.xPosition, y: item.yPosition}}
					onStart = {(e, dragData) => handleStart(e, dragData)}
					onStop={() => handleEnd()}
					onDrag={(e, dragData) => handleDrag(e, dragData)}
					disabled = {disabled && key !== elementOffset.id}
					position = {{
						x: item.xPosition, 
						y: item.yPosition
					}}
				>
					<div id= {key} style = {styles} className = {`text-black ${item.type ? "min-w-[125px] min-h-[125px]" : ""}`}>
						{/* <Shape {...item}></Shape> */}
						{chooseElement(item)}
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
				 className="h-[calc(100vh-145px)] bg-slate-600 relative" 
				 ref = {whiteboardRef} 
				 onMouseDown={e => handleMouseDown(e)}
				 onMouseUp = {e => handleMouseUp(e)}
				 onMouseMove={e => handleMouseMove(e)}
				//  onKeyDown={e => handleKeydown(e)}
				// //  tabIndex={0}
			>	
				
				
				<Toolbar selectedTool = {selectedTool} setSelectedTool={setSelectedTool}/>
				
				
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
