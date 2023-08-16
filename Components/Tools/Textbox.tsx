import { FC } from "react";
import Image from "next/image";
import { AllTools, Tool } from "./Toolbar";
import Icon from "./Tool-Icons/textboxIcon.png";

const Textbox: FC<Tool & {setSelectedTool: Function}> = ({style, type, setSelectedTool}): JSX.Element => {
	return (
			<Image
				className = {style}
				src={Icon}
				alt="textbox"
				onClick = {() => {
					// Why oh why does ts have this type tomfoolery!!!
					// This converts the type into a string that ts accepts
					// Allows for dynamic accessing of the tool lmao
					setSelectedTool(AllTools[type as keyof typeof AllTools])
				}}
			/>
	);
};

export default Textbox;
