import { FC } from "react";
import Image, { StaticImageData } from "next/image";
import { AllTools, Tool } from "./Toolbar";

type ToolButtonProps = Tool & {
	setSelectedTool: Function
	setSelectedSubtype: Function
	currentSelectedSubtype: string | null
	icon?: StaticImageData
	children?: React.ReactNode	
}


const ToolButton: FC<ToolButtonProps> = ({style, type, setSelectedTool, setSelectedSubtype, currentSelectedSubtype, icon, children}): JSX.Element => {


	const handleClick = (key : string) => {

		setSelectedTool(AllTools[key as keyof typeof AllTools])

		
		if(AllTools[key as keyof typeof AllTools]?.subtype) {
			setSelectedSubtype(key)
			return;
		}
		
		// Why oh why does ts have this type tomfoolery!!!
		// This converts the type into a string that ts accepts
		// Allows for dynamic accessing of the tool lmao

		const parent = AllTools[currentSelectedSubtype as keyof typeof AllTools]

		if(currentSelectedSubtype && parent && parent[key as keyof typeof parent]){
			//alert(key)
			console.log(parent[key as keyof typeof parent])
			setSelectedTool(parent[key as keyof typeof parent])
			//setSelectedSubtype(null)
			return;
		}

		setSelectedTool(AllTools[key as keyof typeof AllTools])
		setSelectedSubtype(null)
		
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
