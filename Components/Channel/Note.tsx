import { FC, useEffect, useState } from "react";
import { WhiteBoardItemProps } from "./WhiteboardChannel";

export const Note: FC<WhiteBoardItemProps> = ({xPosition, yPosition, width, height, type, opacity, id}): JSX.Element => {

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
			<div id = {id} className={`note bg-teal-400 absolute z-10 w-full h-full flex flex-col p-[10px] items-center rounded-lg`}>

				<input 
					type = "text" 
					className = {`note nodelete text-center text-black block z-10 w-1/3 min-w-[100px] mx-1/4 grow-0 basis-[30px] mb-[10px] rounded-lg`}
					value = {noteTitle} 
					onChange = {e => setNoteTitle(e.target.value)}
					placeholder = "Title"
					id = {id}
				/>

				<textarea 
					className = "note nodelete text-black block grow basis-[0px] w-full rounded-lg p-[5px]" 
					value = {noteText} 
					onChange = {e => setNoteText(e.target.value)}
					placeholder = {placeHolderNoteText}
					id = {id}
				/>
		 	</div>
	);

};