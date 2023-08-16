import { FC, useRef, useState, useEffect } from "react";
import Image from "next/image";
import Toolbar, { Tool, AllTools } from "../Tools/Toolbar";
import Icon from "./Tool-Icons/whiteboardIcon.svg";

import { Channel } from '@/Dummies/Channels';
import ChannelLayout from "./ChannelLayout";
import Spacebar from "../General/Spacebar";

type WhiteboardChannelProps = {
    channel: Channel
}


const WhiteboardChannel: FC<WhiteboardChannelProps> = ({channel}): JSX.Element => {


	const canvasRef = useRef(null)

	const [selectedTool, setSelectedTool] = useState <Tool> (AllTools.shape)

	useEffect(() => {
		alert(selectedTool.type)
	}, [selectedTool])


	return (
		<ChannelLayout channel={channel}>
			<div id = "blank-whiteboard-space" className="h-[calc(100vh-70px)] bg-white">	
					
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
