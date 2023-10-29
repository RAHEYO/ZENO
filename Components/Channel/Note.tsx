import { FC, useEffect, useState } from "react";
import { WhiteBoardItemProps } from "./WhiteboardChannel";

export const Note: FC<WhiteBoardItemProps> = ({xPosition, yPosition, width, height, type, opacity}): JSX.Element => {

	const [noteTitle, setNoteTitle] = useState("")
	const [noteText, setNoteText] = useState("")

	const [placeHolderNoteText, setPlaceholderNoteText] = useState("") 

	const createRandomPlaceholder = () => {
		const num = Math.random() 
		if(num < 1/3) return "Write your notes here!"
		if(num < 2/3) return "Let those creative juices start flowing!"
		if(num < 1) return "Start writing!"
		return ""
	}

	useEffect(() => {
		setPlaceholderNoteText(createRandomPlaceholder())
	}, [])

	return (
			<div className={`note w-[${300}px] h-[${500}px] bg-teal-400 absolute z-10 grid grid-cols-7 grid-rows-6`}>

				<input 
					type = "text" 
					className = "note text-center text-black block z-10 col-start-3 col-end-6" 
					value = {noteTitle} 
					onChange = {e => setNoteTitle(e.target.value)}
					placeholder = "Title"
				/>

				<textarea 
					className = "note text-black block col-start-2 col-end-7 row-start-3 row-end-7" 
					value = {noteText} 
					onChange = {e => setNoteText(e.target.value)}
					placeholder = {placeHolderNoteText}
				/>
		 	</div>
	);

};