import { FC } from "react";
import Image, { StaticImageData } from "next/image";
import { AllTools, Tool } from "./Toolbar";

type ToolButtonProps = Tool & {
	setSelectedTool: Function
	icon?: StaticImageData
	children?: React.ReactNode
}


const ToolButton: FC<ToolButtonProps> = ({style, type, setSelectedTool, icon, children}): JSX.Element => {


	const handleClick = (key : string) => {
		// Why oh why does ts have this type tomfoolery!!!
		// This converts the type into a string that ts accepts
		// Allows for dynamic accessing of the tool lmao
		setSelectedTool(AllTools[key as keyof typeof AllTools])
	}

	if(icon){
		return (
				<Image
					className = {style}
					src={icon}
					alt={type}
					onClick = {() => handleClick(type)}
				/>
		);
	} 
	

	return (
		<div
			className = {style}
			onClick = {() => handleClick(type)}
		>
			{children}
		</div>
	);

};

export default ToolButton;
